"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  CheckCircle,
  Info,
  Fuel,
  Gauge,
  Users,
  Zap,
  Timer,
  Briefcase,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { format, differenceInDays } from "date-fns";
import CarCard from "@/components/CarCard";
import ContactUs from "@/components/ContactUs";
import PackagesStep from "@/components/PackagesStep";
import CheckoutStep from "@/components/CheckoutStep";
import BookingDetails from "@/components/BookingDetails";
import {
  getApplicableAdditionalCharges,
  validateDatesAndGetVehicleClasses,
} from "@/actions/hq-actions";

export default function CarDetails({
  car,
  locations,
  similarCars,
  additionalCharges,
  datesConfig,
  customerFields,
  paymentMethods,
}: {
  car: any;
  locations: any;
  similarCars: any;
  additionalCharges: any;
  datesConfig?: any;
  customerFields?: any;
  paymentMethods?: any[];
}) {
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [pickupTime, setPickupTime] = useState<string>("02:00");
  const [returnTime, setReturnTime] = useState<string>("02:00");
  const [pickupLocation, setPickupLocation] = useState<any>(null);
  const [returnLocation, setReturnLocation] = useState<any>(null);
  const [step, setStep] = useState(1);

  // Reservation workflow state
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [carAvailability, setCarAvailability] = useState<any>(null);
  const [applicableCharges, setApplicableCharges] = useState<any[]>([]);
  const [selectedCharges, setSelectedCharges] = useState<string[]>([]);
  const [priceData, setPriceData] = useState<any>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);

  // Filter locations based on allowed operations
  const pickupLocations = useMemo(
    () => locations?.filter((loc: any) => loc.pick_up_allowed === true) || [],
    [locations]
  );
  const returnLocations = useMemo(
    () => locations?.filter((loc: any) => loc.return_allowed === true) || [],
    [locations]
  );

  // Extract data from API response
  const carName = car?.label_for_website?.en || car?.name || "Car";
  // Get all images from the car, or use public_image_link as fallback
  const carImages =
    car?.images && car.images.length > 0
      ? car.images.map((img: any) => img.public_link)
      : car?.public_image_link
      ? [car.public_image_link]
      : ["/car.png"];
  const carDescription =
    car?.description_for_website?.en ||
    car?.short_description_for_website?.en ||
    "";
  const carBrand = car?.brand?.name || "YallaRide";
  const dailyRate = car?.active_rates?.[0]?.daily_rate || "0.00";
  const seats = car?.seats;
  const doors = car?.doors;
  const transmission = car?.transmission_type || "Automatic";
  const engineType = car?.engine_type;
  // const horsepower = car?.horsepower; // Not in API response
  // const acceleration = car?.acceleration; // Not in API response
  // const maxPrice = car?.maxPrice; // Not in API response

  // Calculate total amount based on days
  const calculateTotal = () => {
    if (!pickupDate || !returnDate || !dailyRate) return 0;
    const days = differenceInDays(returnDate, pickupDate);
    if (days <= 0) return 0;
    return Number(dailyRate) * days;
  };

  const totalAmount = useMemo(
    () => calculateTotal(),
    [pickupDate, returnDate, dailyRate]
  );
  const numberOfDays = useMemo(
    () =>
      pickupDate && returnDate ? differenceInDays(returnDate, pickupDate) : 0,
    [pickupDate, returnDate]
  );

  // Step 2: Validate dates before allowing navigation to step 2
  const handleValidateDates = async () => {
    if (!pickupDate || !returnDate || !pickupLocation || !returnLocation) {
      setValidationError("Please select all required fields");
      return false;
    }

    try {
      setIsValidating(true);
      setValidationError(null);

      // Convert time from HH:mm to HH:mm:ss format
      const pick_up_time = `${pickupTime}:00`;
      const return_time = `${returnTime}:00`;

      const result = await validateDatesAndGetVehicleClasses({
        pick_up_location: pickupLocation.id,
        return_location: returnLocation.id,
        pick_up_date: format(pickupDate, "yyyy-MM-dd"),
        pick_up_time,
        return_date: format(returnDate, "yyyy-MM-dd"),
        return_time,
        car_id: car.id,
      });

      console.log(result);

      if (result?.success && result?.data) {
        setCarAvailability(result?.data);
        return true;
      } else {
        setValidationError(result?.message || "Failed to validate dates");
        return false;
      }
    } catch (err) {
      setValidationError("Failed to validate dates");
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  // Fetch applicable charges function
  const fetchCharges = async () => {
    try {
      // Convert time from HH:mm to HH:mm:ss format
      const pick_up_time = `${pickupTime}:00`;
      const return_time = `${returnTime}:00`;

      const result = await getApplicableAdditionalCharges({
        vehicle_class_id: car.id,
        pick_up_location: pickupLocation.id,
        return_location: returnLocation.id,
        pick_up_date: format(pickupDate, "yyyy-MM-dd"),
        pick_up_time,
        return_date: format(returnDate, "yyyy-MM-dd"),
        return_time,
      });

      console.log("result from charges", result);

      if (result.success && result.data) {
        const charges = result.data.data.additional_charges || [];
        setApplicableCharges(charges);
        return charges;
      }
      return null;
    } catch (err) {
      console.error("Failed to get charges:", err);
      return null;
    }
  };

  const handleNextStep = async () => {
    const isValid = await handleValidateDates();
    if (isValid) {
      // Fetch additional charges before moving to next step
      await fetchCharges();

      setStep(2);
    }
  };

  // Step 3: Fetch applicable charges when dates are validated (automatic)
  useEffect(() => {
    if (carAvailability) {
      fetchCharges();
    }
  }, [
    carAvailability,
    car?.id,
    pickupDate,
    returnDate,
    pickupLocation,
    returnLocation,
    pickupTime,
    returnTime,
  ]);

  // Initialize selectedCharges from pre-selected items in additionalCharges
  useEffect(() => {
    if (
      additionalCharges &&
      (additionalCharges.insurances || additionalCharges.addOns)
    ) {
      const charges: string[] = [];

      // Add pre-selected insurances
      const selectedInsurances =
        additionalCharges.insurances
          ?.filter((pkg: any) => pkg.selected)
          .map((pkg: any) => pkg.id.toString()) || [];

      // Add pre-selected add-ons
      const selectedAddOns =
        additionalCharges.addOns
          ?.filter((addOn: any) => addOn.selected)
          .map((addOn: any) => addOn.id.toString()) || [];

      charges.push(...selectedInsurances, ...selectedAddOns);

      if (charges.length > 0 && selectedCharges.length === 0) {
        setSelectedCharges(charges);
      }
    }
  }, [additionalCharges]);

  // Price calculation is now handled by PackagesStep when user clicks checkout
  // The price data will be set via onPriceCalculated callback

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        {step === 1 && (
          <>
            <div className="flex md:flex-row flex-col gap-4 md:gap-0 justify-between items-center mb-8">
              <div>
                {/* Breadcrumb */}
                <nav className="text-lg text-gray-400 mb-4">
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                  <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                    &nbsp;&nbsp;{"  >  "}&nbsp;&nbsp; car details
                  </span>
                </nav>

                {/* Car Name */}
                <h1 className="text-3xl font-bold mb-2">{carName}</h1>

                {/* Price */}
                <p className="text-xl text-[#01E0D7] font-semibold">
                  AED {Number(dailyRate).toFixed(2)}/DAY
                  {/* {car.currency}
                  {car.price}-{car.maxPrice}/{car.period} */}
                </p>
              </div>

              {/* Book Now Button */}
              <Button
                className="bg-[#0136FB] hover:bg-[#0136FB]/80 px-8 py-5 text-lg rounded-lg font-semibold"
                onClick={handleNextStep}
                disabled={isValidating}
              >
                {isValidating ? "Validating..." : "Book Now!"}
              </Button>
              {validationError && (
                <div className="mt-2 text-red-500 text-sm">
                  {validationError}
                </div>
              )}
            </div>

            {/* Car Image Carousel Section */}
            <div className="relative mb-12">
              <Carousel
                className="w-full"
                opts={{
                  loop: true,
                }}
              >
                <CarouselContent>
                  {carImages.map((imageUrl: string, index: number) => (
                    <CarouselItem key={index}>
                      <div className="relative w-full h-96 md:h-170 bg-slate-900 rounded-2xl overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={`${carName} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {carImages.length > 1 && (
                  <>
                    <CarouselPrevious className="left-4 bg-black/50 hover:bg-black/70 border-white/20 text-white" />
                    <CarouselNext className="right-4 bg-black/50 hover:bg-black/70 border-white/20 text-white" />
                  </>
                )}
                {/* 360 View Icon */}
                {carImages.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-3">
                    <span className="text-white text-sm font-medium">
                      {carImages.length} Photos
                    </span>
                  </div>
                )}
              </Carousel>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-42">
              {/* Left Column - Car Features */}
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent mb-6">
                  {carBrand} Feature
                </h2>

                {/* Description */}
                {carDescription && (
                  <div className="space-y-4 mb-8 bg-[#00091D] p-8 rounded-lg">
                    <p className="text-gray-300 leading-relaxed">
                      {carDescription}
                    </p>
                    {/* <p className="text-gray-300 leading-relaxed">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                      occaecat cupidatat non proident, sunt in culpa qui officia
                      deserunt mollit anim id est laborum.
                    </p> */}
                  </div>
                )}

                {/* Car Specifications Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#00091D] rounded-lg p-4 flex items-center gap-4 justify-center">
                    <Fuel className="w-8 h-8 text-[#01E0D7]" />
                    <div className="flex flex-col gap-2 items-center">
                      <div className="py-1 px-4 rounded-2xl border border-[#0136FB]/30">
                        <span className="text-xs font-medium">Engine type</span>
                      </div>
                      <p className="text-3xl font-semibold">
                        {engineType || "N/A"}
                        {/* {car.engineType} */}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#00091D] rounded-lg p-4 flex items-center gap-4 justify-center">
                    <Gauge className="w-8 h-8 text-[#01E0D7]" />
                    <div className="flex flex-col gap-2 items-center">
                      <div className="py-1 px-4 rounded-2xl border border-[#0136FB]/30">
                        <span className="text-xs font-medium">
                          Transmission
                        </span>
                      </div>
                      <p className="text-lg md:text-2xl font-semibold">
                        {transmission}
                        {/* {car.transmission} */}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#00091D] rounded-lg p-4 flex items-center gap-4 justify-center">
                    <Users className="w-8 h-8 text-[#01E0D7]" />
                    <div className="flex flex-col gap-2 items-center">
                      <div className="py-1 px-4 rounded-2xl border border-[#0136FB]/30">
                        <span className="text-xs font-medium">Seats</span>
                      </div>
                      <p className="text-3xl font-semibold">
                        {seats || "5"}
                        {/* {car.seats} */}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#00091D] rounded-lg p-4 flex items-center gap-4 justify-center">
                    <Users className="w-8 h-8 text-[#01E0D7]" />
                    <div className="flex flex-col gap-2 items-center">
                      <div className="py-1 px-4 rounded-2xl border border-[#0136FB]/30">
                        <span className="text-xs font-medium">Doors</span>
                      </div>
                      <p className="text-3xl font-semibold">
                        {doors || "4"}
                        {/* {car.doors} */}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#00091D] rounded-lg p-4 flex items-center gap-4 justify-center">
                    <Briefcase className="w-8 h-8 text-[#01E0D7]" />
                    <div className="flex flex-col gap-2 items-center">
                      {/* Horse power - Not available in API */}
                      <div className="py-1 px-4 rounded-2xl border border-[#0136FB]/30">
                        <span className="text-xs font-medium">Bags</span>
                      </div>
                      <p className="text-3xl font-semibold">
                        {car.bags || "2"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#00091D] rounded-lg p-4 flex items-center gap-4 justify-center">
                    <Timer className="w-8 h-8 text-[#01E0D7]" />
                    <div className="flex flex-col gap-2 items-center">
                      {/* Acceleration - Not available in API */}
                      <div className="py-1 px-4 rounded-2xl border border-[#0136FB]/30">
                        <span className="text-xs font-medium">Mileage</span>
                      </div>
                      <p className="text-3xl font-semibold">unlimited</p>
                    </div>
                  </div>
                </div>

                {/* Loyalty Cashback Sections */}
                {/* <div className="space-y-4"> */}
                {/* <div className="flex bg-[#00091D] p-6 rounded-lg gap-4 mb-4 flex-1 w-full">
                  <CheckCircle className="w-6 h-6 text-[#01E0D7] flex-shrink-0" />
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                      <p className="text-white font-medium mb-1">
                        Loyalty Cashback
                      </p>
                      <p className="text-gray-300 text-sm">
                        Added to your loyalty account, as a reward for driving
                        without polluting
                      </p>
                    </div>

                    <p className="text-[#01E0D7] text-sm font-medium">
                      Included
                    </p>
                  </div>
                </div>

                <div className="flex bg-[#00091D] p-6 rounded-lg gap-4 mb-4 flex-1 w-full">
                  <CheckCircle className="w-6 h-6 text-[#01E0D7] flex-shrink-0" />
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                      <p className="text-white font-medium mb-1">
                        Loyalty Cashback
                      </p>
                      <p className="text-gray-300 text-sm">
                        Added to your loyalty account, as a reward for driving
                        without polluting
                      </p>
                    </div>

                    <p className="text-[#01E0D7] text-sm font-medium">
                      Included
                    </p>
                  </div>
                </div> */}
              </div>
              {/* </div> */}

              {/* Right Column - Booking Details */}
              <div>
                <BookingDetails
                  mode="editable"
                  pickupLocation={pickupLocation}
                  returnLocation={returnLocation}
                  pickupLocations={pickupLocations}
                  returnLocations={returnLocations}
                  pickupDate={pickupDate}
                  returnDate={returnDate}
                  pickupTime={pickupTime}
                  returnTime={returnTime}
                  totalAmount={totalAmount}
                  numberOfDays={numberOfDays}
                  dailyRate={dailyRate}
                  onPickupLocationChange={setPickupLocation}
                  onReturnLocationChange={setReturnLocation}
                  onPickupDateChange={setPickupDate}
                  onReturnDateChange={setReturnDate}
                  onPickupTimeChange={setPickupTime}
                  onReturnTimeChange={setReturnTime}
                  showInfoBox={true}
                  showNextStepButton={true}
                  onNextStep={handleNextStep}
                  variant="compact"
                />
              </div>
            </div>

            {/* Explore Similar Cars Section */}
            {similarCars.length > 0 && (
              <div className="mt-16">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent mb-8">
                  Explore similar cars
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {similarCars.map((similarCar: any) => (
                    <CarCard key={similarCar.id} car={similarCar} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <PackagesStep
              setStep={setStep}
              additionalCharges={applicableCharges}
              bookingData={{
                pickupLocation,
                returnLocation,
                pickupDate,
                returnDate,
                pickupTime,
                returnTime,
                totalAmount,
                numberOfDays,
                dailyRate,
              }}
              onChargesSelected={setSelectedCharges}
              car={car}
              onPriceCalculated={(priceData) => {
                // Set the full price data from server action response
                setPriceData(priceData);
              }}
            />
          </>
        )}
        {step === 3 && (
          <>
            <CheckoutStep
              bookingData={{
                pickupLocation,
                returnLocation,
                pickupDate,
                returnDate,
                pickupTime,
                returnTime,
                totalAmount,
                numberOfDays,
                dailyRate,
              }}
              customerFields={customerFields}
              paymentMethods={paymentMethods || []}
              car={car}
              selectedCharges={selectedCharges}
              priceData={priceData}
              onCustomerCreated={setCustomerId}
            />
          </>
        )}

        {/* Contact Us Section */}
        <ContactUs />
      </div>
    </div>
  );
}
