"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar, Clock, ChevronDown, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { getLocations, getAvailablitity } from "@/actions/hq-actions";
import { useState } from "react";
import { useEffect } from "react";

interface ReservationSearchProps {
  onAvailabilityChange?: (data: any) => void;
}

export default function ReservationSearch({
  onAvailabilityChange,
}: ReservationSearchProps) {
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [pickupTime, setPickupTime] = useState<string>("02:00");
  const [returnTime, setReturnTime] = useState<string>("02:00");
  const [pickupLocation, setPickupLocation] = useState<any>(null);
  const [returnLocation, setReturnLocation] = useState<any>(null);
  const [pickupPopoverOpen, setPickupPopoverOpen] = useState(false);
  const [pickupDatePopoverOpen, setPickupDatePopoverOpen] = useState(false);
  const [returnPopoverOpen, setReturnPopoverOpen] = useState(false);
  const [returnDatePopoverOpen, setReturnDatePopoverOpen] = useState(false);
  const [pickupLocations, setPickupLocations] = useState<any[]>([]);
  const [returnLocations, setReturnLocations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availabilityData, setAvailabilityData] = useState<any>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await getLocations();

      setPickupLocations(
        response.filter((loc: any) => loc.pick_up_allowed === true)
      );
      setReturnLocations(
        response.filter((loc: any) => loc.return_allowed === true)
      );
    };
    fetchLocations();
  }, []);

  const handleExplore = async () => {
    // Reset error
    setError(null);
    setAvailabilityData(null);

    // Validate required fields
    if (!pickupDate) {
      setError("Please select a pickup date");
      return;
    }

    if (!returnDate) {
      setError("Please select a return date");
      return;
    }

    if (!pickupLocation) {
      setError("Please select a pickup location");
      return;
    }

    if (!returnLocation) {
      setError("Please select a return location");
      return;
    }

    // Validate return date is after pickup date
    if (returnDate <= pickupDate) {
      setError("Return date must be after pickup date");
      return;
    }

    setIsLoading(true);

    try {
      // Format dates for the API
      // Parse time (HH:mm format)
      const [pickupHour, pickupMinute] = pickupTime.split(":").map(Number);
      const pickupDateTime = new Date(pickupDate);
      pickupDateTime.setHours(pickupHour, pickupMinute, 0, 0);
      const pickupDateISO = pickupDateTime.toISOString();

      // Parse return time
      const [returnHour, returnMinute] = returnTime.split(":").map(Number);
      const returnDateTime = new Date(returnDate);
      returnDateTime.setHours(returnHour, returnMinute, 0, 0);
      const returnDateISO = returnDateTime.toISOString();

      const result = await getAvailablitity({
        pick_up_date: pickupDateISO,
        return_date: returnDateISO,
        pick_up_location_id: pickupLocation.id,
        return_location_id: returnLocation.id,
      });

      setAvailabilityData(result);
      console.log("Availability data:", result);

      // Pass availability data to parent component
      if (onAvailabilityChange) {
        onAvailabilityChange(result);
      }

      // Scroll to results section
      setTimeout(() => {
        const catalogSection = document.getElementById("Catalog");
        if (catalogSection) {
          catalogSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } catch (err: any) {
      setError(
        err?.message || "Failed to fetch availability. Please try again."
      );
      console.error("Error fetching availability:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
      {/* Gradient Border Container */}
      <div className="relative bg-transparent rounded-2xl">
        <div
          className="backdrop-blur-sm rounded-2xl p-3 sm:p-4"
          style={{
            backgroundColor: "#00091D",
          }}
        >
          <div className="space-y-3 sm:space-y-0">
            {/* Mobile: 2-column grid, Desktop: single row */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row sm:items-center gap-3 sm:gap-2">
              {/* Pickup Location */}
              <Popover
                open={pickupPopoverOpen}
                onOpenChange={setPickupPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50 flex-1 min-w-[150px] sm:min-w-[160px] cursor-pointer hover:bg-slate-700/70 transition-colors">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm truncate">
                      {pickupLocation?.label_for_website_translated ||
                        pickupLocation?.name ||
                        "Pickup"}
                    </span>
                    <ChevronDown className="w-3 h-3 text-gray-400 flex-shrink-0 ml-auto" />
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
                            setPickupLocation(location);
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

              {/* Pickup Date */}
              <Popover
                open={pickupDatePopoverOpen}
                onOpenChange={setPickupDatePopoverOpen}
              >
                <PopoverTrigger asChild>
                  <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50 cursor-pointer min-w-[120px] sm:min-w-[100px]">
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-400 text-sm">
                      {pickupDate ? format(pickupDate, "MMM dd") : "date"}
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                  <CalendarComponent
                    mode="single"
                    selected={pickupDate}
                    onSelect={(date) => {
                      setPickupDate(date);
                      setPickupDatePopoverOpen(false);
                    }}
                    className="bg-slate-800 text-white"
                  />
                </PopoverContent>
              </Popover>

              {/* Pickup Time */}
              <div className="flex flex-col gap-1 min-w-[100px] sm:min-w-[100px]">
                <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50">
                  {/* <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" /> */}
                  <Input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="bg-transparent border-0 text-gray-300 text-sm p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:contrast-100"
                    step="900"
                  />
                </div>
              </div>

              {/* Return Location */}
              <Popover
                open={returnPopoverOpen}
                onOpenChange={setReturnPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50 flex-1 min-w-[150px] sm:min-w-[160px] cursor-pointer hover:bg-slate-700/70 transition-colors">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm truncate">
                      {returnLocation?.label_for_website_translated ||
                        returnLocation?.name ||
                        "Return"}
                    </span>
                    <ChevronDown className="w-3 h-3 text-gray-400 flex-shrink-0 ml-auto" />
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
                            setReturnLocation(location);
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

              {/* Return Date */}
              <Popover
                open={returnDatePopoverOpen}
                onOpenChange={setReturnDatePopoverOpen}
              >
                <PopoverTrigger asChild>
                  <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50 cursor-pointer min-w-[120px] sm:min-w-[100px]">
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-400 text-sm">
                      {returnDate ? format(returnDate, "MMM dd") : "date"}
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                  <CalendarComponent
                    mode="single"
                    selected={returnDate}
                    onSelect={(date) => {
                      setReturnDate(date);
                      setReturnDatePopoverOpen(false);
                    }}
                    className="bg-slate-800 text-white"
                  />
                </PopoverContent>
              </Popover>

              {/* Return Time */}
              <div className="flex flex-col gap-1 min-w-[100px] sm:min-w-[100px]">
                <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50">
                  {/* <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" /> */}
                  <Input
                    type="time"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    className="bg-transparent border-0 text-gray-300 text-sm p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                    step="900"
                  />
                </div>
              </div>

              {/* Explore Button - Full width on mobile, auto width on desktop */}
              <Button
                size="lg"
                className="px-6 sm:px-8 lg:px-12 w-full md:w-auto md:col-span-1 sm:col-span-2 hidden md:block"
                onClick={handleExplore}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </div>
                  </>
                ) : (
                  "Explore"
                )}
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-3 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <Button
              size="lg"
              className="px-6 sm:px-8 lg:px-12 w-full md:w-auto md:col-span-1 sm:col-span-2 block md:hidden"
              onClick={handleExplore}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : (
                "Explore"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
