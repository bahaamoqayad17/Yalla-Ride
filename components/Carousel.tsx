"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Card, CardContent } from "@/components/ui/card";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";

const logos = [
  { id: 1, name: "Logoipsum", hasLogo: false },
  { id: 2, name: "Logoipsum", hasLogo: true, logoType: "square-cutout" },
  { id: 3, name: "Logoipsum", hasLogo: true, logoType: "c-shape" },
  { id: 4, name: "Logoipsum", hasLogo: true, logoType: "wave-lines" },
  { id: 5, name: "Logoipsum", hasLogo: true, logoType: "hexagon" },
  { id: 6, name: "Logoipsum", hasLogo: true, logoType: "c-shape" },
];

export default function Carousel() {
  return (
    <div className="w-full py-12 bg-black">
      <div className="container mx-auto">
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {logos.map((logo) => (
            <SwiperSlide key={logo.id}>
              <Card className="border-0 bg-transparent shadow-none">
                <CardContent className="flex items-center justify-center p-4">
                  <div className="flex items-center space-x-3">
                    {logo.hasLogo && (
                      <div className="w-8 h-8 text-gray-400">
                        {logo.logoType === "square-cutout" && (
                          <div className="relative w-full h-full">
                            <div className="absolute inset-0 border-2 border-gray-400 rounded-sm"></div>
                            <div className="absolute top-0 right-0 w-3 h-3 bg-black rounded-full"></div>
                            <div className="absolute top-1 right-1 w-1 h-1 bg-gray-400 rounded-full"></div>
                          </div>
                        )}
                        {logo.logoType === "c-shape" && (
                          <div className="relative w-full h-full">
                            <div className="w-full h-full border-2 border-gray-400 rounded-full border-r-0 border-b-0 border-l-0"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                          </div>
                        )}
                        {logo.logoType === "wave-lines" && (
                          <div className="relative w-full h-full">
                            <div className="w-full h-full bg-gray-400 rounded-full flex items-center justify-center">
                              <div className="space-y-0.5">
                                <div className="w-4 h-0.5 bg-black rounded-full"></div>
                                <div className="w-4 h-0.5 bg-black rounded-full"></div>
                                <div className="w-4 h-0.5 bg-black rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        )}
                        {logo.logoType === "hexagon" && (
                          <div className="relative w-full h-full">
                            <div className="w-full h-full bg-gray-400 clip-path-hexagon"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black clip-path-hexagon"></div>
                          </div>
                        )}
                      </div>
                    )}
                    <span className="text-gray-400 text-sm font-medium">
                      {logo.name}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .clip-path-hexagon {
          clip-path: polygon(
            50% 0%,
            100% 25%,
            100% 75%,
            50% 100%,
            0% 75%,
            0% 25%
          );
        }
      `}</style>
    </div>
  );
}
