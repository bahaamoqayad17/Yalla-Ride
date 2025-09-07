import CarsSection from "@/components/CarsSection";
import Faq from "@/components/Faq";
import Navbar from "@/components/Navbar";
import React from "react";

export default function Catalog() {
  return (
    <>
      {/* <Navbar /> */}
      <CarsSection showSearch={true} />
      <Faq />
    </>
  );
}
