"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Calendar,
  Clock,
  Info,
  MapPin,
  ChevronDown,
  Check,
} from "lucide-react";
import { format } from "date-fns";

interface IncludedItem {
  id: number;
  name: string;
  price: number;
  type?: "insurance" | "addon" | "rental";
}

interface BookingDetailsProps {
  mode?: "editable" | "readonly";
  // Location data
  pickupLocation?: any;
  returnLocation?: any;
  pickupLocations?: any[];
  returnLocations?: any[];
  // Date and time data
  pickupDate?: Date;
  returnDate?: Date;
  pickupTime?: string;
  returnTime?: string;
  // Pricing data
  totalAmount?: number;
  numberOfDays?: number;
  dailyRate?: string | number;
  // Included items
  includedItems?: IncludedItem[];
  showIncludedItems?: boolean;
  // Callbacks for editable mode
  onPickupLocationChange?: (location: any) => void;
  onReturnLocationChange?: (location: any) => void;
  onPickupDateChange?: (date: Date | undefined) => void;
  onReturnDateChange?: (date: Date | undefined) => void;
  onPickupTimeChange?: (time: string) => void;
  onReturnTimeChange?: (time: string) => void;
  // UI options
  showInfoBox?: boolean;
  showBookingSummary?: boolean;
  showNextStepButton?: boolean;
  onNextStep?: () => void;
  title?: string;
  variant?: "compact" | "full";
}

export default function BookingDetails({
  mode = "readonly",
  pickupLocation,
  returnLocation,
  pickupLocations = [],
  returnLocations = [],
  pickupDate,
  returnDate,
  pickupTime = "02:00",
  returnTime = "02:00",
  totalAmount = 0,
  numberOfDays = 0,
  dailyRate = "0.00",
  includedItems = [],
  showIncludedItems = false,
  onPickupLocationChange,
  onReturnLocationChange,
  onPickupDateChange,
  onReturnDateChange,
  onPickupTimeChange,
  onReturnTimeChange,
  showInfoBox = false,
  showBookingSummary = false,
  showNextStepButton = false,
  onNextStep,
  title = "Booking Details",
  variant = "full",
}: BookingDetailsProps) {
  const [pickupPopoverOpen, setPickupPopoverOpen] = useState(false);
  const [returnPopoverOpen, setReturnPopoverOpen] = useState(false);
  const [pickupDatePopoverOpen, setPickupDatePopoverOpen] = useState(false);
  const [returnDatePopoverOpen, setReturnDatePopoverOpen] = useState(false);

  const isEditable = mode === "editable";
  const isCompact = variant === "compact";

  // Format time for display
  const formatTime = (time: string) => {
    if (!time) return "2:00 am";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "pm" : "am";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Format date for display
  const formatDateDisplay = (date: Date | undefined) => {
    if (!date) return "date";
    return format(date, "MMM dd");
  };

  // Format full date for summary
  const formatFullDate = (date: Date | undefined) => {
    if (!date) return "";
    return format(date, "EEEE, MMMM dd");
  };

  return (
    <div>
      <h2
        className={`font-bold bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent mb-6 ${
          isCompact ? "text-2xl" : "text-3xl"
        }`}
      >
        {title}
      </h2>

      {/* Pickup and Return Fields */}
      <div
        className={`${
          isCompact ? "bg-[#00091D] p-4" : "bg-[#00091D] p-8"
        } rounded-lg mb-6`}
      >
        {isEditable ? (
          // Editable mode - Grid layout with popovers
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-medium mb-2">Pickup</label>
              <Popover
                open={pickupPopoverOpen}
                onOpenChange={setPickupPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <div className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg p-3 cursor-pointer hover:border-slate-500 transition-colors">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-white text-sm flex-1 text-left truncate">
                      {pickupLocation?.label_for_website_translated ||
                        pickupLocation?.name ||
                        "location"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700 max-h-[300px] overflow-y-auto min-w-[200px]">
                  <div className="p-2">
                    {pickupLocations.length === 0 ? (
                      <div className="text-white/70 text-sm p-2">
                        No pickup locations available
                      </div>
                    ) : (
                      pickupLocations.map((location: any) => (
                        <div
                          key={location.id}
                          onClick={() => {
                            onPickupLocationChange?.(location);
                            setPickupPopoverOpen(false);
                          }}
                          className={`text-white text-sm p-2 rounded cursor-pointer hover:bg-slate-700 transition-colors ${
                            pickupLocation?.id === location.id
                              ? "bg-slate-700"
                              : ""
                          }`}
                        >
                          {location.label_for_website_translated ||
                            location.name}
                        </div>
                      ))
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Pickup Date */}
            <div>
              <label className="block text-sm font-medium mb-2">date</label>
              <Popover
                open={pickupDatePopoverOpen}
                onOpenChange={setPickupDatePopoverOpen}
              >
                <PopoverTrigger asChild>
                  <div className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg p-3 cursor-pointer hover:border-slate-500 transition-colors">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-white text-sm">
                      {formatDateDisplay(pickupDate)}
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                  <CalendarComponent
                    mode="single"
                    selected={pickupDate}
                    onSelect={(date) => {
                      onPickupDateChange?.(date);
                      setPickupDatePopoverOpen(false);
                    }}
                    className="bg-slate-800 text-white"
                  />
                </PopoverContent>
              </Popover>
              <div className="flex items-center space-x-2 mt-2 bg-slate-800 border border-slate-600 rounded-lg p-2">
                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <Input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => onPickupTimeChange?.(e.target.value)}
                  className="bg-transparent border-0 text-gray-300 text-sm p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:contrast-100"
                  step="900"
                />
              </div>
            </div>

            {/* Return Location */}
            <div>
              <label className="block text-sm font-medium mb-2">Return</label>
              <Popover
                open={returnPopoverOpen}
                onOpenChange={setReturnPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <div className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg p-3 cursor-pointer hover:border-slate-500 transition-colors">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-white text-sm flex-1 text-left truncate">
                      {returnLocation?.label_for_website_translated ||
                        returnLocation?.name ||
                        "location"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700 max-h-[300px] overflow-y-auto min-w-[200px]">
                  <div className="p-2">
                    {returnLocations.length === 0 ? (
                      <div className="text-white/70 text-sm p-2">
                        No return locations available
                      </div>
                    ) : (
                      returnLocations.map((location: any) => (
                        <div
                          key={location.id}
                          onClick={() => {
                            onReturnLocationChange?.(location);
                            setReturnPopoverOpen(false);
                          }}
                          className={`text-white text-sm p-2 rounded cursor-pointer hover:bg-slate-700 transition-colors ${
                            returnLocation?.id === location.id
                              ? "bg-slate-700"
                              : ""
                          }`}
                        >
                          {location.label_for_website_translated ||
                            location.name}
                        </div>
                      ))
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date */}
            <div>
              <label className="block text-sm font-medium mb-2">date</label>
              <Popover
                open={returnDatePopoverOpen}
                onOpenChange={setReturnDatePopoverOpen}
              >
                <PopoverTrigger asChild>
                  <div className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg p-3 cursor-pointer hover:border-slate-500 transition-colors">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-white text-sm">
                      {formatDateDisplay(returnDate)}
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                  <CalendarComponent
                    mode="single"
                    selected={returnDate}
                    onSelect={(date) => {
                      onReturnDateChange?.(date);
                      setReturnDatePopoverOpen(false);
                    }}
                    className="bg-slate-800 text-white"
                  />
                </PopoverContent>
              </Popover>
              <div className="flex items-center space-x-2 mt-2 bg-slate-800 border border-slate-600 rounded-lg p-2">
                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <Input
                  type="time"
                  value={returnTime}
                  onChange={(e) => onReturnTimeChange?.(e.target.value)}
                  className="bg-transparent border-0 text-gray-300 text-sm p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:contrast-100"
                  step="900"
                />
              </div>
            </div>
          </div>
        ) : // Read-only mode - Simple display
        isCompact ? (
          // Compact grid layout
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Pickup</label>
              <div className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg p-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-white text-sm">
                  {pickupLocation?.label_for_website_translated ||
                    pickupLocation?.name ||
                    "Dubai"}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">date</label>
              <div className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg p-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-white text-sm">
                  {formatDateDisplay(pickupDate)}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">
                  {formatTime(pickupTime)}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Return</label>
              <div className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg p-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-white text-sm">
                  {returnLocation?.label_for_website_translated ||
                    returnLocation?.name ||
                    "Dubai"}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">date</label>
              <div className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg p-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-white text-sm">
                  {formatDateDisplay(returnDate)}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">
                  {formatTime(returnTime)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          // Full layout with timeline
          <div className="space-y-6 mb-6">
            {/* Pickup */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Pickup</h3>
              <div className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-[#0136FB] rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-0.5 h-12 bg-slate-600 mt-2"></div>
                </div>
                <div>
                  <p className="text-white font-medium">
                    {pickupLocation?.label_for_website_translated ||
                      pickupLocation?.name ||
                      "This Is Example Terminal To The Location"}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {pickupDate && pickupTime
                      ? `${format(
                          pickupDate,
                          "EEE, dd.MMM.yyyy"
                        )} | ${formatTime(pickupTime)}`
                      : "Sat,13.Sep,2025 | 21:00"}
                  </p>
                </div>
              </div>
            </div>

            {/* Return */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Return</h3>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#0136FB] rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    {returnLocation?.label_for_website_translated ||
                      returnLocation?.name ||
                      "This Is Example Terminal To The Location"}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {returnDate && returnTime
                      ? `${format(
                          returnDate,
                          "EEE, dd.MMM.yyyy"
                        )} | ${formatTime(returnTime)}`
                      : "Sat,13.Sep,2025 | 21:00"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Information Box */}
        {showInfoBox && (
          <div className="bg-[#0136FB]/20 border border-[#0136FB]/30 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-[#01E0D7] mr-3 mt-1 flex-shrink-0" />
              <p className="text-sm text-gray-300">
                enter your details here to continue your booking
              </p>
            </div>
          </div>
        )}

        {/* Booking Summary Info Box */}
        {showBookingSummary && pickupDate && returnDate && numberOfDays > 0 && (
          <div className="rounded-lg mb-6">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <p className="text-sm text-gray-300">
                You have booked for{" "}
                <span className="text-[#01E0D7] font-medium">
                  {numberOfDays} day{numberOfDays !== 1 ? "s" : ""}
                </span>
                , from {formatFullDate(pickupDate)} until{" "}
                {format(returnDate, "MMMM dd")}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Included Items Section */}
      {showIncludedItems && (
        <div className="bg-[#00091D] p-4 rounded-lg mb-6">
          <div className="space-y-3">
            {includedItems && includedItems.length > 0 ? (
              includedItems.map((item) => (
                <div
                  key={`${item.type || "item"}-${item.id}`}
                  className="flex items-start justify-between"
                >
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white text-sm">{item.name}</p>
                  </div>
                  <span
                    className={`text-sm font-medium ml-4 ${
                      item.price === 0 ? "text-[#01E0D7]" : "text-white"
                    }`}
                  >
                    {item.price === 0
                      ? "included"
                      : `AED ${item.price.toFixed(2)}`}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-white text-sm">
                    No additional charges selected
                  </p>
                </div>
                <span className="text-[#01E0D7] text-sm font-medium ml-4">
                  included
                </span>
              </div>
            )}
          </div>

          {/* Separator Line */}
          <div className="border-t border-slate-600 mt-6 mb-6"></div>
        </div>
      )}

      {/* Total Amount */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Total Amount</span>
          <span className="text-2xl font-bold text-[#01E0D7]">
            {totalAmount > 0 ? `AED ${totalAmount.toFixed(2)}` : "AED 0.00"}
          </span>
        </div>
        {numberOfDays > 0 && (
          <p className="text-sm text-gray-400 mt-2 text-right">
            {numberOfDays} day{numberOfDays !== 1 ? "s" : ""} × AED{" "}
            {Number(dailyRate).toFixed(2)}/day
          </p>
        )}
      </div>

      {/* Next Step Button */}
      {showNextStepButton && onNextStep && (
        <Button
          className="w-full bg-[#0136FB] hover:bg-[#0136FB]/80 py-8 text-2xl rounded-lg font-semibold mb-4"
          onClick={onNextStep}
        >
          Next Step
        </Button>
      )}

      {/* Booking Summary (Editable mode only) */}
      {isEditable && pickupDate && returnDate && numberOfDays > 0 && (
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-[#01E0D7] mr-3 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-300">
                You have booked for{" "}
                <span className="text-[#01E0D7] font-medium">
                  {numberOfDays} day{numberOfDays !== 1 ? "s" : ""}
                </span>
                , from {formatFullDate(pickupDate)} until{" "}
                {format(returnDate, "MMMM dd")}{" "}
                <button className="text-[#01E0D7] text-sm font-medium hover:underline">
                  edit
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
