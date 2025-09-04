import Image from "next/image";
import React from "react";

export default function Steps() {
  return (
    <section
      className="h-screen"
      style={{
        backgroundImage: "url('/steps.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center justify-center text-center px-4 h-full">
        <Image
          src="/whyusicon.png"
          alt="Why Us"
          width={52}
          height={52}
          className="mb-4"
        />
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-[#0136FB] to-[#01E0D7] bg-clip-text text-transparent">
            Easy Steps to Book Your Car
          </span>
        </h2>
        <p className="text-[#999999] text-xl max-w-md text-center">
          From choosing your car to returning it renting has never been this
          simple
        </p>
      </div>
    </section>
  );
}
