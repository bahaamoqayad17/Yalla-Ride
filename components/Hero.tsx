"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import ReservationSearch from "./ReservationSearch";
import Carousel from "./Carousel";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

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

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);
  return (
    <header
      ref={heroRef}
      style={{
        backgroundImage: "url('/hero-bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative overflow-hidden"
    >
      <Navbar />
      {/* Background Pattern */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center py-20">
          {/* Left Section - Main Heading */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <h1
                className={`text-4xl lg:text-6xl font-bold text-white leading-tight transition-all duration-1000 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                Your Journey Starts
                <br />
                <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                  With YALLA RIDE
                </span>
              </h1>
              <p
                className={`text-xl lg:text-2xl text-gray-300 max-w-2xl transition-all duration-1000 ease-out delay-300 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                Experience luxury car rentals with premium vehicles and
                exceptional service
              </p>
            </div>
          </div>

          {/* Right Section - Customer Testimonials */}
          <div
            className={`relative transition-all duration-1000 ease-out delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-8 opacity-0 scale-95"
            }`}
          >
            <div className="backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 max-w-sm mx-auto lg:mx-0">
              {/* Avatars */}
              <div className="flex mb-4">
                <Image
                  src="/avatars.png"
                  alt="Happy Customers"
                  width={80}
                  height={20}
                />
              </div>

              {/* Customer Count */}
              <div className="mb-2">
                <p className="text-2xl font-bold">
                  <span className="text-[#01E0D7]">12.5K+</span>
                  <span className="text-white"> HAPPY CUSTOMERS</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                Rent your car with ease and speed enjoy the best deals, a wide
                range of vehicles.
              </p>
            </div>
          </div>
        </div>

        {/* Center Section - Car Image with Overlay */}
        <div
          className={`relative flex justify-center -mt-20 transition-all duration-1000 ease-out delay-700 ${
            isVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-12 opacity-0 scale-95"
          }`}
        >
          <div className="relative w-full my-5 md:my-0">
            {/* Car Image with Overlay */}
            <div className="relative w-full h-30 md:h-92">
              <Image
                src="/car.png"
                alt="Luxury Sports Car"
                fill
                className="w-full h-auto"
                priority
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Car Rental Search Interface */}
        <div
          className={`transition-all duration-1000 ease-out delay-900 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <ReservationSearch />
        </div>

        <div
          className={`transition-all duration-1000 ease-out delay-1100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Carousel />
        </div>
      </div>
    </header>
  );
}
