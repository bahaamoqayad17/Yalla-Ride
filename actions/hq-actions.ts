"use server";

import axios from "@/lib/axios";

export const getCars = async () => {
  try {
    const response = await axios.get("fleets/vehicle-classes");
    return {
      success: true,
      message: "Cars fetched successfully",
      data: response.data.fleets_vehicle_classes,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to fetch cars",
      data: null,
    };
  }
};
