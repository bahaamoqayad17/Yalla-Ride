"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function CarCard({ car }: { car: any }) {
  const router = useRouter();

  // Extract data from API response
  const imageUrl = car.images?.[0]?.url || car.public_image_link || "/car.png";
  const name = car.label_for_website?.en || car.name || "Car";
  const dailyRate = car.active_rates?.[0]?.daily_rate || "0.00";
  const seats = car.seats || 5;
  const transmission = car.transmission_type || "Automatic";
  const milesPerDay =
    car.distance_limit_per_day || car.distance_limit || "Unlimited";

  return (
    <div
      className="bg-[#00091D] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
      onClick={() => router.push(`/${car.id}`)}
    >
      {/* Car Image Section */}
      <div className="relative h-80 bg-gradient-to-br from-slate-100 to-slate-200">
        <Image src={imageUrl} alt={name} fill className="object-cover" />

        {/* Optional overlay for night scenes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Car Details Section */}
      <div className="p-6">
        {/* Brand and Model */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {name.substring(0, 3).toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-white text-xl font-bold">{name}</h3>
            <p className="text-white/70 text-sm">{transmission}</p>
          </div>
        </div>

        {/* Specifications and Pricing */}
        <div className="flex justify-between items-center md:items-start">
          {/* Left Side - Specifications */}
          <div className="flex-1 space-y-3">
            {/* Mileage */}
            <div className="flex items-center gap-2">
              <span className="text-white/70 text-sm">Mileage : </span>
              <div className="text-white text-sm">{milesPerDay} km per day</div>
            </div>

            {/* Seats */}
            <div className="flex items-center gap-2">
              <span className="text-white/70 text-sm">Seats : </span>
              <div className="text-white text-sm">{seats} Seats</div>
            </div>

            {/* Doors */}
            {car.doors && (
              <div className="text-white text-sm">
                <span className="font-medium">{car.doors} Doors</span>
              </div>
            )}

            {/* Payment Info */}
            <div className="flex items-center gap-2">
              <span className="text-white/70 text-sm">Payment : </span>
              <div className="text-white text-sm">
                Pay at pick-up, free cancellation 
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="scale-110 flex-col items-center py-8 bg-transparent"
          >
            <div>
              <p className="text-white/70 text-xs mb-1"> start from</p>
              <p className="text-[#01E0D7] text-lg font-bold text-center">
                {Number(dailyRate)?.toFixed(2)} AED/DAY
              </p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
