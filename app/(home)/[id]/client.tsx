"use client";

import React, { useMemo, useState } from "react";
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
  ChevronDown,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { format, differenceInDays } from "date-fns";
import CarCard from "@/components/CarCard";
import ContactUs from "@/components/ContactUs";
import PackagesStep from "@/components/PackagesStep";
import CheckoutStep from "@/components/CheckoutStep";

export default function CarDetails({
  car,
  locations,
  similarCars,
}: {
  car: any;
  locations: any;
  similarCars: any;
}) {
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
  const [step, setStep] = useState(1);

  // Filter locations based on allowed operations
  const pickupLocations = useMemo(
    () => locations?.filter((loc: any) => loc.pick_up_allowed === true) || [],
    [locations]
  );
  const returnLocations = useMemo(
    () => locations?.filter((loc: any) => loc.return_allowed === true) || [],
    [locations]
  );

  // Extract data from API response
  const carName = car?.label_for_website?.en || car?.name || "Car";
  // Get all images from the car, or use public_image_link as fallback
  const carImages =
    car?.images && car.images.length > 0
      ? car.images.map((img: any) => img.public_link)
      : car?.public_image_link
      ? [car.public_image_link]
      : ["/car.png"];
  const carDescription =
    car?.description_for_website?.en ||
    car?.short_description_for_website?.en ||
    "";
  const carBrand = car?.brand?.name || "YallaRide";
  const dailyRate = car?.active_rates?.[0]?.daily_rate || "0.00";
  const seats = car?.seats;
  const doors = car?.doors;
  const transmission = car?.transmission_type || "Automatic";
  const engineType = car?.engine_type;
  // const horsepower = car?.horsepower; // Not in API response
  // const acceleration = car?.acceleration; // Not in API response
  // const maxPrice = car?.maxPrice; // Not in API response

  // Calculate total amount based on days
  const calculateTotal = () => {
    if (!pickupDate || !returnDate || !dailyRate) return 0;
    const days = differenceInDays(returnDate, pickupDate);
    if (days <= 0) return 0;
    return Number(dailyRate) * days;
  };

  const totalAmount = useMemo(
    () => calculateTotal(),
    [pickupDate, returnDate, dailyRate]
  );
  const numberOfDays = useMemo(
    () =>
      pickupDate && returnDate ? differenceInDays(returnDate, pickupDate) : 0,
    [pickupDate, returnDate]
  );

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
                <h1 className="text-3xl font-bold mb-2">{carName}</h1>

                {/* Price */}
                <p className="text-xl text-[#01E0D7] font-semibold">
                  AED {Number(dailyRate).toFixed(2)}/DAY
                  {/* {car.currency}
                  {car.price}-{car.maxPrice}/{car.period} */}
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

            {/* Car Image Carousel Section */}
            <div className="relative mb-12">
              <Carousel
                className="w-full"
                opts={{
                  loop: true,
                }}
              >
                <CarouselContent>
                  {carImages.map((imageUrl: string, index: number) => (
                    <CarouselItem key={index}>
                      <div className="relative w-full h-96 md:h-170 bg-slate-900 rounded-2xl overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={`${carName} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {carImages.length > 1 && (
                  <>
                    <CarouselPrevious className="left-4 bg-black/50 hover:bg-black/70 border-white/20 text-white" />
                    <CarouselNext className="right-4 bg-black/50 hover:bg-black/70 border-white/20 text-white" />
                  </>
                )}
                {/* 360 View Icon */}
                {carImages.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-3">
                    <span className="text-white text-sm font-medium">
                      {carImages.length} Photos
                    </span>
                  </div>
                )}
              </Carousel>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-42">
              {/* Left Column - Car Features */}
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent mb-6">
                  {carBrand} Feature
                </h2>

                {/* Description */}
                {carDescription && (
                  <div className="space-y-4 mb-8 bg-[#00091D] p-8 rounded-lg">
                    <p className="text-gray-300 leading-relaxed">
                      {carDescription}
                    </p>
                    {/* <p className="text-gray-300 leading-relaxed">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                      occaecat cupidatat non proident, sunt in culpa qui officia
                      deserunt mollit anim id est laborum.
                    </p> */}
                  </div>
                )}

                {/* Car Specifications Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#00091D] rounded-lg p-4 flex items-center gap-4 justify-center">
                    <Fuel className="w-8 h-8 text-[#01E0D7]" />
                    <div className="flex flex-col gap-2 items-center">
                      <div className="py-1 px-4 rounded-2xl border border-[#0136FB]/30">
                        <span className="text-xs font-medium">Engine type</span>
                      </div>
                      <p className="text-3xl font-semibold">
                        {engineType || "N/A"}
                        {/* {car.engineType} */}
                      </p>
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
                        {transmission}
                        {/* {car.transmission} */}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#00091D] rounded-lg p-4 flex items-center gap-4 justify-center">
                    <Users className="w-8 h-8 text-[#01E0D7]" />
                    <div className="flex flex-col gap-2 items-center">
                      <div className="py-1 px-4 rounded-2xl border border-[#0136FB]/30">
                        <span className="text-xs font-medium">Seats</span>
                      </div>
                      <p className="text-3xl font-semibold">
                        {seats || "N/A"}
                        {/* {car.seats} */}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#00091D] rounded-lg p-4 flex items-center gap-4 justify-center">
                    <Users className="w-8 h-8 text-[#01E0D7]" />
                    <div className="flex flex-col gap-2 items-center">
                      <div className="py-1 px-4 rounded-2xl border border-[#0136FB]/30">
                        <span className="text-xs font-medium">Doors</span>
                      </div>
                      <p className="text-3xl font-semibold">
                        {doors || "N/A"}
                        {/* {car.doors} */}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#00091D] rounded-lg p-4 flex items-center gap-4 justify-center">
                    <Zap className="w-8 h-8 text-[#01E0D7]" />
                    <div className="flex flex-col gap-2 items-center">
                      {/* Horse power - Not available in API */}
                      {/* <div className="py-1 px-4 rounded-2xl border border-[#0136FB]/30">
                        <span className="text-xs font-medium">Horse power</span>
                      </div>
                      <p className="text-3xl font-semibold">{car.horsepower}</p> */}
                    </div>
                  </div>

                  <div className="bg-[#00091D] rounded-lg p-4 flex items-center gap-4 justify-center">
                    <Timer className="w-8 h-8 text-[#01E0D7]" />
                    <div className="flex flex-col gap-2 items-center">
                      {/* Acceleration - Not available in API */}
                      {/* <div className="py-1 px-4 rounded-2xl border border-[#0136FB]/30">
                        <span className="text-xs font-medium">0-100 km/h</span>
                      </div>
                      <p className="text-3xl font-semibold">
                        {car.acceleration}s
                      </p> */}
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
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      date
                    </label>
                    <Popover
                      open={pickupDatePopoverOpen}
                      onOpenChange={setPickupDatePopoverOpen}
                    >
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
                          onSelect={(date) => {
                            setPickupDate(date);
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
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="bg-transparent border-0 text-gray-300 text-sm p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:contrast-100"
                        step="900"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Return
                    </label>
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
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      date
                    </label>
                    <Popover
                      open={returnDatePopoverOpen}
                      onOpenChange={setReturnDatePopoverOpen}
                    >
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
                          onSelect={(date) => {
                            setReturnDate(date);
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
                        onChange={(e) => setReturnTime(e.target.value)}
                        className="bg-transparent border-0 text-gray-300 text-sm p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:contrast-100"
                        step="900"
                      />
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
                      {totalAmount > 0
                        ? `AED ${totalAmount.toFixed(2)}`
                        : "AED 0.00"}
                      {/* 4350$ */}
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
                <Button
                  className="w-full bg-[#0136FB] hover:bg-[#0136FB]/80 py-8 text-2xl rounded-lg font-semibold mb-4"
                  onClick={() => setStep(2)}
                >
                  Next Step
                </Button>

                {/* Booking Summary */}
                {pickupDate && returnDate && numberOfDays > 0 && (
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-start">
                      <Info className="w-5 h-5 text-[#01E0D7] mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-300">
                          You have booked for{" "}
                          <span className="text-[#01E0D7] font-medium">
                            {numberOfDays} day{numberOfDays !== 1 ? "s" : ""}
                          </span>
                          , from {format(pickupDate, "EEEE, MMMM dd")} until{" "}
                          {format(returnDate, "MMMM dd")}{" "}
                          <button className="text-[#01E0D7] text-sm font-medium hover:underline">
                            edit
                          </button>
                        </p>
                        {/* You have booked for{" "}
                        <span className="text-[#01E0D7] font-medium">
                          21 days
                        </span>
                        , from Wednesday, January 12 until February 1{" "} */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Explore Similar Cars Section */}
            {similarCars.length > 0 && (
              <div className="mt-16">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent mb-8">
                  Explore similar cars
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {similarCars.map((similarCar: any) => (
                    <CarCard key={similarCar.id} car={similarCar} />
                  ))}
                </div>
              </div>
            )}
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
