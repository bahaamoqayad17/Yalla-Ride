import CarsSection from "@/components/CarsSection";
import Faq from "@/components/Faq";
import React from "react";

export default function Catalog() {
  return (
    <>
      <CarsSection showSearch={true} />
      <Faq />
    </>
  );
}
