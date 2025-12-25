"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, User, Fuel, Baby, Wrench, Loader2 } from "lucide-react";
import BookingDetails from "@/components/BookingDetails";
import { calculateReservationPrice } from "@/actions/hq-actions";
import { format } from "date-fns";

export default function PackagesStep({
  setStep,
  additionalCharges,
  bookingData,
  onChargesSelected,
  car,
  onPriceCalculated,
}: {
  setStep: (step: number) => void;
  additionalCharges: any;
  bookingData?: {
    pickupLocation?: any;
    returnLocation?: any;
    pickupDate?: Date;
    returnDate?: Date;
    pickupTime?: string;
    returnTime?: string;
    totalAmount?: number;
    numberOfDays?: number;
    dailyRate?: string | number;
  };
  onChargesSelected?: (charges: string[]) => void;
  car?: any;
  onPriceCalculated?: (priceData: any) => void;
}) {
  // Add safety checks for additionalCharges
  if (!additionalCharges || typeof additionalCharges !== "object") {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Loading additional charges...</p>
        </div>
      </div>
    );
  }

  console.log("additionalCharges", additionalCharges);

  // Categorize charges: items with "Protection" in name/label/description are insurances, others are addons
  const { insurances, addOns } = useMemo(() => {
    if (!additionalCharges) {
      return { insurances: [], addOns: [] };
    }

    // If it's already categorized (object with insurances/addOns)
    if (additionalCharges.insurances || additionalCharges.addOns) {
      return {
        insurances: additionalCharges.insurances || [],
        addOns: additionalCharges.addOns || [],
      };
    }

    // If it's an array, categorize based on "Protection" keyword
    if (Array.isArray(additionalCharges)) {
      const insurancesList: any[] = [];
      const addOnsList: any[] = [];

      additionalCharges.forEach((item: any) => {
        const name = item.name || item.label || item.description || "";
        const hasProtection = name.toLowerCase().includes("protection");

        if (hasProtection) {
          insurancesList.push(item);
        } else {
          addOnsList.push(item);
        }
      });

      return { insurances: insurancesList, addOns: addOnsList };
    }

    return { insurances: [], addOns: [] };
  }, [additionalCharges]);

  // Initialize state with pre-selected items (from API)
  const [selectedInsurances, setSelectedInsurances] = useState<number[]>(() => {
    return insurances
      .filter((pkg: any) => pkg.selected || pkg.is_selected)
      .map((pkg: any) => pkg.id);
  });
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>(() => {
    return addOns
      .filter((addOn: any) => addOn.selected || addOn.is_selected)
      .map((addOn: any) => addOn.id);
  });
  const [isLoading, setIsLoading] = useState(false);

  // Format charges for API: ["3", "8_2"] where "8_2" = charge 8, quantity 2
  const formatChargesForAPI = () => {
    const charges: string[] = [];

    // Add selected insurances (single selection)
    selectedInsurances.forEach((id) => {
      charges.push(id.toString());
    });

    // Add selected add-ons (multiple selection with quantities)
    selectedAddOns.forEach((id) => {
      // For now, assume quantity 1. If you need quantities, track them separately
      charges.push(id.toString());
    });

    return charges;
  };

  // Update parent when charges change
  useEffect(() => {
    if (onChargesSelected) {
      const formattedCharges = formatChargesForAPI();
      onChargesSelected(formattedCharges);
    }
  }, [selectedInsurances, selectedAddOns, onChargesSelected]);

  // Toggle insurance selection (only one can be selected at a time)
  const toggleInsurance = (insuranceId: number) => {
    setSelectedInsurances([insuranceId]);
  };

  // Toggle add-on selection (multiple can be selected)
  const toggleAddOn = (addOnId: number) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  // Get display text for charge type - show calculated price
  const getChargeDisplayText = (item: any): string => {
    const price = calculateChargePrice(item);
    if (price > 0) {
      return `AED ${price.toFixed(2)}`;
    }
    return "AED 0.00";
  };

  // Calculate price for a charge item
  const calculateChargePrice = (item: any): number => {
    const numberOfDays = bookingData?.numberOfDays || 0;
    const dailyRate = Number(bookingData?.dailyRate || 0);
    const chargeType = item.charge_type;

    console.log("item", item);

    // Check for total_price first (calculated total for the rental period)
    if (item.total_price?.amount) {
      return Number(item.total_price.amount) || 0;
    }

    // Check for total_price_with_taxes
    if (item.total_price_with_taxes?.amount) {
      return Number(item.total_price_with_taxes.amount) || 0;
    }

    // Check for base_price_with_taxes (daily rate with taxes)
    if (item.base_price_with_taxes?.amount) {
      const dailyAmount = Number(item.base_price_with_taxes.amount) || 0;
      return dailyAmount * numberOfDays;
    }

    // Check for base_price (daily rate)
    if (item.base_price?.amount) {
      const dailyAmount = Number(item.base_price.amount) || 0;
      return dailyAmount * numberOfDays;
    }

    // Fallback to old structure for backward compatibility
    let amount = 0;
    if (chargeType === "percent") {
      amount = Number(item.percent_amount?.["1"]?.amount || 0);
      if (amount > 0) {
        // Percentage of daily rate: (dailyRate * amount / 100) * numberOfDays
        return ((dailyRate * amount) / 100) * numberOfDays;
      }
    } else if (chargeType === "amount") {
      // Fixed amount - included/free
      return 0;
    } else if (chargeType === "per_minute_amount") {
      amount = Number(item.hourly_price?.["1"]?.amount || 0);
      if (amount > 0) {
        // Per minute: amount * minutes (assuming 24 hours per day)
        const minutesPerDay = 24 * 60;
        return amount * minutesPerDay * numberOfDays;
      }
    } else if (chargeType === "hourly_amount") {
      amount = Number(item.hourly_price?.["1"]?.amount || 0);
      if (amount > 0) {
        // Hourly: amount * hours (assuming 24 hours per day)
        return amount * 24 * numberOfDays;
      }
    } else if (chargeType === "daily" || chargeType === "daily_amount") {
      // Handle "daily" charge type from new API structure
      if (item.base_price?.amount) {
        const dailyAmount = Number(item.base_price.amount) || 0;
        return dailyAmount * numberOfDays;
      }
      amount = Number(item.percent_amount?.["1"]?.amount || 0);
      if (amount > 0) {
        // Daily: amount * numberOfDays
        return amount * numberOfDays;
      }
    } else if (chargeType === "weekly_amount") {
      amount = Number(item.percent_amount?.["1"]?.amount || 0);
      if (amount > 0) {
        // Weekly: amount * weeks (numberOfDays / 7)
        const weeks = numberOfDays / 7;
        return amount * weeks;
      }
    } else if (chargeType === "monthly_amount") {
      amount = Number(item.percent_amount?.["1"]?.amount || 0);
      if (amount > 0) {
        // Monthly: amount * months (numberOfDays / 30)
        const months = numberOfDays / 30;
        return amount * months;
      }
    }

    return 0;
  };

  // Get selected items with their prices
  const selectedItems = useMemo(() => {
    const items: Array<{
      id: number;
      name: string;
      price: number;
      type: "insurance" | "addon";
    }> = [];

    // Add selected insurances
    insurances
      .filter((pkg: any) => selectedInsurances.includes(pkg.id))
      .forEach((pkg: any) => {
        items.push({
          id: pkg.id,
          name: pkg.name || pkg.label || pkg.description || "Insurance",
          price: calculateChargePrice(pkg),
          type: "insurance",
        });
      });

    // Add selected add-ons
    addOns
      .filter((addOn: any) => selectedAddOns.includes(addOn.id))
      .forEach((addOn: any) => {
        items.push({
          id: addOn.id,
          name: addOn.name || addOn.label || addOn.description || "Add-on",
          price: calculateChargePrice(addOn),
          type: "addon",
        });
      });

    return items;
  }, [selectedInsurances, selectedAddOns, insurances, addOns, bookingData]);

  // Calculate total including base amount and additional charges
  const totalAmount = useMemo(() => {
    const baseAmount = bookingData?.totalAmount || 0;
    const additionalChargesTotal = selectedItems.reduce(
      (sum, item) => sum + item.price,
      0
    );
    return baseAmount + additionalChargesTotal;
  }, [bookingData?.totalAmount, selectedItems]);

  // Handle checkout - calculate price and wait for response
  const handleCheckout = async () => {
    if (
      !car?.id ||
      !bookingData?.pickupDate ||
      !bookingData?.returnDate ||
      !bookingData?.pickupLocation ||
      !bookingData?.returnLocation
    ) {
      return;
    }

    const formattedCharges = formatChargesForAPI();
    if (formattedCharges.length === 0) {
      // No charges selected, proceed to checkout
      setStep(3);
      return;
    }

    setIsLoading(true);
    try {
      // Convert time to HH:mm format (remove seconds if present)
      const pick_up_time = bookingData.pickupTime
        ? bookingData.pickupTime.split(":").slice(0, 2).join(":")
        : "02:00";
      const return_time = bookingData.returnTime
        ? bookingData.returnTime.split(":").slice(0, 2).join(":")
        : "02:00";

      const result = await calculateReservationPrice({
        pick_up_date: format(bookingData.pickupDate, "yyyy-MM-dd"),
        pick_up_time: pick_up_time,
        return_date: format(bookingData.returnDate, "yyyy-MM-dd"),
        return_time: return_time,
        pick_up_location: bookingData.pickupLocation.id,
        return_location: bookingData.returnLocation.id,
        vehicle_class_id: car.id,
        additional_charges: formattedCharges,
      });

      if (result.success && result.data) {
        // Pass price data to parent if callback provided
        if (onPriceCalculated) {
          onPriceCalculated(result.data);
        }
        // Proceed to checkout step
        setStep(3);
      } else {
        console.error("Failed to calculate price:", result.message);
        // Still proceed to checkout, but without price data
        setStep(3);
      }
    } catch (error) {
      console.error("Error calculating price:", error);
      // Still proceed to checkout on error
      setStep(3);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to parse HTML features from short_description_for_website
  const parseFeatures = (html: string) => {
    if (!html) return { included: [], excluded: [] };

    const included: string[] = [];
    const excluded: string[] = [];

    // Match lines with ✓ (checkmark) or 𐄂 (cross mark)
    const lines = html.split(/<p>|<\/p>/).filter((line) => line.trim());

    lines.forEach((line) => {
      const trimmed = line.replace(/<[^>]*>/g, "").trim();
      if (trimmed.includes("✓")) {
        included.push(trimmed.replace("✓", "").trim());
      } else if (trimmed.includes("𐄂")) {
        excluded.push(trimmed.replace("𐄂", "").trim());
      }
    });

    return { included, excluded };
  };

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-md text-gray-400 mb-8">
          <span className="hover:text-white">Home</span>
          <span className="mx-2">{" > "}</span>
          <span className="hover:text-white">Car Details</span>
          <span className="mx-2">{" > "}</span>
          <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
            Protection Packages
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
          {/* Left Section - Protection Packages & Add-ons */}
          <div className="space-y-8 order-2 md:order-1">
            {/* Protection Packages Section */}
            <div>
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                  3/3 Protection Packages
                </span>
              </h2>

              <div className="space-y-4">
                {insurances && insurances.length > 0 ? (
                  insurances.map((pkg: any) => {
                    const features = parseFeatures(
                      pkg.short_description_for_website?.en ||
                        pkg.short_description ||
                        ""
                    );
                    const allFeatures = [
                      ...features.included,
                      ...features.excluded,
                    ];

                    const isSelected = selectedInsurances.includes(pkg.id);

                    return (
                      <div
                        key={pkg.id}
                        onClick={() => toggleInsurance(pkg.id)}
                        className={`border-2 rounded-lg p-6 cursor-pointer transition-all bg-[#00091D] ${
                          isSelected
                            ? "border-[#01E0D7]"
                            : "border-slate-700 hover:border-slate-600"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                isSelected
                                  ? "border-[#01E0D7] bg-[#01E0D7]"
                                  : "border-slate-400"
                              }`}
                            >
                              {isSelected && (
                                <Check className="w-4 h-4 text-black" />
                              )}
                            </div>
                            <h3 className="text-xl font-semibold text-white">
                              {pkg.name ||
                                pkg.label ||
                                pkg.description ||
                                "Insurance"}
                            </h3>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-white">
                              {getChargeDisplayText(pkg)}
                            </span>
                          </div>
                        </div>

                        {/* Features */}
                        {allFeatures.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {allFeatures.map((feature, index) => {
                              const isIncluded =
                                features.included.includes(feature);
                              return (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2 bg-slate-800/50 px-3 py-2 rounded-lg"
                                >
                                  {isIncluded ? (
                                    <Check className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <X className="w-4 h-4 text-red-500" />
                                  )}
                                  <span className="text-sm text-gray-300">
                                    {feature}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div
                            className="text-sm text-gray-400"
                            dangerouslySetInnerHTML={{
                              __html:
                                pkg.short_description_for_website?.en ||
                                pkg.short_description ||
                                "",
                            }}
                          />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400">
                    No insurance packages available
                  </p>
                )}
              </div>
            </div>

            {/* Add-ons Section */}
            <div>
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                  Which Add Ons Do You Need?
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addOns && addOns.length > 0 ? (
                  addOns.map((addOn: any) => {
                    // Icon is a string like "fas fa-loveseat", we'll use a default icon for now
                    // You can implement icon mapping later if needed
                    const isSelected = selectedAddOns.includes(addOn.id);

                    return (
                      <div
                        key={addOn.id}
                        onClick={() => toggleAddOn(addOn.id)}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all flex gap-4 bg-[#00091D] ${
                          isSelected
                            ? "border-[#01E0D7]"
                            : "border-slate-700 hover:border-slate-600"
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              isSelected
                                ? "border-[#01E0D7] bg-[#01E0D7]"
                                : "border-slate-400"
                            }`}
                          >
                            {isSelected && (
                              <Check className="w-4 h-4 text-black" />
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                          {/* Map icon string to component - simplified for now */}
                          {addOn.icon?.includes("loveseat") ? (
                            <Baby className="w-6 h-6 text-[#00C2DD]" />
                          ) : addOn.icon?.includes("poll-people") ? (
                            <User className="w-6 h-6 text-[#00C2DD]" />
                          ) : addOn.icon?.includes("road") ? (
                            <Fuel className="w-6 h-6 text-[#00C2DD]" />
                          ) : (
                            <Wrench className="w-6 h-6 text-[#00C2DD]" />
                          )}
                          <h3 className="text-lg font-semibold text-white">
                            {addOn.name ||
                              addOn.label ||
                              addOn.description ||
                              "Add-on"}
                          </h3>

                          <p className="text-sm text-gray-400">
                            {addOn.description?.en ||
                              addOn.short_description_for_website?.en ||
                              ""}
                          </p>

                          <p className="text-lg font-bold text-white">
                            {getChargeDisplayText(addOn)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400">No add-ons available</p>
                )}
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              className="w-full bg-[#0136FB] hover:bg-[#0136FB]/80 text-white font-semibold text-3xl rounded-lg hidden md:block disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleCheckout}
              disabled={isLoading}
              style={{ height: "60px" }}
            >
              {isLoading ? (
                <>
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  Calculating...
                  </div>
                </>
              ) : (
                "Checkout"
              )}
            </Button>
          </div>

          {/* Right Section - Booking Details */}
          <div className="order-1 md:order-2">
            <BookingDetails
              mode="readonly"
              variant="compact"
              pickupLocation={bookingData?.pickupLocation}
              returnLocation={bookingData?.returnLocation}
              pickupDate={bookingData?.pickupDate}
              returnDate={bookingData?.returnDate}
              pickupTime={bookingData?.pickupTime || "02:00"}
              returnTime={bookingData?.returnTime || "02:00"}
              totalAmount={totalAmount}
              numberOfDays={bookingData?.numberOfDays}
              dailyRate={bookingData?.dailyRate}
              showBookingSummary={true}
              showIncludedItems={true}
              includedItems={[
                // Base rental amount
                ...(bookingData?.totalAmount && bookingData.totalAmount > 0
                  ? [
                      {
                        id: 0,
                        name: `Car Rental (${
                          bookingData.numberOfDays || 0
                        } day${bookingData.numberOfDays !== 1 ? "s" : ""})`,
                        price: bookingData.totalAmount,
                        type: "rental" as const,
                      },
                    ]
                  : []),
                // Selected additional charges
                ...selectedItems,
              ]}
            />
          </div>
        </div>

        <Button
          className="w-full bg-[#0136FB] hover:bg-[#0136FB]/80 text-white font-semibold text-xl rounded-lg block md:hidden disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleCheckout}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Calculating...
            </>
          ) : (
            "Checkout"
          )}
        </Button>
      </div>
    </div>
  );
}
