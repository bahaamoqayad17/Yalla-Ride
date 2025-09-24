"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    id: "item-1",
    question: "How can I book a car with Yalla Ride?",
    answer:
      "You can book a car easily through our website or mobile app. Simply select your pickup location, dates, and preferred vehicle, then complete the booking process with your payment information.",
  },
  {
    id: "item-2",
    question: "What documents do I need to rent a car?",
    answer:
      "You'll need a valid driver's license, a credit card for payment, and a form of identification. International drivers may need an International Driving Permit depending on the country.",
  },
  {
    id: "item-3",
    question: "Is insurance included in the rental price?",
    answer:
      "Basic insurance is included in all our rentals. We also offer additional coverage options for comprehensive protection during your rental period.",
  },
  {
    id: "item-4",
    question: "Can I modify or cancel my booking?",
    answer:
      "Yes, you can modify or cancel your booking up to 24 hours before your scheduled pickup time. Cancellation fees may apply depending on the timing and rental terms.",
  },
  {
    id: "item-5",
    question: "Are there mileage limits on the rented cars?",
    answer:
      "Most of our rentals include unlimited mileage. However, some premium vehicles may have daily mileage limits. Check the specific terms when booking your vehicle.",
  },
  {
    id: "item-6",
    question: "What should I do if the car breaks down during my rental?",
    answer:
      "Contact our 24/7 customer support immediately. We'll arrange for roadside assistance or provide a replacement vehicle as quickly as possible to minimize your inconvenience.",
  },
];

export default function Faq() {
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
    <div ref={sectionRef} className="w-full py-16 bg-black">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div
            className={`flex justify-center transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <Image
              src="/faq-icon.png"
              alt="Why Us"
              width={52}
              height={52}
              className="mb-4"
            />
          </div>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-1000 ease-out delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>

          <p
            className={`text-white/70 text-lg md:text-xl mb-8 transition-all duration-1000 ease-out delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            Quick Answers to Help You Make the Most of Yalla Ride
          </p>

          {/* Wavy Separator */}
          {/* <div className="flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#01E0D7] to-transparent rounded-full"></div>
          </div> */}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Car Image */}
          <div
            className={`order-2 lg:order-1 transition-all duration-1000 ease-out delay-700 ${
              isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-8 opacity-0 scale-95"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#01E0D7]/20 shadow-lg shadow-[#01E0D7]/10">
              <Image
                src="/faq.png"
                alt="FAQ Car"
                width={600}
                height={200}
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - FAQ Accordion */}
          <div className="order-1 lg:order-2">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqData.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className={`bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-[#01E0D7]/50 transition-all duration-1000 ease-out ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${900 + index * 100}ms` }}
                >
                  <AccordionTrigger className="px-8 py-6 text-white hover:text-[#01E0D7] transition-colors duration-300">
                    <span className="text-left font-medium">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-white/80 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
