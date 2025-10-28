"use server";

import axios from "@/lib/axios";

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
