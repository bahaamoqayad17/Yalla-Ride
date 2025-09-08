"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface CarCardProps {
  car: {
    id: number;
    brand: string;
    model: string;
    variant?: string;
    image: string;
    transmission: string;
    horsepower: string;
    mileage: string;
    mileageRate?: string;
    seats: number;
    colors: string[];
    paymentInfo: string;
    price: string;
    currency?: string;
    period?: string;
  };
}

export default function CarCard({ car }: CarCardProps) {
  const router = useRouter();
  return (
    <div
      className="bg-[#00091D] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
      onClick={() => router.push(`/${car.id}`)}
    >
      {/* Car Image Section */}
      <div className="relative h-80 bg-gradient-to-br from-slate-100 to-slate-200">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover"
        />

        {/* Optional overlay for night scenes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Car Details Section */}
      <div className="bg-slate-900 p-6">
        {/* Brand and Model */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-xs font-bold">BMW</span>
            </div>
          </div>
          <div>
            <h3 className="text-white text-xl font-bold">
              {car.brand} {car.variant ? car.variant.toUpperCase() : ""}{" "}
              {car.model}
            </h3>
            <p className="text-white/70 text-sm">
              {car.transmission} • {car.horsepower}
            </p>
          </div>
        </div>

        {/* Specifications and Pricing */}
        <div className="flex justify-between items-start">
          {/* Left Side - Specifications */}
          <div className="flex-1 space-y-3">
            {/* Mileage */}
            <div className="text-white text-sm">
              <span className="font-medium">{car.mileage}</span>
              {car.mileageRate && (
                <span className="text-white/70"> {car.mileageRate}</span>
              )}
            </div>

            {/* Seats */}
            <div className="text-white text-sm">
              <span className="font-medium">{car.seats}</span>
            </div>

            {/* Colors */}
            <div className="flex items-center gap-2">
              <span className="text-white text-sm font-medium">Colors:</span>
              <div className="flex gap-2">
                {car.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border border-white/30"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Payment Info */}
            <div className="text-white/70 text-sm">{car.paymentInfo}</div>
          </div>
          <Button
            variant="outline"
            className="scale-110 flex-col items-center py-8 bg-transparent"
          >
            <div>
              <p className="text-white/70 text-xs mb-1"> start from</p>
              <p className="text-[#01E0D7] text-lg font-bold text-center">
                {car.currency || "$"}
                {car.price}/{car.period || "DAY"}
              </p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
