import CarsSection from "@/components/CarsSection";
import Faq from "@/components/Faq";
import React from "react";
import { getCars } from "@/actions/hq-actions";

export default async function Catalog() {
  const cars = await getCars();
  return (
    <>
      <CarsSection showSearch={true} cars={cars} />
      <Faq />
    </>
  );
}
