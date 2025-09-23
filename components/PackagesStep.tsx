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

export default function PackagesStep({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
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
          "this is example here excluded here",
          "this is example here excluded here",
          "this is example here",
          "this is example here excluded here",
          "this is example here excluded here",
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
        excluded: [
          "this is example here excluded here",
          "this is example here excluded here",
        ],
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
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-md text-gray-400 mb-8">
          <span className="hover:text-white">Home</span>
          <span className="mx-2">{" > "}</span>
          <span className="hover:text-white">Car Details</span>
          <span className="mx-2">{" > "}</span>
          <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
            Protection Packages
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
          {/* Left Section - Protection Packages & Add-ons */}
          <div className="space-y-8">
            {/* Protection Packages Section */}
            <div>
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                  3/3 Protection Packages
                </span>
              </h2>

              <div className="space-y-4">
                {protectionPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all bg-[#00091D] ${
                      selectedProtection === pkg.id
                        ? "border-primary"
                        : "border-slate-700 hover:border-slate-600"
                    }`}
                    onClick={() => handleProtectionChange(pkg.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedProtection === pkg.id
                              ? "border-primary bg-primary"
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
                        <span className={`text-lg font-bold text-white`}>
                          {pkg.price}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {[...pkg.features.included, ...pkg.features.excluded].map(
                        (feature, index) => {
                          const isIncluded =
                            pkg.features.included.includes(feature);
                          return (
                            <div
                              key={index}
                              className="flex items-center space-x-2 bg-slate-800/50 px-3 py-2 rounded-lg"
                            >
                              {isIncluded ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <X className="w-4 h-4 text-red-500" />
                              )}
                              <span className="text-sm text-gray-300">
                                {feature}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons Section */}
            <div>
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                  Which Add Ons Do You Need?
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addOns.map((addOn) => {
                  const IconComponent = addOn.icon;
                  const isSelected = selectedAddOns.includes(addOn.id);

                  return (
                    <div
                      key={addOn.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all flex gap-4 bg-[#00091D] ${
                        isSelected
                          ? "border-primary"
                          : "border-slate-700 hover:border-slate-600"
                      }`}
                      onClick={() => handleAddOnChange(addOn.id)}
                    >
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            isSelected
                              ? "border-primary bg-primary"
                              : "border-slate-400"
                          }`}
                        >
                          {isSelected && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <IconComponent className="w-6 h-6 text-[#00C2DD]" />
                        <h3 className="text-lg font-semibold text-white">
                          {addOn.name}
                        </h3>

                        <p className="text-sm text-gray-400">
                          {addOn.description}
                        </p>

                        <p className="text-lg font-bold text-white">
                          {addOn.price}
                        </p>
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
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                Booking Details
              </span>
            </h2>

            {/* Pickup and Return Fields */}
            <div className="bg-[#00091D] p-4 rounded-lg mb-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Pickup
                  </label>
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
                  <label className="block text-sm font-medium mb-2">
                    Return
                  </label>
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
              <div className="rounded-lg mb-6">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    You have booked for{" "}
                    <span className="text-[#01E0D7] font-medium">21 days</span>,
                    from Wednesday, January 12 until February 1
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#00091D] p-4 rounded-lg">
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
                  <span className="text-2xl font-bold text-[#01E0D7]">
                    4350$
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
