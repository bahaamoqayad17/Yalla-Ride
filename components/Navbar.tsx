"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Catalog", href: "catalog" },
    { name: "Feature", href: "#Feature" },
    { name: "Steps", href: "#Steps" },
    { name: "FAQ", href: "#FAQ" },
    { name: "Reviews", href: "#Reviews" },
    { name: "Contact", href: "#Contact" },
  ];

  return (
    <nav className="relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Yalla Ride Logo"
              width={200}
              height={200}
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div
              className="bg-slate-800/50 backdrop-blur-sm rounded-lg px-7 py-4"
              style={{
                backgroundImage: "url(/nav-bg.svg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex items-center space-x-8">
                {navigationItems.map((item, index) => (
                  <a
                    key={index}
                    href={`/${item.href}`}
                    className="text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium cursor-pointer"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Login/Signup Button */}
          <div className="hidden lg:block">
            <Button
              variant="outline"
              size="lg"
              className="px-6 py-2.5 border-2 bg-transparent backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300"
            >
              Login/Signup
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-slate-800/50"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-700/50 mt-2">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.href}`}
                  className="block px-3 py-2 text-white/90 hover:text-white hover:bg-slate-700/50 rounded-md transition-colors duration-200 text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="default"
                  className="w-full rounded-full border-2 bg-slate-800/50 backdrop-blur-sm hover:bg-transparent transition-all duration-300"
                >
                  Login/Signup
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
