import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

interface ReservationCardProps {
  carImage: string;
  carName: string;
  carType: string;
  horsepower: string;
  mileage: string;
  seats: number;
  colors: string[];
  payment: string;
  pickupLocation: string;
  pickupDate: string;
  returnLocation: string;
  returnDate: string;
  protectionItems: string[];
  price: string;
  duration: string;
  daysRemaining: number;
  bookingStatus?: "current" | "past" | "upcoming";
  onInvoiceClick?: () => void;
}

export default function ReservationCard({
  carImage,
  carName,
  carType,
  horsepower,
  mileage,
  seats,
  colors,
  payment,
  pickupLocation,
  pickupDate,
  returnLocation,
  returnDate,
  protectionItems,
  price,
  duration,
  daysRemaining,
  bookingStatus = "current",
  onInvoiceClick,
}: ReservationCardProps) {
  return (
    <div className="bg-[#00091D] rounded-xl overflow-hidden border border-slate-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {/* Section 1: Car Image */}
        <div className="relative h-64 lg:h-76">
          <Image src={carImage} alt={carName} fill className="object-cover" />
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <div
              className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                bookingStatus === "current"
                  ? "bg-cyan-500 text-white"
                  : bookingStatus === "past"
                  ? "bg-yellow-400 text-black"
                  : "bg-green-500 text-white"
              }`}
            >
              {bookingStatus === "current"
                ? "CURRENT"
                : bookingStatus === "past"
                ? "PAST"
                : "UPCOMING"}
            </div>
          </div>
        </div>

        {/* Section 2: Logo with Car Data */}
        <div className="flex flex-col justify-center p-6 gap-4">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{carName}</h3>
              <div className="flex items-center text-sm text-gray-400">
                <span>{carType}</span>
                <span className="mx-2">•</span>
                <span>{horsepower}</span>
              </div>
            </div>
          </div>

          {/* Car Specifications */}
          <div className="space-y-3">
            <div className="flex gap-2 items-center">
              <p className="text-sm text-gray-400">Mileage</p>
              <p className="text-white font-medium text-sm">{mileage}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-sm text-gray-400">Seats</p>
              <p className="text-white font-medium text-sm">{seats}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-sm text-gray-400">Colors</p>
              <div className="flex space-x-2 mt-1">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-sm text-gray-400">Payment</p>
              <p className="text-white font-medium text-sm">{payment}</p>
            </div>
          </div>

          <button
            onClick={onInvoiceClick}
            className="bg-transparent border border-[#0055FE] text-[#0055FE] px-4 py-2 rounded-lg hover:bg-[#0055FE] hover:text-white transition-colors w-25 cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            Invoice
          </button>
        </div>

        {/* Section 3: Pickup and Return Details */}
        <div className="p-6 space-y-6">
          {/* Pickup Details */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center mb-1">
                <svg
                  className="w-4 h-4 text-cyan-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-gray-400">Pickup</p>
              </div>
              <p className="text-white font-semibold">{pickupLocation}</p>
              <p className="text-sm text-gray-400">{pickupDate}</p>
            </div>
          </div>

          {/* Return Details */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center mb-1">
                <svg
                  className="w-4 h-4 text-cyan-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-gray-400">Return</p>
              </div>
              <p className="text-white font-semibold">{returnLocation}</p>
              <p className="text-sm text-gray-400">{returnDate}</p>
            </div>
          </div>
        </div>

        {/* Section 4: Protection & Extra */}
        <div className="p-6 space-y-3 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Protection & Extra
            </h4>
            <div className="space-y-2">
              {protectionItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <svg
                    className="w-4 h-4 text-cyan-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-400">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Area */}
          <button
            onClick={onInvoiceClick}
            type="button"
            className="flex flex-col sm:flex-row justify-between gap-4 cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <div className="bg-slate-900 border border-primary rounded-lg px-4 py-3">
              <div className="text-2xl font-bold text-white">{price}</div>
              <div className="text-sm text-gray-400">{duration}</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
