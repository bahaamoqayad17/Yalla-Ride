"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

interface StepCard {
  id: number;
  icon: string;
  title: string;
  description: string;
  color: string;
}

const stepsData: StepCard[] = [
  {
    id: 1,
    icon: "🚗",
    title: "Choose Your Car",
    description: "Select from our wide range of vehicles",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    icon: "🛡️",
    title: "Add Extras & Insurance",
    description: "Customize your rental with additional options",
    color: "from-cyan-400 to-teal-500",
  },
  {
    id: 3,
    icon: "📊",
    title: "Pick Up & Enjoy",
    description: "Collect your favourite car and hit the road",
    color: "from-teal-500 to-green-500",
  },
  {
    id: 4,
    icon: "🔑",
    title: "Return the Car",
    description: "Bring it back hassle-free at the end of your rental",
    color: "from-green-500 to-emerald-500",
  },
];

export default function Steps() {
  const [visibleCards, setVisibleCards] = useState<number[]>([1]); // Start with first card visible
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the section has been scrolled through
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      // When section enters viewport (top <= 0) and exits viewport (bottom <= 0)
      if (sectionTop <= 0 && sectionBottom >= 0) {
        // Calculate progress: 0 when section enters, 1 when section exits
        const scrolledHeight = Math.abs(sectionTop);
        const progress = Math.min(
          scrolledHeight / (sectionRef.current.offsetHeight - windowHeight),
          1
        );

        // Show cards based on scroll progress
        // Each card appears at faster intervals (0%, 15%, 30%, 45%)
        const cardsToShow = Math.min(Math.floor(progress * 6.67) + 1, 4);
        const newVisibleCards = Array.from(
          { length: cardsToShow },
          (_, i) => i + 1
        );

        setVisibleCards(newVisibleCards);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="Steps"
      className="min-h-[400vh] relative"
      style={{
        backgroundImage: "url('/steps.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Fixed Header */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 z-10">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Image
            src="/whyusicon.png"
            alt="Why Us"
            width={52}
            height={52}
            className="mb-4"
          />
        </div>
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-1000 ease-out delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
            Easy Steps to Book Your Car
          </span>
        </h2>
        <p
          className={`text-[#999999] text-xl max-w-md text-center mb-12 transition-all duration-1000 ease-out delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          From choosing your car to returning it renting has never been this
          simple
        </p>

        {/* Cards Container - 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {stepsData.map((step, index) => (
            <div
              key={step.id}
              className={`transform transition-all duration-1000 ease-out ${
                visibleCards.includes(step.id)
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
              }}
            >
              <div
                className="rounded-2xl p-6 transition-all duration-300 group hover:bg-slate-900/70"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderRadius: 30,
                }}
              >
                <div className="flex flex-col justify-between h-full">
                  {/* Card Header */}
                  <div className="flex justify-between items-center  mb-4">
                    {/* Icon */}
                    <Image
                      src={`/step${step.id}.svg`}
                      alt={step.title}
                      width={50}
                      height={50}
                    />

                    {/* Number */}
                    <div className="text-white text-lg font-semibold">
                      {step.id}
                    </div>
                  </div>

                  {/* Card Content */}
                  {/* Title */}
                  <div className="flex flex-col gap-4">
                    <h4 className="text-2xl md:text-3xl font-bold">
                      <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                        {step.title}
                      </span>
                    </h4>

                    {/* Description */}
                    <p className="text-white text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
