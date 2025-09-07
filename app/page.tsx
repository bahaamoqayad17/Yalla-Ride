import Hero from "@/components/Hero";
import CarsSection from "@/components/CarsSection";
import WhyUs from "@/components/WhyUs";
import Faq from "@/components/Faq";
import Reviews from "@/components/Reviews";
import Steps from "@/components/Steps";
import Footer from "@/components/Footer";

export default function Home() {
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
