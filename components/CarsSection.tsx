"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import CarCard from "./CarCard";
import CarHeaderIcon from "@/icons/CarHeaderIcon";
import { Button } from "./ui/button";
import ReservationSearch from "./ReservationSearch";

const carCategories = [
  { id: 1, name: "Economy Cars", count: 14, image: "/category-car.png" },
  { id: 2, name: "Economy Cars", count: 14, image: "/category-car.png" },
  { id: 3, name: "Economy Cars", count: 14, image: "/category-car.png" },
  { id: 4, name: "Economy Cars", count: 14, image: "/category-car.png" },
  { id: 5, name: "Economy Cars", count: 14, image: "/category-car.png" },
  { id: 6, name: "Economy Cars", count: 14, image: "/category-car.png" },
];

export default function CarsSection({
  showSearch = false,
  cars,
}: {
  showSearch: boolean;
  cars: any;
}) {
  const [selectedCategory, setSelectedCategory] = useState(3); // Default to 3rd card as shown in image
  const [isVisible, setIsVisible] = useState(false);
  const [showAllCars, setShowAllCars] = useState(false);
  const [availabilityData, setAvailabilityData] = useState<any>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Use availability data if available, otherwise use all cars
  const displayCars = availabilityData?.data || availabilityData || cars;
  const isFiltered = !!availabilityData;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-black via-slate-900 to-black pb-86 pt-0 md:py-16"
      id="Catalog"
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div
            className={`flex justify-center transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <CarHeaderIcon />
          </div>

          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 ease-out delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
              Find Your Perfect Rental Car
            </span>
          </h2>

          <p
            className={`text-white text-lg md:text-xl transition-all duration-1000 ease-out delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            Wide range of cars at the best prices
          </p>
        </div>

        {showSearch && (
          <ReservationSearch
            onAvailabilityChange={(data) => {
              setAvailabilityData(data);
              setShowAllCars(false); // Reset show all when new search
            }}
          />
        )}

        {/* <div className="mb-16">
          <div className="flex gap-4 overflow-x-auto pb-4 md:hidden scrollbar-hide">
            {carCategories.map((category, index) => (
              <div
                key={category.id}
                className={`relative cursor-pointer transition-all my-2 duration-1000 ease-out flex-shrink-0 ${
                  selectedCategory === category.id
                    ? "transform scale-105"
                    : "hover:scale-102"
                } ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: `${700 + index * 100}ms`,
                  width: "140px",
                }}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div
                  className={`bg-slate-800/50 rounded-xl p-6 border-2 transition-all duration-300 h-full ${
                    selectedCategory === category.id
                      ? "border-[#01E0D7] shadow-lg shadow-[#01E0D7]/20"
                      : "border-transparent hover:border-slate-600"
                  }`}
                >
                  <div className="flex justify-center mb-3">
                    <div className="flex items-center justify-center">
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={60}
                        height={60}
                        className="object-contain filter brightness-0 invert"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-white text-xs font-medium mb-2">
                      {category.name}
                    </h3>

                    <div className="bg-slate-900/80 rounded-lg px-2 py-1 inline-block">
                      <span className="text-white text-xs font-semibold">
                        {category.count} CARS
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {carCategories.map((category, index) => (
              <div
                key={category.id}
                className={`relative cursor-pointer transition-all duration-1000 ease-out ${
                  selectedCategory === category.id
                    ? "transform scale-105"
                    : "hover:scale-102"
                } ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${700 + index * 100}ms` }}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div
                  className={`bg-slate-800/50 rounded-xl p-8 border-2 transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "border-[#01E0D7] shadow-lg shadow-[#01E0D7]/20"
                      : "border-transparent hover:border-slate-600"
                  }`}
                >
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
        </div> */}

        {isFiltered && (
          <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Search Results
                </h3>
                <p className="text-white/70 text-sm">
                  {displayCars?.length || 0} car
                  {displayCars?.length !== 1 ? "s" : ""} available for your
                  selected dates and locations
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setAvailabilityData(null);
                  setShowAllCars(false);
                }}
                className="text-white border-slate-600 hover:bg-slate-700"
              >
                Clear Search
              </Button>
            </div>
          </div>
        )}

        {/* Cars Grid */}
        {displayCars && displayCars.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(showAllCars || isFiltered
                ? displayCars
                : displayCars.slice(0, 6)
              )?.map((car: any, index: number) => (
                <div
                  key={car.id}
                  className={`transition-all duration-1000 ease-out ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${2000 + index * 150}ms` }}
                >
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          </>
        ) : isFiltered ? (
          <div className="text-center py-12">
            <p className="text-white/70 text-lg mb-4">
              No cars available for your selected criteria
            </p>
            <p className="text-white/50 text-sm">
              Try adjusting your dates or locations
            </p>
          </div>
        ) : null}

        {displayCars && displayCars.length > 6 && (
          <div
            className={`flex justify-center mt-10 transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "2200ms" }}
          >
            <Button
              variant="outline"
              className="scale-150 items-center hover:scale-180 transition-transform duration-200"
              onClick={() => setShowAllCars(!showAllCars)}
            >
              {showAllCars ? "Show Less" : "Show All"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
