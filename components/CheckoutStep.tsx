"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Check,
  Car,
  Upload,
  Shield,
  Calendar as CalendarIcon,
} from "lucide-react";
import BookingDetails from "@/components/BookingDetails";
import {
  createCustomer,
  uploadDriversLicense,
  confirmReservation,
} from "@/actions/hq-actions";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CheckoutStep({
  bookingData,
  customerFields,
  paymentMethods = [],
  car,
  selectedCharges = [],
  priceData,
  onCustomerCreated,
}: {
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
  customerFields?: any;
  paymentMethods?: any[];
  car?: any;
  selectedCharges?: string[];
  priceData?: any;
  onCustomerCreated?: (customerId: number) => void;
}) {
  const [verificationType, setVerificationType] = useState("visitor");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    number | null
  >(paymentMethods.length > 0 ? paymentMethods[0].id : null);

  // Form state
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [identityCardFile, setIdentityCardFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [licenseUploaded, setLicenseUploaded] = useState(false);
  const [reservationComplete, setReservationComplete] = useState(false);
  const [reservationId, setReservationId] = useState<number | null>(null);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  // System account fields (not part of HQ system)
  const [systemEmail, setSystemEmail] = useState<string>("");
  const [systemPassword, setSystemPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Extract included items from priceData
  const includedItems = React.useMemo(() => {
    if (!priceData?.selectedCharges || priceData.selectedCharges.length === 0) {
      return [];
    }

    return priceData.selectedCharges.map((charge: any) => ({
      id: charge.id || charge.additional_charge_id,
      name:
        charge.label_for_website_translated ||
        charge.name ||
        charge.label ||
        "Additional Charge",
      price: parseFloat(charge.price?.amount || charge.price || "0"),
      type: charge.additional_charge_category_id === 1 ? "insurance" : "addon",
    }));
  }, [priceData]);

  // Get the actual total price from priceData
  const actualTotalAmount = React.useMemo(() => {
    if (priceData?.totalPrice) {
      return priceData.totalPrice;
    }
    return bookingData?.totalAmount || 0;
  }, [priceData, bookingData]);

  // Handle form input changes
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Render field based on type
  const renderField = (field: any) => {
    const fieldKey = field.handle || field.dbcolumn;
    const fieldValue = formData[fieldKey] || formData[field.dbcolumn] || "";
    const isRequired = field.required === true;
    const label = field.label || field.name || fieldKey;

    switch (field.type) {
      case "datewithcalendar":
        return (
          <div
            key={field.id || fieldKey}
            className={field.fullWidth ? "col-span-2" : ""}
          >
            <label className="block text-sm font-medium mb-2 text-gray-300">
              {label}
              {isRequired && <span className="text-red-400 ml-1">*</span>}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-14 justify-start text-left font-normal bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                  {fieldValue
                    ? (() => {
                        try {
                          const date = new Date(fieldValue);
                          return isNaN(date.getTime())
                            ? `Select ${label}`
                            : format(date, "PPP");
                        } catch {
                          return `Select ${label}`;
                        }
                      })()
                    : `Select ${label}`}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                <CalendarComponent
                  mode="single"
                  selected={
                    fieldValue
                      ? (() => {
                          try {
                            const date = new Date(fieldValue);
                            return isNaN(date.getTime()) ? undefined : date;
                          } catch {
                            return undefined;
                          }
                        })()
                      : undefined
                  }
                  onSelect={(date) => {
                    if (date) {
                      handleInputChange(fieldKey, format(date, "yyyy-MM-dd"));
                    }
                  }}
                  className="bg-slate-800 text-white"
                />
              </PopoverContent>
            </Popover>
          </div>
        );

      case "image":
        return (
          <div
            key={field.id || fieldKey}
            className={field.fullWidth ? "col-span-2" : ""}
          >
            <label className="block text-sm font-medium mb-2 text-gray-300">
              {label}
              {isRequired && <span className="text-red-400 ml-1">*</span>}
            </label>
            <label className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-slate-500 transition-colors cursor-pointer block">
              <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-white text-sm font-medium mb-1">
                Upload {label}
              </p>
              {formData[fieldKey] && (
                <p className="text-xs text-gray-400">
                  {typeof formData[fieldKey] === "string"
                    ? formData[fieldKey]
                    : formData[fieldKey]?.name || "File selected"}
                </p>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if (file) {
                    handleInputChange(fieldKey, file);
                  }
                }}
              />
            </label>
          </div>
        );

      case "countries":
        return (
          <div
            key={field.id || fieldKey}
            className={field.fullWidth ? "col-span-2" : ""}
          >
            <label className="block text-sm font-medium mb-2 text-gray-300">
              {label}
              {isRequired && <span className="text-red-400 ml-1">*</span>}
            </label>
            <Input
              type="text"
              placeholder={label}
              className="text-white placeholder:text-gray-400 h-14 bg-slate-800 border-slate-700"
              value={fieldValue}
              onChange={(e) => handleInputChange(fieldKey, e.target.value)}
              required={isRequired}
              list={`${fieldKey}-countries`}
            />
            {/* You can add a datalist with countries here if needed */}
          </div>
        );

      case "email":
        return (
          <div
            key={field.id || fieldKey}
            className={field.fullWidth ? "col-span-2" : ""}
          >
            <label className="block text-sm font-medium mb-2 text-gray-300">
              {label}
              {isRequired && <span className="text-red-400 ml-1">*</span>}
            </label>
            <Input
              type="email"
              placeholder={label}
              className="text-white placeholder:text-gray-400 h-14 bg-slate-800 border-slate-700"
              value={fieldValue}
              onChange={(e) => handleInputChange(fieldKey, e.target.value)}
              required={isRequired}
            />
          </div>
        );

      case "tel":
      case "phone":
        return (
          <div
            key={field.id || fieldKey}
            className={field.fullWidth ? "col-span-2" : ""}
          >
            <label className="block text-sm font-medium mb-2 text-gray-300">
              {label}
              {isRequired && <span className="text-red-400 ml-1">*</span>}
            </label>
            <Input
              type="tel"
              placeholder={label}
              className="text-white placeholder:text-gray-400 h-14 bg-slate-800 border-slate-700"
              value={fieldValue}
              onChange={(e) => handleInputChange(fieldKey, e.target.value)}
              required={isRequired}
            />
          </div>
        );

      default:
        // Default to text input
        return (
          <div
            key={field.id || fieldKey}
            className={field.fullWidth ? "col-span-2" : ""}
          >
            <label className="block text-sm font-medium mb-2 text-gray-300">
              {label}
              {isRequired && <span className="text-red-400 ml-1">*</span>}
            </label>
            <Input
              type="text"
              placeholder={label}
              className="text-white placeholder:text-gray-400 h-14 bg-slate-800 border-slate-700"
              value={fieldValue}
              onChange={(e) => handleInputChange(fieldKey, e.target.value)}
              required={isRequired}
            />
          </div>
        );
    }
  };

  // Handle file uploads
  const handleFileChange = (
    type: "passport" | "identity" | "license",
    file: File | null
  ) => {
    if (type === "passport") {
      setPassportFile(file);
    } else if (type === "identity") {
      setIdentityCardFile(file);
    } else {
      setLicenseFile(file);
    }
  };

  // Step 6: Create Customer
  const handleCreateCustomer = async () => {
    if (!customerFields?.fields) {
      setError("Customer fields not loaded");
      return null;
    }

    try {
      // Map form data to API format using dbcolumn from field definitions
      const customerData: Record<string, any> = {};

      customerFields.fields.forEach((field: any) => {
        const dbColumn = field.dbcolumn;
        const handle = field.handle;
        const value = formData[handle] || formData[dbColumn];

        // Handle file uploads for image fields
        if (field.type === "image" && value instanceof File) {
          // File will be uploaded separately, skip for now
          return;
        }

        if (value !== undefined && value !== null && value !== "") {
          customerData[dbColumn] = value;
        }
      });

      // Prepare reservation data for the request
      // Convert time from HH:mm to HH:mm:ss format if needed
      const formatTime = (time: string | undefined) => {
        if (!time) return "02:00:00";
        if (time.split(":").length === 2) {
          return `${time}:00`;
        }
        return time;
      };

      const reservationData = {
        pick_up_date: bookingData?.pickupDate
          ? format(bookingData.pickupDate, "yyyy-MM-dd")
          : undefined,
        pick_up_time: formatTime(bookingData?.pickupTime),
        return_date: bookingData?.returnDate
          ? format(bookingData.returnDate, "yyyy-MM-dd")
          : undefined,
        return_time: formatTime(bookingData?.returnTime),
        pick_up_location: bookingData?.pickupLocation?.id,
        return_location: bookingData?.returnLocation?.id,
        brand_id: 1,
        vehicle_class_id: car?.id,
      };

      const result = await createCustomer(
        customerData,
        customerFields,
        reservationData
      );

      if (result.success && result.customerId) {
        setCustomerId(result.customerId);
        if (onCustomerCreated) {
          onCustomerCreated(result.customerId);
        }
        return result.customerId;
      } else {
        setError(result.message || "Failed to create customer");
        return null;
      }
    } catch (err) {
      setError("Failed to create customer");
      return null;
    }
  };

  // Step 7: Upload Documents (ID/Passport + Driver's License)
  const handleUploadLicense = async (customerId: number) => {
    if (!customerId) return true;

    // Prepare files array based on verification type
    const filesToUpload: Array<{
      file: File;
      filename: string;
      field_id: number;
    }> = [];

    // Add ID or Passport based on verification type
    if (verificationType === "visitor" && passportFile) {
      filesToUpload.push({
        file: passportFile,
        filename: passportFile.name,
        field_id: 275, // Passport field_id
      });
    } else if (verificationType === "resident" && identityCardFile) {
      filesToUpload.push({
        file: identityCardFile,
        filename: identityCardFile.name,
        field_id: 274, // ID field_id
      });
    }

    // Add Driver's License (always required)
    if (licenseFile) {
      filesToUpload.push({
        file: licenseFile,
        filename: licenseFile.name,
        field_id: 252, // Driver's License field_id
      });
    }

    // If no files to upload, return true (optional step)
    if (filesToUpload.length === 0) {
      return true;
    }

    try {
      const result = await uploadDriversLicense({
        item_id: customerId,
        files: filesToUpload,
      });

      if (result.success) {
        setLicenseUploaded(true);
        return true;
      } else {
        setError(result.message || "Failed to upload documents");
        return false;
      }
    } catch (err) {
      setError("Failed to upload documents");
      return false;
    }
  };

  // Step 8: Confirm Reservation
  const handleConfirmReservation = async (customerId: number) => {
    if (
      !car?.id ||
      !bookingData?.pickupDate ||
      !bookingData?.returnDate ||
      !selectedPaymentMethod
    ) {
      setError("Missing required information");
      return;
    }

    try {
      // Get customer name from form data
      let firstName = "";
      let lastName = "";

      if (customerFields?.fields) {
        customerFields.fields.forEach((field: any) => {
          const fieldKey = field.handle || field.dbcolumn;
          const value = formData[fieldKey] || formData[field.dbcolumn];

          if (
            field.handle === "first_name" ||
            field.dbcolumn === "first_name"
          ) {
            firstName = value || "";
          }
          if (field.handle === "last_name" || field.dbcolumn === "last_name") {
            lastName = value || "";
          }
        });
      }

      const fullName = `${firstName} ${lastName}`.trim() || "User";

      const result = await confirmReservation({
        vehicle_class_id: car.id,
        pick_up_location: bookingData.pickupLocation.id,
        return_location: bookingData.returnLocation.id,
        pick_up_date: format(bookingData.pickupDate, "yyyy-MM-dd"),
        pick_up_time: bookingData.pickupTime || "02:00",
        return_date: format(bookingData.returnDate, "yyyy-MM-dd"),
        return_time: bookingData.returnTime || "02:00",
        customer_id: customerId,
        payment_method_id: selectedPaymentMethod,
        additional_charges: selectedCharges,
        payment_external_redirect: window.location.href,
        email: systemEmail,
        password: systemPassword,
        name: fullName,
      });

      if (result.success) {
        setReservationId(result.reservationId);
        setPaymentLink(result.paymentLink || null);
        setReservationComplete(true);

        if (result.paymentLink) {
          // Auto-redirect after 2 seconds
          setTimeout(() => {
            window.location.href = result.paymentLink!;
          }, 2000);
        }
      } else {
        setError(result.message || "Failed to confirm reservation");
      }
    } catch (err) {
      setError("Failed to confirm reservation");
    }
  };

  // Validate system account fields
  const validateSystemAccount = () => {
    if (!systemEmail || !systemEmail.includes("@")) {
      setPasswordError("Please enter a valid email address");
      return false;
    }
    if (!systemPassword || systemPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    if (systemPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    setPasswordError(null);
    return true;
  };

  // Main booking handler
  const handleBookNow = async () => {
    if (!agreeToTerms || !selectedPaymentMethod) {
      setError("Please accept terms and select a payment method");
      return;
    }

    // Validate system account fields
    if (!validateSystemAccount()) {
      setError("Please fix the account information errors");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setPasswordError(null);

    try {
      // Step 6: Create customer
      const newCustomerId = await handleCreateCustomer();
      if (!newCustomerId) {
        setIsSubmitting(false);
        return;
      }

      // Step 7: Upload license (optional)
      await handleUploadLicense(newCustomerId);

      // Step 8: Confirm reservation
      await handleConfirmReservation(newCustomerId);
    } catch (err) {
      setError("An error occurred during booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-md text-gray-400 mb-8">
          <span className="hover:text-white">Home</span>
          <span className="mx-2">{" > "}</span>
          <span className="hover:text-white">Car Details</span>
          <span className="mx-2">{" > "}</span>
          <span className="hover:text-white">Protection Packages</span>
          <span className="mx-2">{" > "}</span>
          <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
            Checkout!
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
          {/* Left Column - User Input Sections */}
          <div className="space-y-8 order-2 md:order-1">
            {/* Personal Info Section */}
            <div>
              <h1 className="font-bold mb-4 text-3xl">
                <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                  3/3 Personal Info
                </span>
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#00091D] p-4 rounded-lg">
                {customerFields?.fields && customerFields.fields.length > 0
                  ? // Render all fields dynamically from API response (already filtered in server action)
                    customerFields.fields.map((field: any) =>
                      renderField(field)
                    )
                  : customerFields?.requiredFields &&
                    customerFields.requiredFields.length > 0
                  ? // Fallback to required fields if fields array is not available
                    customerFields.requiredFields.map((field: any) =>
                      renderField(field)
                    )
                  : // No fields available
                    null}
              </div>

              {/* Render image fields separately if any */}
              {customerFields?.imageFields &&
                customerFields.imageFields.length > 0 &&
                customerFields.imageFields.map((field: any) => (
                  <div key={field.id || field.handle} className="mt-4">
                    {renderField(field)}
                  </div>
                ))}
            </div>

            {/* System Account Section */}
            <div>
              <h1 className="font-bold mb-4 text-3xl">
                <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                  Create Account
                </span>
              </h1>

              <div className="space-y-4 bg-[#00091D] p-4 rounded-lg">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Email <span className="text-red-400 ml-1">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="text-white placeholder:text-gray-400 h-14 bg-slate-800 border-slate-700"
                    value={systemEmail}
                    onChange={(e) => setSystemEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Password <span className="text-red-400 ml-1">*</span>
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="text-white placeholder:text-gray-400 h-14 bg-slate-800 border-slate-700"
                    value={systemPassword}
                    onChange={(e) => setSystemPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Confirm Password{" "}
                    <span className="text-red-400 ml-1">*</span>
                  </label>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    className="text-white placeholder:text-gray-400 h-14 bg-slate-800 border-slate-700"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (systemPassword && e.target.value !== systemPassword) {
                        setPasswordError("Passwords do not match");
                      } else {
                        setPasswordError(null);
                      }
                    }}
                    required
                  />
                </div>

                {passwordError && (
                  <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
                    {passwordError}
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method Selection Section */}
            <div>
              <h1 className="font-bold mb-4 text-3xl">
                <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                  Payment Method
                </span>
              </h1>

              <div className="space-y-3 bg-[#00091D] p-4 rounded-lg">
                {paymentMethods.length > 0 ? (
                  paymentMethods.map((method: any) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? "border-[#01E0D7] bg-[#01E0D7]/10"
                          : "border-slate-700 hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              selectedPaymentMethod === method.id
                                ? "border-[#01E0D7] bg-[#01E0D7]"
                                : "border-slate-400"
                            }`}
                          >
                            {selectedPaymentMethod === method.id && (
                              <div className="w-3 h-3 bg-black rounded-full" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {method.label || method.name || method.handle}
                            </h3>
                            {method.gateway && (
                              <p className="text-sm text-gray-400">
                                {method.gateway.label}
                              </p>
                            )}
                          </div>
                        </div>
                        {method.gateway?.gateway_logo && (
                          <img
                            src={method.gateway.gateway_logo}
                            alt={method.label}
                            className="h-8 w-auto object-contain"
                          />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-4">
                    No payment methods available
                  </p>
                )}
              </div>
            </div>

            {/* Verification Document Section */}
            <div>
              <h1 className="font-bold mb-4 text-3xl bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                Verification Document{" "}
                <span className="text-sm font-normal">
                  (Optional But Required Before Car Pick-Up)
                </span>
              </h1>

              {/* Toggle Buttons */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setVerificationType("visitor")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    verificationType === "visitor"
                      ? "bg-[#0136FB] text-white"
                      : "bg-slate-800 text-gray-400 hover:text-white"
                  }`}
                >
                  Visitor In The UAE
                </button>
                <button
                  onClick={() => setVerificationType("resident")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    verificationType === "resident"
                      ? "bg-[#0136FB] text-white"
                      : "bg-slate-800 text-gray-400 hover:text-white"
                  }`}
                >
                  Resident In The UAE
                </button>
              </div>

              {/* Upload Areas */}
              <div className="space-y-4">
                {verificationType === "visitor" ? (
                  // Visitor: Passport + Driver's License
                  <>
                    <label className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors cursor-pointer block">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-white font-medium mb-1">
                        Upload Your Passport Here
                      </p>
                      {passportFile && (
                        <p className="text-sm text-gray-400">
                          {passportFile.name}
                        </p>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={(e) =>
                          handleFileChange(
                            "passport",
                            e.target.files?.[0] || null
                          )
                        }
                      />
                    </label>

                    <label className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors cursor-pointer block">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-white font-medium mb-1">
                        Upload Your Driver&apos;s License Here
                      </p>
                      {licenseFile && (
                        <p className="text-sm text-gray-400">
                          {licenseFile.name}
                        </p>
                      )}
                      {licenseUploaded && (
                        <p className="text-sm text-green-400">✓ Uploaded</p>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={(e) =>
                          handleFileChange(
                            "license",
                            e.target.files?.[0] || null
                          )
                        }
                      />
                    </label>
                  </>
                ) : (
                  // Resident: Identity Card + Driver's License
                  <>
                    <label className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors cursor-pointer block">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-white font-medium mb-1">
                        Upload Your Identity Card Here
                      </p>
                      {identityCardFile && (
                        <p className="text-sm text-gray-400">
                          {identityCardFile.name}
                        </p>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={(e) =>
                          handleFileChange(
                            "identity",
                            e.target.files?.[0] || null
                          )
                        }
                      />
                    </label>

                    <label className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors cursor-pointer block">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-white font-medium mb-1">
                        Upload Your Driver&apos;s License Here
                      </p>
                      {licenseFile && (
                        <p className="text-sm text-gray-400">
                          {licenseFile.name}
                        </p>
                      )}
                      {licenseUploaded && (
                        <p className="text-sm text-green-400">✓ Uploaded</p>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={(e) =>
                          handleFileChange(
                            "license",
                            e.target.files?.[0] || null
                          )
                        }
                      />
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#0136FB] bg-transparent border-slate-600 rounded focus:ring-[#0136FB]"
              />
              <label htmlFor="terms" className="text-white text-sm">
                I agree with our terms and conditions and privacy policy.
              </label>
            </div>

            {/* Book Now Button */}
            <Button
              className="w-full bg-[#0136FB] hover:bg-[#0136FB]/80 text-white font-semibold py-4 text-lg rounded-lg"
              disabled={!agreeToTerms || isSubmitting || !selectedPaymentMethod}
              onClick={handleBookNow}
            >
              {isSubmitting ? "Processing..." : "Book Now"}
            </Button>
            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
            {reservationComplete && (
              <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-sm">
                {paymentLink ? (
                  <div>
                    <p>Reservation confirmed! Redirecting to payment...</p>
                    <Button
                      className="mt-2"
                      onClick={() => (window.location.href = paymentLink)}
                    >
                      Go to Payment
                    </Button>
                  </div>
                ) : (
                  <p>Reservation confirmed! Reservation ID: {reservationId}</p>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Booking Details */}
          <div className="order-1 md:order-2">
            <BookingDetails
              mode="readonly"
              variant="full"
              pickupLocation={bookingData?.pickupLocation}
              returnLocation={bookingData?.returnLocation}
              pickupDate={bookingData?.pickupDate}
              returnDate={bookingData?.returnDate}
              pickupTime={bookingData?.pickupTime || "02:00"}
              returnTime={bookingData?.returnTime || "02:00"}
              totalAmount={actualTotalAmount}
              numberOfDays={bookingData?.numberOfDays}
              dailyRate={bookingData?.dailyRate}
              includedItems={includedItems}
              showIncludedItems={true}
            />
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-16">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="w-5 h-5 text-[#01E0D7]" />
            <span className="text-white font-medium">
              All your data are safe
            </span>
          </div>
          <p className="text-gray-400 text-sm max-w-2xl">
            We are using the most advanced security to provide you the best
            experience ever.
          </p>
        </div>
      </div>
    </div>
  );
}
