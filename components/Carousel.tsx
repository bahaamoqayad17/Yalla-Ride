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
  // { id: 1, name: "Logoipsum", hasLogo: false },
  { id: 2, name: "Logoipsum", hasLogo: true, logoType: "square-cutout" },
  { id: 7, name: "Logoipsum", hasLogo: true, logoType: "square-cutout" },
  { id: 8, name: "Logoipsum", hasLogo: true, logoType: "square-cutout" },
  { id: 9, name: "Logoipsum", hasLogo: true, logoType: "square-cutout" },
  { id: 99, name: "Logoipsum", hasLogo: true, logoType: "square-cutout" },
  { id: 88, name: "Logoipsum", hasLogo: true, logoType: "square-cutout" },
  { id: 21, name: "Logoipsum", hasLogo: true, logoType: "square-cutout" },
  { id: 2, name: "Logoipsum", hasLogo: true, logoType: "square-cutout" },
  { id: 3, name: "Logoipsum", hasLogo: true, logoType: "square-cutout" },
  { id: 4, name: "Logoipsum", hasLogo: true, logoType: "square-cutout" },
  { id: 5, name: "Logoipsum", hasLogo: true, logoType: "square-cutout" },
  { id: 6, name: "Logoipsum", hasLogo: true, logoType: "square-cutout" },
];

export default function Carousel() {
  return (
    <div className="w-screen py-12 -mx-4">
      <div className="w-full">
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
