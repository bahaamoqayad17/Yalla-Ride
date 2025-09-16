"use client";
import React, { useState } from "react";
import Image from "next/image";
import ReservationCard from "@/components/ReservationCard";

export default function Customer() {
  const [activeTab, setActiveTab] = useState("My Booking");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="container w-full px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-xl overflow-hidden mt-4 sm:mt-6 lg:mt-10">
        {/* Background Image with Gradient Overlay */}
        <div className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] xl:h-[70vh]">
          {/* Background Image */}
          <Image
            src="/customer-bg.png"
            alt="Luxury Sports Car"
            fill
            className="object-cover"
            priority
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, 
                rgba(0, 0, 0, 0) 0%, 
                rgba(0, 0, 0, 0.7) 63%, 
                #000 100%
              )`,
            }}
          />

          {/* Content Overlay */}
          <div className="relative z-10 h-full flex items-center">
            <div className="px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-4xl">
                {/* Main Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  My Profile
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl leading-relaxed">
                  Here You Can View Your Bookings And Manage Your Personal
                  Information With Ease
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-8 sm:mt-12 lg:mt-16">
        <div className="bg-slate-800/50 rounded-xl sm:rounded-2xl p-1 flex flex-col sm:flex-row">
          {/* My Booking Tab */}
          <button
            onClick={() => setActiveTab("My Booking")}
            className={`relative flex-1 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg sm:rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === "My Booking"
                ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25"
                : "text-gray-400 hover:text-white hover:bg-slate-700/30"
            }`}
          >
            {activeTab === "My Booking" && (
              <div
                className="absolute inset-0 rounded-lg sm:rounded-xl"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(34, 211, 238, 0.8) 0%, 
                    rgba(59, 130, 246, 0.6) 50%, 
                    rgba(37, 99, 235, 0.8) 100%
                  )`,
                  padding: "2px",
                }}
              >
                <div className="w-full h-full bg-slate-900 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <span className="font-black text-2xl">My Booking</span>
                </div>
              </div>
            )}
            {activeTab !== "My Booking" && (
              <span className="font-black text-2xl">My Booking</span>
            )}
          </button>

          {/* Personal Info Tab */}
          <button
            onClick={() => setActiveTab("Personal Info")}
            className={`relative flex-1 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg sm:rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === "Personal Info"
                ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25"
                : "text-gray-400 hover:text-white hover:bg-slate-700/30"
            }`}
          >
            {activeTab === "Personal Info" && (
              <div
                className="absolute inset-0 rounded-lg sm:rounded-xl"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(34, 211, 238, 0.8) 0%, 
                    rgba(59, 130, 246, 0.6) 50%, 
                    rgba(37, 99, 235, 0.8) 100%
                  )`,
                  padding: "2px",
                }}
              >
                <div className="w-full h-full bg-slate-900 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <span className="font-black text-2xl">Personal Info</span>
                </div>
              </div>
            )}
            {activeTab !== "Personal Info" && (
              <span className="font-black text-2xl">Personal Info</span>
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-8 sm:mt-12 lg:mt-16">
        {activeTab === "My Booking" && (
          <div className="bg-slate-900/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10">
            {/* Header Section */}
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                    My Booking
                  </span>
                </h2>
                <p className="text-gray-300 text-lg sm:text-xl">
                  Easily Track And Manage All Your Reservations
                </p>
              </div>

              {/* Filter Section */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8">
                {/* Upcoming Filter Dropdown */}
                <div className="relative">
                  <select className="bg-slate-800 border border-cyan-400 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer hover:border-cyan-300 transition-colors min-w-[140px]">
                    <option value="upcoming" className="bg-slate-800">
                      Upcoming
                    </option>
                    <option value="past" className="bg-slate-800">
                      Past
                    </option>
                    <option value="cancelled" className="bg-slate-800">
                      Cancelled
                    </option>
                  </select>
                  {/* Custom Dropdown Arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="space-y-6">
              {/* Reservation Card */}
              <ReservationCard
                carImage="/car-cover.png"
                carName="BMW ALPINA B8 Coupe"
                carType="Automatic"
                horsepower="612 hp"
                mileage="3,123 km +AED 1 / for additional km"
                seats={5}
                colors={["#60a5fa", "#9ca3af"]}
                payment="Pay at pick-up, free cancellation"
                pickupLocation="This Is Example Terminal"
                pickupDate="Sat, 13.Sep,2025 | 21:00"
                returnLocation="This Is Example Terminal"
                returnDate="Sat, 13.Sep,2025 | 21:00"
                protectionItems={[
                  "Lorem ipsum dolor sit amet,",
                  "Lorem ipsum dolor sit amet,",
                  "Lorem ipsum dolor sit amet,",
                  "Lorem ipsum dolor sit amet,",
                ]}
                price="$162.000/DAY"
                duration="You have booked for 21 days"
                daysRemaining={10}
                bookingStatus="past"
                onInvoiceClick={() => console.log("Invoice clicked")}
              />
            </div>
          </div>
        )}

        {activeTab === "Personal Info" && (
          <div className="bg-slate-900/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left Section - Profile Picture */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="relative">
                  {/* Profile Picture Container with Gradient Border */}
                  <div className="relative w-100 h-100 rounded-2xl overflow-hidden">
                    <div
                      className="absolute inset-0 rounded-2xl p-1"
                      style={{
                        background:
                          "linear-gradient(135deg, #00E0D7 0%, #0136FB 50%, #8B5CF6 100%)",
                      }}
                    >
                      <div className="w-full h-full bg-slate-800 rounded-2xl flex items-center justify-center">
                        <Image
                          src="/avatar.png"
                          alt="Profile Picture"
                          width={480}
                          height={280}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Upload Button */}
                  <button
                    className="absolute -bottom-0 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-colors cursor-pointer"
                    style={{
                      width: "70px",
                      height: "40px",
                      borderRadius: "30px 30px 0 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingTop: "8px",
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Right Section - Forms */}
              <div className="flex-1 space-y-10">
                {/* Personal Info Section */}
                <div>
                  <h3 className="text-3xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                      Personal Info
                    </span>
                  </h3>
                  <p className="text-white text-lg mb-8">
                    Edit Your Profile Infor Username, Password. Etc
                  </p>

                  <div className="space-y-6 p-6 bg-[#00091D]">
                    {/* First Row - First Name and Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <input
                          type="text"
                          placeholder="First Name"
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-lg"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-lg"
                        />
                      </div>
                    </div>

                    {/* Second Row - Email and Phone Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-lg"
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                          +966
                        </div>
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-16 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-lg"
                        />
                      </div>
                    </div>

                    {/* Update Info Button */}
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-16 rounded-xl transition-colors text-lg cursor-pointer">
                      Update Info
                    </button>
                  </div>
                </div>

                {/* Change Password Section */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">
                    Change My Password
                  </h3>

                  <div className="space-y-6 bg-[#00091D] p-6">
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="New Password"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-lg"
                      />
                      <button
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {showNewPassword ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                            />
                          )}
                        </svg>
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm My Password"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-lg"
                      />
                      <button
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {showConfirmPassword ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                            />
                          )}
                        </svg>
                      </button>
                    </div>

                    {/* Save Button */}
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-16 rounded-xl transition-colors text-lg cursor-pointer">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
