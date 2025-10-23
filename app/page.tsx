import Hero from "@/components/Hero";
import CarsSection from "@/components/CarsSection";
import WhyUs from "@/components/WhyUs";
import Faq from "@/components/Faq";
import Reviews from "@/components/Reviews";
import Steps from "@/components/Steps";
import Footer from "@/components/Footer";
import { getCars } from "@/actions/hq-actions";

export default async function Home() {
  const cars = await getCars();
  console.log(cars);
  return (
    <>
      <Hero />
      <CarsSection />
      <Steps />
      <WhyUs />
      <Faq />
      <Reviews />
      <Footer />
    </>
  );
}
