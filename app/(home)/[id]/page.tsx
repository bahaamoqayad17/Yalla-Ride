import { Button } from "@/components/ui/button";
import Client from "./client";
import {
  getCarById,
  getLocations,
  getCars,
  getAdditionalCharges,
  getReservationDatesConfig,
  getCustomerFields,
  getPaymentMethods,
} from "@/actions/hq-actions";
import Link from "next/link";

export default async function CarDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const car = await getCarById(parseInt(id));
  const locations = await getLocations();
  const allCars = await getCars();

  // Find similar cars based on multiple criteria
  const findSimilarCars = () => {
    if (!allCars || !Array.isArray(allCars) || allCars.length === 0) return [];

    const currentCarDailyRate = Number(car?.active_rates?.[0]?.daily_rate || 0);
    const currentCarBrandId = car?.brand_id;
    const priceRange = currentCarDailyRate * 0.3; // ±30% price range

    const similarCars = allCars
      .filter((otherCar: any) => {
        // Exclude current car
        if (otherCar.id === car.id) return false;

        // Must be active and available on website
        if (!otherCar.active || !otherCar.available_on_website) return false;

        // Same brand
        if (otherCar.brand_id !== currentCarBrandId) return false;

        return true;
      })
      .map((otherCar: any) => {
        // Calculate similarity score based on price
        const otherCarDailyRate = Number(
          otherCar?.active_rates?.[0]?.daily_rate || 0
        );
        const priceDifference = Math.abs(
          currentCarDailyRate - otherCarDailyRate
        );
        const priceScore =
          priceDifference <= priceRange
            ? 100 - (priceDifference / priceRange) * 100
            : 0;

        return {
          ...otherCar,
          similarityScore: priceScore,
        };
      })
      .sort((a: any, b: any) => b.similarityScore - a.similarityScore)
      .slice(0, 4); // Limit to 4 similar cars

    return similarCars;
  };

  const similarCars = findSimilarCars();

  const additionalCharges = await getAdditionalCharges();

  // Fetch reservation workflow data
  const datesConfigResult = await getReservationDatesConfig();
  const datesConfig = datesConfigResult.success ? datesConfigResult.data : null;

  const customerFieldsResult = await getCustomerFields();
  const customerFields = customerFieldsResult.success
    ? customerFieldsResult.data
    : null;

  const paymentMethodsResult = await getPaymentMethods();
  const paymentMethods = paymentMethodsResult.success
    ? paymentMethodsResult.data
    : [];

  console.log(additionalCharges);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Car Not Found</h1>
          <Link href="/">
            <Button className="bg-[#0136FB] hover:bg-[#0136FB]/80">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Client
      car={car}
      locations={locations}
      similarCars={similarCars}
      additionalCharges={additionalCharges}
      datesConfig={datesConfig}
      customerFields={customerFields}
      paymentMethods={paymentMethods}
    />
  );
}
