"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
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
  const pagesLinks = [
    { name: "HOME", href: "#home" },
    { name: "CATALOG", href: "#catalog" },
  ];

  const detailsPagesLinks = [
    { name: "FEATURE", href: "#feature" },
    { name: "STEPS", href: "#steps" },
    { name: "FAQ", href: "#faq" },
    { name: "REVIEWS", href: "#reviews" },
    { name: "CONTACT", href: "#contact" },
  ];

  const socialIcons = [
    { icon: Facebook, href: "#facebook" },
    { icon: Twitter, href: "#twitter" },
    { icon: Instagram, href: "#instagram" },
    { icon: Linkedin, href: "#linkedin" },
  ];

  return (
    <footer ref={sectionRef} className="text-white pt-4 md:pt-20">
      {/* Top Section - Logo and Separator */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div
            className={`flex items-center space-x-3 transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <Image
              src="/logo.svg"
              alt="Yalla Ride Logo"
              width={200}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </div>

          {/* Wavy Separator Line */}
          <div
            className={`w-full h-12 mb-0 mx-auto relative hidden md:block transition-all duration-1000 ease-out delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <Image
              src="/footer-top.png"
              alt="Wavy Separator"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Mid-Section - Navigation, CTA, and Social Media */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 md:py-8">
        <div className="flex md:flex-row flex-col gap-8 md:gap-0 items-center justify-around">
          {/* Left Column - Pages */}
          <div
            className={`text-center lg:text-left transition-all duration-1000 ease-out delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <h3 className="text-lg font-bold text-white mb-4">Pages</h3>
            <ul className="space-y-2">
              {pagesLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Center Column - CTA and Social Media */}
          <div
            className={`text-center space-y-6 transition-all duration-1000 ease-out delay-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {/* Call-to-Action */}
            <div className="space-y-2">
              <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
                Drive Your Dream, Ride with Ease
              </h2>
              <p className="text-white text-2xl">
                Start Your Journey With Yalla Ride Today!
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center space-x-8">
              {socialIcons.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="w-12 h-12 rounded-xl scale-110 hover:scale-130 transition-transform duration-200"
                >
                  <social.icon className="w-5 h-5 text-white" />
                </Button>
              ))}
            </div>
          </div>

          {/* Right Column - Details Pages */}
          <div
            className={`transition-all duration-1000 ease-out delay-900 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <h3 className="text-lg font-bold text-white mb-4">Details Pages</h3>
            <ul className="space-y-2 flex flex-col items-start">
              {detailsPagesLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {/* Wavy Separator Line */}
          <div
            className={`w-full h-12 mx-auto mb-0 relative transition-all duration-1000 ease-out delay-1100 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <Image
              src="/footer-bottom.png"
              alt="Wavy Separator"
              fill
              className="object-cover"
            />
          </div>

          {/* Copyright */}
          <div
            className={`text-center transition-all duration-1000 ease-out delay-1300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <p className="text-gray-300 text-sm">
              ©Copyright 2026 - All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
