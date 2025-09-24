"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
// import WhyUsIcon from "./WhyUsIcon";

const leftColumnFeatures = [
  {
    id: 1,
    title: "Wide Car Selection",
    description:
      "Whether you need a compact car for the city, a spacious SUV for the family, or a luxury ride for special occasions, we've got you covered.",
    image: "/feature1.png",
    span: "col-span-12", // Full width on mobile, full width of left column on desktop
  },
  {
    id: 2,
    title: "Best Prices",
    description:
      "We provide competitive rates designed to fit every budget, with full transparency and absolutely no hidden fees.",
    image: "/feature2.png",
    span: "col-span-6", // Half width of left column
  },
  {
    id: 3,
    title: "Easy Booking",
    description:
      "Our simple online process lets you reserve your car in just a few clicks",
    image: "/feature3.png",
    span: "col-span-6", // Half width of left column
  },
];

const rightColumnFeatures = [
  {
    id: 4,
    title: "Flexible Plans",
    description:
      "Choose from daily, weekly, or monthly rentals to fit your schedule",
    image: "/feature4.png",
    span: "col-span-12", // Full width on mobile, full width of right column on desktop
  },
  {
    id: 5,
    title: "Trusted Service",
    description:
      "Every car is regularly maintained, cleaned, and ready to give you a safe and smooth driving experience.",
    image: "/feature5.png",
    span: "col-span-12", // Full width on mobile, full width of right column on desktop
  },
];

export default function WhyUs() {
  return (
    <div className="w-full py-16 bg-black pt-90 md:pt-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div className="flex-1 mb-6 lg:mb-0">
            <Image
              src="/whyusicon.png"
              alt="Why Us"
              width={52}
              height={52}
              className="mb-4"
            />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                What Makes Us Different
              </span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl">
              Flexible plans, great prices, and cars you can trust
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Button
              variant="outline"
              className="scale-120 items-center hover:scale-150 transition-transform duration-200"
            >
              Rent My Car
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - 8 cols on desktop, 12 cols on mobile */}
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-12 gap-6">
              {leftColumnFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className={`bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700/50 hover:border-[#01E0D7]/50 transition-all duration-300 ${feature.span}`}
                >
                  {/* Feature Image */}
                  <div className="relative h-32 md:h-40 lg:h-48">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="p-4 md:p-6">
                    <h3 className="text-white text-lg md:text-xl font-bold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - 4 cols on desktop, 12 cols on mobile */}
          <div className="col-span-12 lg:col-span-4">
            <div className="grid grid-cols-12 gap-6">
              {rightColumnFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className={`bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700/50 hover:border-[#01E0D7]/50 transition-all duration-300 ${feature.span}`}
                >
                  {/* Feature Image */}
                  <div className="relative h-32 md:h-40 lg:h-48">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="p-4 md:p-6">
                    <h3 className="text-white text-lg md:text-xl font-bold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
