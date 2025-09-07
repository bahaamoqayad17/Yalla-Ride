"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import HelpIcon from "@/icons/HelpIcon";

export default function ContactUs() {
  return (
    <div className="mt-20">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Side - Contact Info */}
        <div>
          {/* Help Icon */}
          <HelpIcon />

          <div className="flex items-center gap-3 my-2">
            <h3 className="text-3xl md:text-4xl font-medium text-white">
              lets talk!
            </h3>
          </div>
          <p className="text-white text-sm mb-8 max-w-xs font-medium">
            Send us a message and we will get back to you within 24 hours to
            arrange a call!
          </p>

          {/* Contact Buttons */}
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-between text-white hover:bg-slate-700 h-16 px-6"
            >
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Email us</div>
                  <div className="text-sm text-gray-300">
                    projects@batikha.studio
                  </div>
                </div>
              </div>
              <div className="bg-[#01E0D7] rounded-full p-3.5">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between text-white hover:bg-slate-700 h-16 px-6"
            >
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Call Us</div>
                  <div className="text-sm text-gray-300">+972595942397</div>
                </div>
              </div>
              <div className="bg-[#01E0D7] rounded-full p-3.5">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between text-white hover:bg-slate-700 h-16 px-6"
            >
              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Our Location</div>
                  <div className="text-sm text-gray-300">UAE</div>
                </div>
              </div>
              <div className="bg-[#01E0D7] rounded-full p-3.5">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </Button>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  id="name"
                  type="text"
                  placeholder="ibrahim aklouk"
                  className="text-white placeholder:text-gray-400 h-14 bg-slate-800 border-slate-700"
                />
              </div>
              <div>
                <Input
                  id="email"
                  type="email"
                  placeholder="projects@batikha.studio"
                  className="text-white placeholder:text-gray-400 h-14 bg-slate-800 border-slate-700"
                />
              </div>
            </div>

            <div>
              <Input
                id="subject"
                type="text"
                placeholder="Subject"
                className="text-white placeholder:text-gray-400 h-14 bg-slate-800 border-slate-700"
              />
            </div>

            <div>
              <textarea
                id="message"
                placeholder="More about your message"
                rows={6}
                className="w-full border border-slate-700 text-white placeholder:text-gray-400 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#01E0D7] bg-slate-800"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0136FB] hover:bg-[#0136FB]/80 text-white font-semibold h-12 text-lg"
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
