"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Car } from "lucide-react";
import CarCard from "./CarCard";
import CarHeader from "./CarHeader";
import { Button } from "./ui/button";

const carCategories = [
  { id: 1, name: "Economy Cars", count: 14, image: "/category-car.png" },
  { id: 2, name: "Economy Cars", count: 14, image: "/category-car.png" },
  { id: 3, name: "Economy Cars", count: 14, image: "/category-car.png" },
  { id: 4, name: "Economy Cars", count: 14, image: "/category-car.png" },
  { id: 5, name: "Economy Cars", count: 14, image: "/category-car.png" },
  { id: 6, name: "Economy Cars", count: 14, image: "/category-car.png" },
];

const cars = [
  {
    id: 1,
    brand: "BMW",
    model: "B8 Coupe",
    variant: "ALPINA",
    image: "/car-cover.png",
    transmission: "Automatic",
    horsepower: "612 hp",
    mileage: "3,123 km",
    mileageRate: "+AED 1 / for additional km",
    seats: 5,
    colors: ["#87CEEB", "#D3D3D3"],
    paymentInfo: "Pay at pick-up, free cancellation",
    price: "162.000",
    currency: "$",
    period: "DAY",
  },
  {
    id: 2,
    brand: "BMW",
    model: "B8 Coupe",
    variant: "ALPINA",
    image: "/car-cover.png",
    transmission: "Automatic",
    horsepower: "612 hp",
    mileage: "3,123 km",
    mileageRate: "+AED 1 / for additional km",
    seats: 5,
    colors: ["#000000", "#D3D3D3"],
    paymentInfo: "Pay at pick-up, free cancellation",
    price: "162.000",
    currency: "$",
    period: "DAY",
  },
  {
    id: 3,
    brand: "BMW",
    model: "B8 Coupe",
    variant: "ALPINA",
    image: "/car-cover.png",
    transmission: "Automatic",
    horsepower: "612 hp",
    mileage: "3,123 km",
    mileageRate: "+AED 1 / for additional km",
    seats: 5,
    colors: ["#FFD700", "#D3D3D3"],
    paymentInfo: "Pay at pick-up, free cancellation",
    price: "162.000",
    currency: "$",
    period: "DAY",
  },
  {
    id: 4,
    brand: "BMW",
    model: "B8 Coupe",
    variant: "ALPINA",
    image: "/car-cover.png",
    transmission: "Automatic",
    horsepower: "612 hp",
    mileage: "3,123 km",
    mileageRate: "+AED 1 / for additional km",
    seats: 5,
    colors: ["#000000", "#87CEEB"],
    paymentInfo: "Pay at pick-up, free cancellation",
    price: "162.000",
    currency: "$",
    period: "DAY",
  },
  {
    id: 5,
    brand: "BMW",
    model: "B8 Coupe",
    variant: "ALPINA",
    image: "/car-cover.png",
    transmission: "Automatic",
    horsepower: "612 hp",
    mileage: "3,123 km",
    mileageRate: "+AED 1 / for additional km",
    seats: 5,
    colors: ["#000000", "#FFD700"],
    paymentInfo: "Pay at pick-up, free cancellation",
    price: "162.000",
    currency: "$",
    period: "DAY",
  },
  {
    id: 6,
    brand: "BMW",
    model: "B8 Coupe",
    variant: "ALPINA",
    image: "/car-cover.png",
    transmission: "Automatic",
    horsepower: "612 hp",
    mileage: "3,123 km",
    mileageRate: "+AED 1 / for additional km",
    seats: 5,
    colors: ["#FFFFFF", "#D3D3D3"],
    paymentInfo: "Pay at pick-up, free cancellation",
    price: "162.000",
    currency: "$",
    period: "DAY",
  },
];

export default function CarsSection() {
  const [selectedCategory, setSelectedCategory] = useState(3); // Default to 3rd card as shown in image

  return (
    <div className="w-full py-16 bg-gradient-to-b from-black via-slate-900 to-black">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center">
            <CarHeader />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
              Find Your Perfect Rental Car
            </span>
          </h2>

          <p className="text-white text-lg md:text-xl">
            Wide range of cars at the best prices
          </p>
        </div>

        {/* Car Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-16">
          {carCategories.map((category) => (
            <div
              key={category.id}
              className={`relative cursor-pointer transition-all duration-300  ${
                selectedCategory === category.id
                  ? "transform scale-105"
                  : "hover:scale-102"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div
                className={`bg-slate-800/50 rounded-xl p-8 border-2 transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "border-[#01E0D7] shadow-lg shadow-[#01E0D7]/20"
                    : "border-transparent hover:border-slate-600"
                }`}
              >
                {/* Car Image */}
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={100}
                      height={100}
                      className="object-contain filter brightness-0 invert"
                    />
                  </div>
                </div>

                {/* Category Info */}
                <div className="text-center">
                  <h3 className="text-white text-sm font-medium mb-2">
                    {category.name}
                  </h3>

                  <div className="bg-slate-900/80 rounded-lg px-3 py-1 inline-block">
                    <span className="text-white text-xs font-semibold">
                      {category.count} CARS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button
            variant="outline"
            className="scale-150 items-center hover:scale-180 transition-transform duration-200"
          >
            Show All
          </Button>
        </div>
      </div>
    </div>
  );
}
