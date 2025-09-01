"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function ReservationSearch() {
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();

  return (
    <div className="relative max-w-6xl mx-auto mb-8">
      {/* Gradient Border Container */}
      <div className="relative bg-transparent rounded-2xl">
        <div
          className="backdrop-blur-sm rounded-2xl p-4"
          style={{
            backgroundColor: "#00091D",
          }}
        >
          <div className="flex flex-wrap items-center gap-4">
            {/* Pickup Location */}
            <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50 flex-1 min-w-[200px]">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">Pickup</span>
            </div>

            {/* Pickup Date */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50 cursor-pointer">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">
                    {pickupDate ? format(pickupDate, "MMM dd") : "date"}
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                <CalendarComponent
                  mode="single"
                  selected={pickupDate}
                  onSelect={setPickupDate}
                  className="bg-slate-800 text-white"
                />
              </PopoverContent>
            </Popover>

            {/* Pickup Time */}
            <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">2:00 am</span>
            </div>

            {/* Return Location */}
            <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50 flex-1 min-w-[200px]">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">return</span>
            </div>

            {/* Return Date */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50 cursor-pointer">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">
                    {returnDate ? format(returnDate, "MMM dd") : "date"}
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                <CalendarComponent
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  className="bg-slate-800 text-white"
                />
              </PopoverContent>
            </Popover>

            {/* Return Time */}
            <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">2:00 am</span>
            </div>

            {/* Explore Button */}
            <Button size="lg" className="px-12">
              Explore
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
