"use server";

import axios from "@/lib/axios";
import { format } from "date-fns";

export const getCars = async () => {
  try {
    const response = await axios.get("fleets/vehicle-classes");
    return response.data.fleets_vehicle_classes;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to fetch cars",
      data: null,
    };
  }
};

export const getLocations = async () => {
  try {
    const response = await axios.get("fleets/locations");
    return response.data.fleets_locations;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to fetch locations",
      data: null,
    };
  }
};

export const getAvailablitity = async ({
  pick_up_date,
  return_date,
  pick_up_location_id,
  return_location_id,
}: {
  pick_up_date: string;
  return_date: string;
  pick_up_location_id: number;
  return_location_id: number;
}) => {
  try {
    const pick_up_date_formatted = format(
      new Date(pick_up_date),
      "yyyy-MM-dd HH:mm"
    );
    const return_date_formatted = format(
      new Date(return_date),
      "yyyy-MM-dd HH:mm"
    );
    const response = await axios.get(
      `car-rental/ota/availability?pick_up_date=${pick_up_date_formatted}&return_date=${return_date_formatted}&pick_up_location_id=${pick_up_location_id}&return_location_id=${return_location_id}&branch_id=1`,
      {
        headers: {
          Accept: "application/vnd.api.v2+json",
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to fetch availability",
      data: null,
    };
  }
};

export const getCarById = async (id: number) => {
  try {
    const response = await axios.get(`fleets/vehicle-classes`);

    const car = response.data.fleets_vehicle_classes.find(
      (car: any) => car.id === id
    );

    return car;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to fetch car",
      data: null,
    };
  }
};
