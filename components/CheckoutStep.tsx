"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Car, Upload, Shield } from "lucide-react";

export default function CheckoutStep() {
  const [verificationType, setVerificationType] = useState("visitor");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-md text-gray-400 mb-8">
          <span className="hover:text-white">Home</span>
          <span className="mx-2">{" > "}</span>
          <span className="hover:text-white">Car Details</span>
          <span className="mx-2">{" > "}</span>
          <span className="hover:text-white">Protection Packages</span>
          <span className="mx-2">{" > "}</span>
          <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
            Checkout!
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
          {/* Left Column - User Input Sections */}
          <div className="space-y-8">
            {/* Personal Info Section */}
            <div>
              <h1 className="font-bold mb-4 text-3xl">
                <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                  3/3 Personal Info
                </span>
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#00091D] p-4 rounded-lg">
                <div>
                  <Input
                    type="text"
                    placeholder="First Name"
                    className="text-white placeholder:text-gray-400 h-14 bg-slate-800 border-slate-700"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    className="text-white placeholder:text-gray-400 h-14 bg-slate-800 border-slate-700"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="text-white placeholder:text-gray-400 h-14 bg-slate-800 border-slate-700"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="+966 Phone Number"
                    className="text-white placeholder:text-gray-400 h-14 bg-slate-800 border-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Payment Info Section */}
            <div>
              <h1 className="font-bold mb-4 text-3xl">
                <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                  Payment Info
                </span>
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#00091D] p-4 rounded-lg">
                <div className="sm:col-span-2">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Card Number"
                      className="text-white placeholder:text-gray-400 h-14 bg-slate-800 border-slate-700 pr-20"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2">
                      <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                        VISA
                      </div>
                      <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                        MC
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Expiration Date"
                    className="text-white placeholder:text-gray-400 h-14 bg-slate-800 border-slate-700"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Card Holder"
                    className="text-white placeholder:text-gray-400 h-14 bg-slate-800 border-slate-700"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Cvv"
                    className="text-white placeholder:text-gray-400 h-14 bg-slate-800 border-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Verification Document Section */}
            <div>
              <h1 className="font-bold mb-4 text-3xl bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                Verification Document{" "}
                <span className="text-sm font-normal">
                  (Optional But Required Before Car Pick-Up)
                </span>
              </h1>

              {/* Toggle Buttons */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setVerificationType("visitor")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    verificationType === "visitor"
                      ? "bg-[#0136FB] text-white"
                      : "bg-slate-800 text-gray-400 hover:text-white"
                  }`}
                >
                  Visitor In The UAE
                </button>
                <button
                  onClick={() => setVerificationType("resident")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    verificationType === "resident"
                      ? "bg-[#0136FB] text-white"
                      : "bg-slate-800 text-gray-400 hover:text-white"
                  }`}
                >
                  Resident In The UAE
                </button>
              </div>

              {/* Upload Areas */}
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-white font-medium mb-1">
                    Upload Your Passport Here
                  </p>
                </div>

                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-white font-medium mb-1">
                    Upload Your Driver&apos;s License Here
                  </p>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#0136FB] bg-transparent border-slate-600 rounded focus:ring-[#0136FB]"
              />
              <label htmlFor="terms" className="text-white text-sm">
                I agree with our terms and conditions and privacy policy.
              </label>
            </div>

            {/* Book Now Button */}
            <Button
              className="w-full bg-[#0136FB] hover:bg-[#0136FB]/80 text-white font-semibold py-4 text-lg rounded-lg"
              disabled={!agreeToTerms}
            >
              Book Now
            </Button>
          </div>

          {/* Right Column - Booking Details */}
          <div>
            <h1 className="font-bold mb-4 text-3xl">
              <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                Booking Details
              </span>
            </h1>

            <div className="bg-[#00091D] p-8 rounded-lg">
              {/* Car Card */}
              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-16 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <Car className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      BMW ALPINA B8 Coupe
                    </h3>
                    <p className="text-gray-400 text-sm">Automatic • 612 hp</p>
                    <p className="text-[#01E0D7] text-sm font-medium">
                      You have booked for 21 days
                    </p>
                  </div>
                </div>
              </div>

              {/* Pickup and Return */}
              <div className="space-y-6 mb-6">
                {/* Pickup */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Pickup
                  </h3>
                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-[#0136FB] rounded-full flex items-center justify-center">
                        <Car className="w-4 h-4 text-white" />
                      </div>
                      <div className="w-0.5 h-12 bg-slate-600 mt-2"></div>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        This Is Example Terminal To The Location
                      </p>
                      <p className="text-gray-400 text-sm">
                        Sat,13.Sep,2025 | 21:00
                      </p>
                    </div>
                  </div>
                </div>

                {/* Return */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Return
                  </h3>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#0136FB] rounded-full flex items-center justify-center">
                      <Car className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        This Is Example Terminal To The Location
                      </p>
                      <p className="text-gray-400 text-sm">
                        Sat,13.Sep,2025 | 21:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {/* Booking Details */}
                <div className="bg-[#00091D] rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Booking Details
                  </h3>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-[#0136FB] mr-3 mt-1 flex-shrink-0" />
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
                    <Check className="w-5 h-5 text-[#0136FB] mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </p>
                  </div>
                  <span className="text-white text-sm font-medium ml-4">
                    4222$
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-[#0136FB] mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </p>
                  </div>
                  <span className="text-white text-sm font-medium ml-4">
                    5242$
                  </span>
                </div>
              </div>

              {/* Separator Line */}
              <div className="border-t border-[#021B50] mb-6"></div>

              {/* Total Amount */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total Amount</span>
                <span className="text-2xl font-bold text-[#01E0D7]">4350$</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-16">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="w-5 h-5 text-[#01E0D7]" />
            <span className="text-white font-medium">
              All your data are safe
            </span>
          </div>
          <p className="text-gray-400 text-sm max-w-2xl">
            We are using the most advanced security to provide you the best
            experience ever.
          </p>
        </div>
      </div>
    </div>
  );
}
