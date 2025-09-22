"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  MapPin,
  Calendar,
  Clock,
  User,
  Fuel,
  Baby,
  Wrench,
} from "lucide-react";

export default function PackagesStep({ setStep }) {
  const [selectedProtection, setSelectedProtection] = useState("minimum");
  const [selectedAddOns, setSelectedAddOns] = useState(["refuelling"]);

  const protectionPackages = [
    {
      id: "minimum",
      name: "Minimum Protection",
      price: "included",
      features: {
        included: ["this is example here", "this is example here"],
        excluded: [
          "this is example here",
          "this is example here",
          "this is example here",
          "this is example here",
        ],
      },
    },
    {
      id: "standard",
      name: "Standard Protection",
      price: "45$/day",
      features: {
        included: [
          "this is example here",
          "this is example here",
          "this is example here",
          "this is example here",
        ],
        excluded: ["this is example here", "this is example here"],
      },
    },
    {
      id: "maximum",
      name: "Maximum Protection",
      price: "77$/day",
      features: {
        included: [
          "this is example here",
          "this is example here",
          "this is example here",
          "this is example here",
          "this is example here",
          "this is example here",
        ],
        excluded: [],
      },
    },
  ];

  const addOns = [
    {
      id: "additional-driver",
      name: "Additional Driver",
      description: "Maximum of €2000 out-of-pocket per damage event.",
      price: "45$/day",
      icon: User,
    },
    {
      id: "refuelling",
      name: "Refuelling Service",
      description: "Maximum of €2000 out-of-pocket per damage event.",
      price: "45$/day",
      icon: Fuel,
    },
    {
      id: "baby-seat",
      name: "Baby Seat",
      description: "Maximum of €2000 out-of-pocket per damage event.",
      price: "45$/day",
      icon: Baby,
    },
    {
      id: "roadside",
      name: "Roadside Protection",
      description: "Maximum of €2000 out-of-pocket per damage event.",
      price: "45$/day",
      icon: Wrench,
    },
  ];

  const handleProtectionChange = (protectionId: string) => {
    setSelectedProtection(protectionId);
  };

  const handleAddOnChange = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-8">
          <span className="hover:text-white">Home</span>
          <span className="mx-2">{" > "}</span>
          <span className="hover:text-white">Car Details</span>
          <span className="mx-2">{" > "}</span>
          <span className="text-[#01E0D7]">Protection Packages</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section - Protection Packages & Add-ons */}
          <div className="space-y-8">
            {/* Protection Packages Section */}
            <div>
              <h2 className="text-3xl font-bold text-[#01E0D7] mb-6">
                2/3 Protection Packages
              </h2>

              <div className="space-y-4">
                {protectionPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                      selectedProtection === pkg.id
                        ? "border-[#01E0D7] bg-[#01E0D7]/10"
                        : "border-slate-700 hover:border-slate-600"
                    }`}
                    onClick={() => handleProtectionChange(pkg.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedProtection === pkg.id
                              ? "border-[#01E0D7] bg-[#01E0D7]"
                              : "border-slate-400"
                          }`}
                        >
                          {selectedProtection === pkg.id && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                          {pkg.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-lg font-bold ${
                            pkg.price === "included"
                              ? "text-[#01E0D7]"
                              : "text-white"
                          }`}
                        >
                          {pkg.price}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {pkg.features.included.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                      {pkg.features.excluded.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <X className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-gray-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons Section */}
            <div>
              <h2 className="text-2xl font-bold text-[#01E0D7] mb-6">
                Which Add Ons Do You Need?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addOns.map((addOn) => {
                  const IconComponent = addOn.icon;
                  const isSelected = selectedAddOns.includes(addOn.id);

                  return (
                    <div
                      key={addOn.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        isSelected
                          ? "border-[#01E0D7] bg-[#01E0D7]/10"
                          : "border-slate-700 hover:border-slate-600"
                      }`}
                      onClick={() => handleAddOnChange(addOn.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            isSelected
                              ? "border-[#01E0D7] bg-[#01E0D7]"
                              : "border-slate-400"
                          }`}
                        >
                          {isSelected && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <IconComponent className="w-6 h-6 text-gray-400" />
                      </div>

                      <h3 className="text-lg font-semibold text-white mb-2">
                        {addOn.name}
                      </h3>

                      <p className="text-sm text-gray-400 mb-3">
                        {addOn.description}
                      </p>

                      <div className="text-right">
                        <span className="text-lg font-bold text-[#01E0D7]">
                          {addOn.price}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              className="w-full bg-[#0136FB] hover:bg-[#0136FB]/80 text-white font-semibold py-4 text-lg rounded-lg"
              onClick={() => setStep(3)}
            >
              Checkout
            </Button>
          </div>

          {/* Right Section - Booking Details */}
          <div>
            <h2 className="text-2xl font-bold text-[#0136FB] mb-6">
              Booking Details
            </h2>

            {/* Pickup and Return Fields */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Pickup</label>
                <div className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg p-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-white text-sm">Dubai</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">date</label>
                <div className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg p-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-white text-sm">date</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">2:00 am</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Return</label>
                <div className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg p-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-white text-sm">Dubai</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">date</label>
                <div className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg p-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-white text-sm">date</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">2:00 am</span>
                </div>
              </div>
            </div>

            {/* Booking Summary Info Box */}
            <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <div className="w-5 h-5 bg-[#01E0D7] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
                <p className="text-sm text-gray-300">
                  You have booked for{" "}
                  <span className="text-[#01E0D7] font-medium">21 days</span>,
                  from Wednesday, January 12 until February 1
                </p>
              </div>
            </div>

            {/* Included Items */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
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
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-white text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </p>
                </div>
                <span className="text-white text-sm font-medium ml-4">
                  283$
                </span>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
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
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
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
            <div className="border-t border-slate-600 mb-6"></div>

            {/* Total Amount */}
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total Amount</span>
                <span className="text-2xl font-bold text-[#01E0D7]">4350$</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
