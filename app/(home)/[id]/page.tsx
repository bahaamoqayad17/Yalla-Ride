"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  CheckCircle,
  Info,
  Fuel,
  Gauge,
  Users,
  Zap,
  Timer,
  MapPin,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import CarCard from "@/components/CarCard";
import ContactUs from "@/components/ContactUs";
import PackagesStep from "@/components/PackagesStep";
import CheckoutStep from "@/components/CheckoutStep";

// Car data - in a real app, this would come from an API
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
    doors: 2,
    engineType: "Petrol",
    acceleration: "6.1",
    colors: ["#87CEEB", "#D3D3D3"],
    paymentInfo: "Pay at pick-up, free cancellation",
    price: "162.000",
    maxPrice: "174.000",
    currency: "$",
    period: "DAY",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
    doors: 2,
    engineType: "Petrol",
    acceleration: "6.1",
    colors: ["#000000", "#D3D3D3"],
    paymentInfo: "Pay at pick-up, free cancellation",
    price: "162.000",
    maxPrice: "174.000",
    currency: "$",
    period: "DAY",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
    doors: 2,
    engineType: "Petrol",
    acceleration: "6.1",
    colors: ["#FFD700", "#D3D3D3"],
    paymentInfo: "Pay at pick-up, free cancellation",
    price: "162.000",
    maxPrice: "174.000",
    currency: "$",
    period: "DAY",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
    doors: 2,
    engineType: "Petrol",
    acceleration: "6.1",
    colors: ["#000000", "#87CEEB"],
    paymentInfo: "Pay at pick-up, free cancellation",
    price: "162.000",
    maxPrice: "174.000",
    currency: "$",
    period: "DAY",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
    doors: 2,
    engineType: "Petrol",
    acceleration: "6.1",
    colors: ["#000000", "#FFD700"],
    paymentInfo: "Pay at pick-up, free cancellation",
    price: "162.000",
    maxPrice: "174.000",
    currency: "$",
    period: "DAY",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
    doors: 2,
    engineType: "Petrol",
    acceleration: "6.1",
    colors: ["#FFFFFF", "#D3D3D3"],
    paymentInfo: "Pay at pick-up, free cancellation",
    price: "162.000",
    maxPrice: "174.000",
    currency: "$",
    period: "DAY",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

export default function CarDetails({ params }: { params: { id: string } }) {
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [step, setStep] = useState(1);

  const carId = parseInt(params.id);
  const car = cars.find((c) => c.id === carId);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Car Not Found</h1>
          <Link href="/">
            <Button className="bg-[#0136FB] hover:bg-[#0136FB]/80">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        {step === 1 && (
          <>
            <div className="flex md:flex-row flex-col gap-4 md:gap-0 justify-between items-center mb-8">
              <div>
                {/* Breadcrumb */}
                <nav className="text-lg text-gray-400 mb-4">
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                  <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                    &nbsp;&nbsp;{"  >  "}&nbsp;&nbsp; car details
                  </span>
                </nav>

                {/* Car Name */}
                <h1 className="text-3xl font-bold mb-2">
                  {car.brand} {car.variant} {car.model}
                </h1>

                {/* Price */}
                <p className="text-xl text-[#01E0D7] font-semibold">
                  {car.currency}
                  {car.price}-{car.maxPrice}/{car.period}
                </p>
              </div>

              {/* Book Now Button */}
              <Button
                className="bg-[#0136FB] hover:bg-[#0136FB]/80 px-8 py-5 text-lg rounded-lg font-semibold"
                onClick={() => setStep(2)}
              >
                Book Now!
              </Button>
            </div>

            {/* Car Image Section */}
            <div className="relative mb-12">
              <div className="relative w-full h-96 bg-slate-900 rounded-2xl overflow-hidden">
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover"
                  priority
                />
                {/* 360 View Icon */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-3">
                  <span className="text-white text-sm font-medium">360°</span>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-42">
              {/* Left Column - Car Features */}
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent mb-6">
                  {car.brand} Feature
                </h2>

                {/* Description */}
                <div className="space-y-4 mb-8 bg-[#00091D] p-8 rounded-lg">
                  <p className="text-gray-300 leading-relaxed">
                    {car.description}
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>

                {/* Car Specifications Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#00091D] rounded-lg p-4 flex items-center gap-4 justify-center">
                    <Fuel className="w-8 h-8 text-[#01E0D7]" />
                    <div className="flex flex-col gap-2 items-center">
                      <div className="py-1 px-4 rounded-2xl border border-[#0136FB]/30">
                        <span className="text-xs font-medium">Engine type</span>
                      </div>
                      <p className="text-3xl font-semibold">{car.engineType}</p>
                    </div>
                  </div>

                  <div className="bg-[#00091D] rounded-lg p-4 flex items-center gap-4 justify-center">
                    <Gauge className="w-8 h-8 text-[#01E0D7]" />
                    <div className="flex flex-col gap-2 items-center">
                      <div className="py-1 px-4 rounded-2xl border border-[#0136FB]/30">
                        <span className="text-xs font-medium">
                          Transmission
                        </span>
                      </div>
                      <p className="text-lg md:text-2xl font-semibold">
                        {car.transmission}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#00091D] rounded-lg p-4 flex items-center gap-4 justify-center">
                    <Users className="w-8 h-8 text-[#01E0D7]" />
                    <div className="flex flex-col gap-2 items-center">
                      <div className="py-1 px-4 rounded-2xl border border-[#0136FB]/30">
                        <span className="text-xs font-medium">Seats</span>
                      </div>
                      <p className="text-3xl font-semibold">{car.seats}</p>
                    </div>
                  </div>

                  <div className="bg-[#00091D] rounded-lg p-4 flex items-center gap-4 justify-center">
                    <Users className="w-8 h-8 text-[#01E0D7]" />
                    <div className="flex flex-col gap-2 items-center">
                      <div className="py-1 px-4 rounded-2xl border border-[#0136FB]/30">
                        <span className="text-xs font-medium">Doors</span>
                      </div>
                      <p className="text-3xl font-semibold">{car.doors}</p>
                    </div>
                  </div>

                  <div className="bg-[#00091D] rounded-lg p-4 flex items-center gap-4 justify-center">
                    <Zap className="w-8 h-8 text-[#01E0D7]" />
                    <div className="flex flex-col gap-2 items-center">
                      <div className="py-1 px-4 rounded-2xl border border-[#0136FB]/30">
                        <span className="text-xs font-medium">Horse power</span>
                      </div>
                      <p className="text-3xl font-semibold">{car.horsepower}</p>
                    </div>
                  </div>

                  <div className="bg-[#00091D] rounded-lg p-4 flex items-center gap-4 justify-center">
                    <Timer className="w-8 h-8 text-[#01E0D7]" />
                    <div className="flex flex-col gap-2 items-center">
                      <div className="py-1 px-4 rounded-2xl border border-[#0136FB]/30">
                        <span className="text-xs font-medium">0-100 km/h</span>
                      </div>
                      <p className="text-3xl font-semibold">
                        {car.acceleration}s
                      </p>
                    </div>
                  </div>
                </div>

                {/* Loyalty Cashback Sections */}
                {/* <div className="space-y-4"> */}
                <div className="flex bg-[#00091D] p-6 rounded-lg gap-4 mb-4 flex-1 w-full">
                  <CheckCircle className="w-6 h-6 text-[#01E0D7] flex-shrink-0" />
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                      <p className="text-white font-medium mb-1">
                        Loyalty Cashback
                      </p>
                      <p className="text-gray-300 text-sm">
                        Added to your loyalty account, as a reward for driving
                        without polluting
                      </p>
                    </div>

                    <p className="text-[#01E0D7] text-sm font-medium">
                      Included
                    </p>
                  </div>
                </div>

                <div className="flex bg-[#00091D] p-6 rounded-lg gap-4 mb-4 flex-1 w-full">
                  <CheckCircle className="w-6 h-6 text-[#01E0D7] flex-shrink-0" />
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                      <p className="text-white font-medium mb-1">
                        Loyalty Cashback
                      </p>
                      <p className="text-gray-300 text-sm">
                        Added to your loyalty account, as a reward for driving
                        without polluting
                      </p>
                    </div>

                    <p className="text-[#01E0D7] text-sm font-medium">
                      Included
                    </p>
                  </div>
                </div>
              </div>
              {/* </div> */}

              {/* Right Column - Booking Details */}
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent mb-6">
                  Booking Details
                </h2>

                {/* Pickup and Return Fields - 2x2 Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Row 1 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Pickup
                    </label>
                    <div className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg p-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="location"
                        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg p-3 cursor-pointer hover:border-slate-500 transition-colors">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <span className="text-white text-sm">
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
                    <div className="flex items-center space-x-2 mt-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">2:00 am</span>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Return
                    </label>
                    <div className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg p-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="location"
                        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg p-3 cursor-pointer hover:border-slate-500 transition-colors">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <span className="text-white text-sm">
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
                    <div className="flex items-center space-x-2 mt-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">2:00 am</span>
                    </div>
                  </div>
                </div>

                {/* Information Box */}
                <div className="bg-[#0136FB]/20 border border-[#0136FB]/30 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-[#01E0D7] mr-3 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-300">
                      enter your details here to continue your booking
                    </p>
                  </div>
                </div>

                {/* Included Items */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#01E0D7] mr-3 mt-1 flex-shrink-0" />
                      <p className="text-white text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </p>
                    </div>
                    <span className="text-[#01E0D7] text-sm font-medium ml-4">
                      included
                    </span>
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#01E0D7] mr-3 mt-1 flex-shrink-0" />
                      <p className="text-white text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </p>
                    </div>
                    <span className="text-[#01E0D7] text-sm font-medium ml-4">
                      included
                    </span>
                  </div>
                </div>

                {/* Separator Line */}
                <div className="border-t border-slate-600 mb-6"></div>

                {/* Total Amount */}
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Amount</span>
                    <span className="text-2xl font-bold text-[#01E0D7]">
                      4350$
                    </span>
                  </div>
                </div>

                {/* Next Step Button */}
                <Button
                  className="w-full bg-[#0136FB] hover:bg-[#0136FB]/80 py-8 text-2xl rounded-lg font-semibold mb-4"
                  onClick={() => setStep(2)}
                >
                  Next Step
                </Button>

                {/* Booking Summary */}
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-[#01E0D7] mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-300">
                        You have booked for{" "}
                        <span className="text-[#01E0D7] font-medium">
                          21 days
                        </span>
                        , from Wednesday, January 12 until February 1{" "}
                        <button className="text-[#01E0D7] text-sm font-medium hover:underline">
                          edit
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explore Similar Cars Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent mb-8">
                Explore similar cars
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cars
                  .filter((similarCar) => similarCar.id !== carId)
                  .slice(0, 2)
                  .map((similarCar) => (
                    <CarCard key={similarCar.id} car={similarCar} />
                  ))}
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <PackagesStep setStep={setStep} />
          </>
        )}
        {step === 3 && (
          <>
            <CheckoutStep />
          </>
        )}

        {/* Contact Us Section */}
        <ContactUs />
      </div>
    </div>
  );
}
