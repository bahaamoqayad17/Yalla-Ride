"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Star, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReviewIcon from "@/icons/ReviewIcon";
import Image from "next/image";
import HelpIcon from "@/icons/HelpIcon";
import { Button } from "./ui/button";

// Sample review data
const reviews = [
  {
    id: 1,
    name: "John Smith",
    role: "CEO",
    company: "Innovate Solutions",
    rating: 5,
    review:
      "Booking with Yalla Ride was super easy! The car was clean, well-maintained, and exactly as described. I'll definitely rent again.",
    avatar: "👨‍💼",
  },
  {
    id: 2,
    name: "Emily Davis",
    role: "Product Manager",
    company: "Nexus Digital",
    rating: 5,
    review:
      "Great prices and no hidden fees. The team was very helpful and the whole process was smooth from start to finish.",
    avatar: "👩‍💼",
  },
  {
    id: 3,
    name: "David Lee",
    role: "Founder",
    company: "GreenLeaf Enterprises",
    rating: 5,
    review:
      "I loved the flexibility of choosing daily or weekly plans. The service was professional, and the car made my trip so much easier.",
    avatar: "👨‍💼",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Manager",
    company: "TechCorp",
    rating: 5,
    review:
      "Excellent service with no hidden fees. The booking process was smooth and the car exceeded my expectations.",
    avatar: "👩‍💼",
  },
  {
    id: 5,
    name: "Michael Brown",
    role: "Director",
    company: "Global Ventures",
    rating: 5,
    review:
      "Outstanding customer service and great prices. The team was very helpful throughout the entire process.",
    avatar: "👨‍💼",
  },
];

export default function Reviews() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      className="bg-[#0055FF] text-white py-20 px-4 relative overflow-hidden"
      id="Reviews"
      style={{
        borderRadius: "40px",
      }}
    >
      <div className="absolute top-8 right-30 hidden md:block">
        <div className="animate-float">
          <Image src="/rightWheel.png" alt="Reviews" width={200} height={200} />
        </div>
      </div>
      {/* Decorative car wheel elements */}
      {/* <div className="absolute top-10 right-10 w-32 h-32 opacity-20">
        <div className="w-full h-full rounded-full border-4 border-gray-400 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-red-500"></div>
        </div>
      </div>

      <div className="absolute bottom-20 left-10 w-24 h-24 opacity-20">
        <div className="w-full h-full rounded-full border-4 border-gray-400 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-500"></div>
        </div>
      </div>

      <div className="absolute top-1/2 right-20 w-20 h-20 opacity-20">
        <div className="w-full h-full rounded-full border-4 border-gray-400 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-red-500"></div>
        </div>
      </div> */}

      <div className="container mx-auto">
        {/* Customer Reviews Section */}
        <div className="text-center mb-16">
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <center>
              <ReviewIcon />
            </center>
          </div>
          <div
            className={`flex items-center justify-center gap-2 mb-4 transition-all duration-1000 ease-out delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Customer Reviews
            </h2>
          </div>
          <p
            className={`text-[#8B9DC3] text-lg md:text-xl max-w-2xl mx-auto transition-all duration-1000 ease-out delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            See what our happy customers say about Yalla Ride
          </p>
        </div>

        {/* Reviews Carousel */}
        <div
          className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-4 transition-all duration-1000 ease-out delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            loop={true}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2.5,
              },
              1024: {
                slidesPerView: 3.5,
              },
              1280: {
                slidesPerView: 4.5,
              },
            }}
            className="mySwiper w-full"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <Card
                  className="text-white h-full"
                  style={{
                    background:
                      "linear-gradient(to right, rgb(253, 253, 253, 0.3) 0%, rgb(255, 255, 255 , 0.22) 100%)",
                    border: "none",
                  }}
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#2A2F4A] flex items-center justify-center text-2xl">
                        {review.avatar}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-[#00E7D5] fill-current"
                        />
                      ))}
                    </div>

                    <p className="text-[#B8C5D6] text-sm leading-relaxed flex-grow">
                      &ldquo;{review.review}&rdquo;
                    </p>

                    <div className="flex flex-col gap-1 mt-4">
                      <h5 className="text-sm text-white">{review.role}</h5>
                      <p
                        className="text-xs"
                        style={{
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                      >
                        {review.company}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] hidden md:block">
          <div className="animate-float-reverse">
            <Image
              src="/leftWheel.png"
              alt="Reviews"
              width={200}
              height={200}
            />
          </div>
        </div>

        {/* Let's Talk Section */}
        <div
          className="grid lg:grid-cols-2 gap-12 items-start w-full mt-10 md:mt-0"
          id="Contact"
        >
          {/* Left Side - Contact Info */}
          <div
            className={`transition-all duration-1000 ease-out delay-900 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <HelpIcon />
            <div className="flex items-center gap-3 mb-2 mt-2">
              <h3 className="text-3xl md:text-4xl font-medium text-white">
                lets talk!
              </h3>
            </div>
            <p className="text-white text-sm mb-4 max-w-xs font-medium">
              Send us a message and we will get back to you within 24 hours to
              arrange a call!
            </p>

            {/* Contact Buttons */}
            <div className="space-y-4">
              <div
                className="w-full flex justify-between items-center text-white hover:bg-[#2A2F4A] h-16 px-6 rounded-2xl cursor-pointer transition-colors duration-200"
                style={{
                  background:
                    "linear-gradient(to right, rgb(253, 253, 253, 0.1) 0%, rgb(255, 255, 255 , 0.1) 100%)",
                }}
              >
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Email us</div>
                    <div className="text-sm text-white">
                      projects@badikhoustudio
                    </div>
                  </div>
                </div>
                <div className="bg-[#00ADE2] rounded-full p-3.5">
                  <ArrowRight />
                </div>
              </div>

              <div
                className="w-full flex justify-between items-center text-white hover:bg-[#2A2F4A] h-16 px-6 rounded-2xl cursor-pointer transition-colors duration-200"
                style={{
                  background:
                    "linear-gradient(to right, rgb(253, 253, 253, 0.1) 0%, rgb(255, 255, 255 , 0.1) 100%)",
                }}
              >
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Call us</div>
                    <div className="text-sm text-white">+972506042307</div>
                  </div>
                </div>
                <div className="bg-[#00ADE2] rounded-full p-3.5">
                  <ArrowRight />
                </div>
              </div>

              <div
                className="w-full flex justify-between items-center text-white hover:bg-[#2A2F4A] h-16 px-6 rounded-2xl cursor-pointer transition-colors duration-200"
                style={{
                  background:
                    "linear-gradient(to right, rgb(253, 253, 253, 0.1) 0%, rgb(255, 255, 255 , 0.1) 100%)",
                }}
              >
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Our Location</div>
                    <div className="text-sm text-white">UAE</div>
                  </div>
                </div>
                <div className="bg-[#00ADE2] rounded-full p-3.5">
                  <ArrowRight />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div
            className={`transition-all duration-1000 ease-out delay-1100 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ibrahim alduuk"
                    className="text-white placeholder:text-white h-14"
                    style={{
                      background:
                        "linear-gradient(to right, rgb(253, 253, 253, 0.3) 0%, rgb(255, 255, 255 , 0.22) 100%)",
                    }}
                  />
                </div>
                <div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email"
                    className="text-white placeholder:text-white h-14"
                    style={{
                      background:
                        "linear-gradient(to right, rgb(253, 253, 253, 0.3) 0%, rgb(255, 255, 255 , 0.22) 100%)",
                    }}
                  />
                </div>
              </div>

              <div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+972509542366"
                  className="text-white placeholder:text-white h-14"
                  style={{
                    background:
                      "linear-gradient(to right, rgb(253, 253, 253, 0.3) 0%, rgb(255, 255, 255 , 0.22) 100%)",
                  }}
                />
              </div>

              <div>
                <textarea
                  id="message"
                  placeholder="More about your message"
                  rows={5}
                  className="w-full border border-white text-white placeholder:text-white rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#01E0D7]"
                  style={{
                    background:
                      "linear-gradient(to right, rgb(253, 253, 253, 0.3) 0%, rgb(255, 255, 255 , 0.22) 100%)",
                  }}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00ADE2] text-white font-semibold h-12 text-lg"
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
