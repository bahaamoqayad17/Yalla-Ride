"use server";

import axios from "@/lib/axios";
import { format } from "date-fns";
import { connectToDatabase } from "@/lib/mongo";
import User from "@/lib/User";
import bcrypt from "bcryptjs";

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

export const getAdditionalCharges = async () => {
  try {
    const response = await axios.get(`fleets/additional-charges`);

    // Check if response has the expected structure
    if (!response.data?.fleets_additional_charges) {
      return { insurances: [], addOns: [] };
    }

    // get all additional charges with category id 1
    const insurances = response.data.fleets_additional_charges.filter(
      (item: any) => item.additional_charge_category_id === 1
    );

    // get all additional charges with category id 2
    const addOns = response.data.fleets_additional_charges.filter(
      (item: any) => item.additional_charge_category_id === 2
    );

    return { insurances, addOns };
  } catch (error) {
    console.error("Error fetching additional charges:", error);
    // Return empty arrays instead of error object to maintain consistent structure
    return { insurances: [], addOns: [] };
  }
};

export const createBooking = async (bookingData: any) => {
  try {
    const response = await axios.post(
      "car-rental/reservations/confirm",
      bookingData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, message: "Failed to create booking", data: null };
  }
};

export const createPayment = async (reservation_id: any) => {
  try {
    const response = await axios.post(
      `/car-rental/reservations/${reservation_id}/payments`
    );
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    return { success: false, message: "Failed to create payment", data: null };
  }
};

// ============================================
// RESERVATION WORKFLOW ACTIONS
// ============================================

/**
 * Step 1: Get information to build the date step
 * Endpoint: GET /car-rental/reservations/dates?brand_id={brand_id}
 * Returns configuration needed to build pickup/return form (locations, business hours, rules, etc.)
 */
export const getReservationDatesConfig = async () => {
  try {
    const response = await axios.get(
      `car-rental/reservations/dates?brand_id=1`
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Error fetching reservation dates config:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to fetch reservation dates configuration",
      data: null,
    };
  }
};

/**
 * Step 2: Validate dates and get available vehicle classes
 * Endpoint: POST /car-rental/reservations/dates
 * Returns list of available vehicle classes and base pricing for selected dates
 */
export const validateDatesAndGetVehicleClasses = async ({
  pick_up_location,
  return_location,
  pick_up_date,
  pick_up_time,
  return_date,
  return_time,
  car_id,
}: {
  pick_up_location: number;
  return_location: number;
  pick_up_date: string; // Format: YYYY-MM-DD
  pick_up_time: string; // Format: HH:mm:ss
  return_date: string; // Format: YYYY-MM-DD
  return_time: string; // Format: HH:mm:ss
  car_id: number;
}) => {
  try {
    const response = await axios.post("car-rental/reservations/dates", {
      brand_id: 1,
      pick_up_location,
      return_location,
      pick_up_date,
      pick_up_time,
      return_date,
      return_time,
    });

    if (response.data.success && response.data.data) {
      const applicableClasses = response.data.data.applicable_classes || [];
      const currentCarData = applicableClasses.find(
        (vehicle: any) => vehicle.vehicle_class_id === car_id
      );

      if (!currentCarData || !currentCarData.availability?.selectable) {
        return {
          success: false,
          message:
            currentCarData?.availability?.selection_alert ||
            "This vehicle is not available for the selected dates",
          data: null,
        };
      }

      return {
        success: true,
        data: currentCarData,
      };
    }
  } catch (error: any) {
    console.error("Error validating dates and getting vehicle classes:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to validate dates and get vehicle classes",
      data: null,
    };
  }
};

/**
 * Step 3: Get applicable additional charges
 * Endpoint: GET /car-rental/reservations/additional-charges
 * Returns all extras, insurance options, and fees that apply to the reservation
 */
export const getApplicableAdditionalCharges = async ({
  vehicle_class_id,
  pick_up_location,
  return_location,
  pick_up_date,
  pick_up_time,
  return_date,
  return_time,
}: {
  vehicle_class_id: number;
  pick_up_location: number;
  return_location: number;
  pick_up_date: string; // Format: YYYY-MM-DD
  pick_up_time: string; // Format: HH:mm:ss
  return_date: string; // Format: YYYY-MM-DD
  return_time: string; // Format: HH:mm:ss
}) => {
  try {
    const queryParams = new URLSearchParams({
      pick_up_date,
      pick_up_time,
      return_date,
      return_time,
      pick_up_location: pick_up_location.toString(),
      return_location: return_location.toString(),
      brand_id: "1",
      vehicle_class_id: vehicle_class_id.toString(),
    });

    const response = await axios.get(
      `car-rental/reservations/additional-charges?${queryParams.toString()}`
    );

    console.log(response.data.data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Error fetching applicable additional charges:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to fetch applicable additional charges",
      data: null,
    };
  }
};

/**
 * Step 4: Return price for the selection of charges
 * Endpoint: POST /car-rental/reservations/additional-charges
 * Posts selected additional charges and returns updated summary with total price and security deposit/excess amount
 *
 * additional_charges format:
 * - Single charge: "3"
 * - Multiple quantities: "8_2" (where 2 is the quantity)
 *
 * Response structure:
 * - data.total.total_price: Final total price
 * - data.total.outstanding_balance: Amount to be paid
 * - data.total.security_deposit: Security deposit amount
 * - data.selected_vehicle_class.price: Vehicle pricing details
 * - data.selected_additional_charges: Selected charges with prices
 */
export const calculateReservationPrice = async ({
  pick_up_date,
  pick_up_time,
  return_date,
  return_time,
  pick_up_location,
  return_location,
  vehicle_class_id,
  additional_charges,
}: {
  pick_up_date: string; // Format: YYYY-MM-DD
  pick_up_time: string; // Format: HH:mm
  return_date: string; // Format: YYYY-MM-DD
  return_time: string; // Format: HH:mm
  pick_up_location: number;
  return_location: number;
  vehicle_class_id: number;
  additional_charges: string[]; // Array of charge IDs, e.g., ["3", "8_2"]
}) => {
  try {
    // Build query parameters
    const queryParams = new URLSearchParams({
      pick_up_date,
      pick_up_time,
      return_date,
      return_time,
      pick_up_location: pick_up_location.toString(),
      return_location: return_location.toString(),
      brand_id: "1",
      vehicle_class_id: vehicle_class_id.toString(),
    });

    // Add additional_charges as array parameters
    additional_charges.forEach((charge) => {
      queryParams.append("additional_charges[]", charge);
    });

    const response = await axios.post(
      `car-rental/reservations/additional-charges?${queryParams.toString()}`,
      {}
    );

    // Extract pricing data from response
    // Response structure: { success, data: { total: { total_price: {...}, ... }, ... } }
    const responseData = response.data?.data || response.data;

    // Extract total price - this is the final amount to pay
    const totalPrice = responseData?.total?.total_price?.amount || "0.00";
    const outstandingBalance =
      responseData?.total?.outstanding_balance?.amount || totalPrice;
    const securityDeposit =
      responseData?.total?.security_deposit?.amount || "0.00";
    const securityDepositExcess =
      responseData?.total?.security_deposit_excess?.amount || "0.00";

    return {
      success: true,
      data: {
        ...responseData,
        // Extract key pricing values for easy access (as numbers)
        totalPrice: parseFloat(totalPrice),
        outstandingBalance: parseFloat(outstandingBalance),
        securityDeposit: parseFloat(securityDeposit),
        securityDepositExcess: parseFloat(securityDepositExcess),
        // Full price objects with currency info (for display)
        totalPriceObject: responseData?.total?.total_price,
        outstandingBalanceObject: responseData?.total?.outstanding_balance,
        securityDepositObject: responseData?.total?.security_deposit,
        // Vehicle pricing details
        vehiclePrice: responseData?.selected_vehicle_class?.price,
        // Selected charges with their prices
        selectedCharges: responseData?.selected_additional_charges || [],
        // Distance limits
        distanceLimits: responseData?.selected_vehicle_class?.distance_limits,
        // Applicable taxes
        taxes: responseData?.applicable_taxes || [],
      },
    };
  } catch (error: any) {
    console.error("Error calculating reservation price:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to calculate reservation price",
      data: null,
    };
  }
};

/**
 * Step 5: Get info and validation to build Step 4 Customer form
 * Endpoint: GET /car-rental/reservations/fields/customer
 * Returns details and validations required to build the customer form
 *
 * Response structure:
 * - data.fields: Array of field objects with id, label, handle, type, required, etc.
 * - data.contact_category_id: Category ID for the contact (e.g., "3")
 *
 * Field types include:
 * - "text": Text input
 * - "datewithcalendar": Date picker
 * - "image": File upload
 * - "countries": Country selector
 */
export const getCustomerFields = async () => {
  try {
    const response = await axios.get("car-rental/reservations/fields/customer");

    // Extract data from response
    const responseData = response.data?.data || response.data;
    const allFields = responseData?.fields || [];
    const contactCategoryId = responseData?.contact_category_id || null;

    // Filter to only required fields and separate form fields from image fields
    const requiredFormFields = allFields.filter(
      (field: any) => field.required === true && field.type !== "image"
    );
    const requiredImageFields = allFields.filter(
      (field: any) => field.required === true && field.type === "image"
    );

    // Group required fields by type
    const fieldsByType: Record<string, any[]> = {};
    requiredFormFields.forEach((field: any) => {
      const type = field.type || "text";
      if (!fieldsByType[type]) {
        fieldsByType[type] = [];
      }
      fieldsByType[type].push(field);
    });

    // Get common fields by handle (for easy access) - from required fields only
    const commonFields = {
      firstName: requiredFormFields.find((f: any) => f.handle === "first_name"),
      lastName: requiredFormFields.find((f: any) => f.handle === "last_name"),
      email: requiredFormFields.find((f: any) => f.handle === "email"),
      phone: requiredFormFields.find((f: any) => f.handle === "phone"),
      passportNumber: requiredFormFields.find(
        (f: any) => f.handle === "passport_number"
      ),
      idNumber: requiredFormFields.find((f: any) => f.handle === "id_number"),
      dlNumber: requiredFormFields.find((f: any) => f.handle === "dl_number"),
      birthdate: requiredFormFields.find((f: any) => f.handle === "birthdate"),
      street: requiredFormFields.find((f: any) => f.handle === "street"),
      city: requiredFormFields.find((f: any) => f.handle === "city"),
      country: requiredFormFields.find((f: any) => f.handle === "country"),
    };

    return {
      success: true,
      data: {
        // Full response data
        ...responseData,
        // Only required fields (excluding image fields)
        fields: requiredFormFields,
        // Required image fields (for file uploads)
        imageFields: requiredImageFields,
        // Alias for backward compatibility
        requiredFields: requiredFormFields,
        // Group by field type
        fieldsByType,
        // Easy access to common fields
        commonFields,
        // Contact category ID
        contactCategoryId,
      },
    };
  } catch (error: any) {
    console.error("Error fetching customer fields:", error);
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to fetch customer fields",
      data: null,
    };
  }
};

/**
 * Step 6: Create the customer
 * Endpoint: POST /car-rental/reservations/customer
 * Creates a customer contact and returns the customer ID in data.customer.id
 * Parameters depend on system configuration and fields from Step 5
 */
export const createCustomer = async (
  customerData: Record<string, any>,
  customerFields?: any,
  reservationData?: {
    pick_up_date?: string;
    pick_up_time?: string;
    return_date?: string;
    return_time?: string;
    pick_up_location?: number;
    return_location?: number;
    brand_id?: number;
    vehicle_class_id?: number;
  }
) => {
  console.log(customerData);
  try {
    // Build request body with field mappings
    const requestBody: Record<string, any> = {
      contact_entity: "person",
      field_2: customerData.first_name,
      field_3: customerData.last_name,
      field_9: customerData.email,
      field_6: customerData.website,
    };

    // Add reservation details if provided
    if (reservationData) {
      if (reservationData.pick_up_date) {
        requestBody.pick_up_date = reservationData.pick_up_date;
      }
      if (reservationData.pick_up_time) {
        requestBody.pick_up_time = reservationData.pick_up_time;
      }
      if (reservationData.return_date) {
        requestBody.return_date = reservationData.return_date;
      }
      if (reservationData.return_time) {
        requestBody.return_time = reservationData.return_time;
      }
      if (reservationData.pick_up_location) {
        requestBody.pick_up_location = reservationData.pick_up_location;
      }
      if (reservationData.return_location) {
        requestBody.return_location = reservationData.return_location;
      }
      if (reservationData.brand_id) {
        requestBody.brand_id = reservationData.brand_id;
      }
      if (reservationData.vehicle_class_id) {
        requestBody.vehicle_class_id = reservationData.vehicle_class_id;
      }
    }

    console.log("Request body:", requestBody);

    const response = await axios.post(
      "car-rental/reservations/customer",
      requestBody
    );

    console.log(response.data);
    return {
      success: true,
      data: response.data,
      customerId: response.data?.data?.customer?.id,
    };
  } catch (error: any) {
    console.error("Error creating customer:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create customer",
      data: null,
      customerId: null,
    };
  }
};

/**
 * Step 7: Upload Driver's License File
 * Endpoint: POST /files/upload
 * Uploads driver's license file for the created customer
 *
 * Usage: Pass FormData from the client, or use the individual parameters
 */
export const uploadDriversLicense = async (
  formDataOrParams:
    | FormData
    | {
        item_id: number; // Customer ID from Step 6
        file: File | Blob | Buffer;
        filename: string;
        field_id?: number; // Optional field ID for the driver's license field
      }
    | {
        item_id: number; // Customer ID from Step 6
        files: Array<{
          file: File | Blob | Buffer;
          filename: string;
          field_id: number; // Required field ID for each file
        }>;
      }
) => {
  try {
    // Handle multiple files upload
    if (
      !(formDataOrParams instanceof FormData) &&
      "files" in formDataOrParams &&
      Array.isArray(formDataOrParams.files)
    ) {
      const { item_id, files } = formDataOrParams;
      const uploadResults = [];

      // Upload each file sequentially
      for (const fileData of files) {
        const { file, filename, field_id } = fileData;
        const formData = new FormData();
        formData.append("item_type", "contacts.3");
        formData.append("item_id", item_id.toString());

        // Handle different file types (File, Blob, or Buffer)
        if (file instanceof File || file instanceof Blob) {
          formData.append("file", file);
        } else {
          // Convert Buffer to Blob
          const buffer = file as Buffer;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formData.append("file", buffer as any, filename);
        }

        formData.append("filename", filename);
        formData.append("field_id", field_id.toString());

        try {
          const response = await axios.post("files/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          uploadResults.push({
            success: true,
            field_id,
            data: response.data,
          });
        } catch (error: any) {
          uploadResults.push({
            success: false,
            field_id,
            message: error.response?.data?.message || "Failed to upload file",
          });
        }
      }

      // Check if all uploads succeeded
      const allSucceeded = uploadResults.every((r) => r.success);
      console.log("upload documents response", uploadResults);

      return {
        success: allSucceeded,
        data: uploadResults,
        message: allSucceeded
          ? "All files uploaded successfully"
          : "Some files failed to upload",
      };
    }

    // Handle single file upload (backward compatibility)
    let formData: FormData;

    // Handle both FormData from client or individual parameters
    if (formDataOrParams instanceof FormData) {
      formData = formDataOrParams;
      // Ensure required fields are set
      if (!formData.has("item_type")) {
        formData.append("item_type", "contacts.3");
      }
    } else if ("file" in formDataOrParams && !("files" in formDataOrParams)) {
      // Single file upload (backward compatibility)
      const singleFileParams = formDataOrParams as {
        item_id: number;
        file: File | Blob | Buffer;
        filename: string;
        field_id?: number;
      };
      const { item_id, file, filename, field_id } = singleFileParams;
      formData = new FormData();
      formData.append("item_type", "contacts.3");
      formData.append("item_id", item_id.toString());

      // Handle different file types (File, Blob, or Buffer)
      if (file instanceof File || file instanceof Blob) {
        formData.append("file", file);
      } else {
        // Convert Buffer to Blob - Buffer is a Uint8Array in Node.js
        // Buffer works as BlobPart at runtime, use type assertion for TypeScript
        const buffer = file as Buffer;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formData.append("file", buffer as any, filename);
      }

      formData.append("filename", filename);
      if (field_id) {
        formData.append("field_id", field_id.toString());
      }
    } else {
      // This should not happen, but handle gracefully
      throw new Error("Invalid parameters for uploadDriversLicense");
    }

    const response = await axios.post("files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("upload drivers license response", response);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Error uploading driver's license:", error);
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to upload driver's license",
      data: null,
    };
  }
};

/**
 * Get Payment Methods
 * Endpoint: GET /payment-gateways/methods
 * Returns available payment methods for the reservation
 */
export const getPaymentMethods = async () => {
  try {
    const response = await axios.get("payment-gateways/methods");

    // Extract payment methods from paginated response
    const paymentMethods = response.data?.data || [];

    // Filter only active payment methods
    const activePaymentMethods = paymentMethods.filter(
      (method: any) => method.active === true
    );

    return {
      success: true,
      data: activePaymentMethods,
    };
  } catch (error: any) {
    console.error("Error fetching payment methods:", error);
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to fetch payment methods",
      data: [],
    };
  }
};

/**
 * Step 8: Confirm Reservation and Generate Payment Link
 * Endpoint: POST /car-rental/reservations/confirm
 * Creates the reservation and generates the payment method for the customer
 * Implementation depends on payment method being used
 */
export const confirmReservation = async (reservationData: {
  vehicle_class_id: number;
  pick_up_location: number;
  return_location: number;
  pick_up_date: string; // Format: YYYY-MM-DD
  pick_up_time: string; // Format: HH:mm:ss
  return_date: string; // Format: YYYY-MM-DD
  return_time: string; // Format: HH:mm:ss
  customer_id: number; // From Step 6
  payment_method_id: number; // Selected payment method ID
  additional_charges?: string[]; // Array of charge IDs
  payment_external_redirect?: string; // Optional redirect URL
  email?: string; // User email for MongoDB
  password?: string; // User password for MongoDB
  name?: string; // User name for MongoDB (first_name + last_name)
  [key: string]: any; // Allow additional fields based on payment method
}) => {
  try {
    // Ensure time format is HH:mm:ss
    const formatTime = (time: string) => {
      if (!time) return "08:00:00";
      if (time.split(":").length === 2) {
        return `${time}:00`;
      }
      return time;
    };

    const response = await axios.post("car-rental/reservations/confirm", {
      customer_id: reservationData.customer_id,
      brand_id: 1,
      pick_up_date: reservationData.pick_up_date,
      return_date: reservationData.return_date,
      pick_up_time: formatTime(reservationData.pick_up_time),
      return_time: formatTime(reservationData.return_time),
      vehicle_class_id: reservationData.vehicle_class_id,
      pick_up_location: reservationData.pick_up_location,
      return_location: reservationData.return_location,
      return_payment_link: 1,
      payment_method_id: reservationData.payment_method_id,
      payment_external_redirect:
        reservationData.payment_external_redirect ||
        "https://test.com/reservation-payments",
      set_amount_to_pay_online_from_settings: 1,
      ...(reservationData.additional_charges && {
        additional_charges: reservationData.additional_charges,
      }),
    });

    console.log("confirm reservation response", response);

    // Create user in MongoDB if email and password are provided
    if (reservationData.email && reservationData.password) {
      try {
        await connectToDatabase();

        // Check if user already exists
        const existingUser = await User.findOne({
          email: reservationData.email,
        });
        if (existingUser) {
          console.log("User already exists with email:", reservationData.email);
        } else {
          // Hash password
          const hashedPassword = await bcrypt.hash(
            reservationData.password,
            10
          );

          // Create new user
          const newUser = await User.create({
            email: reservationData.email,
            password: hashedPassword,
            name: reservationData.name || "User",
            customer_id: reservationData.customer_id.toString(),
          });

          console.log("User created in MongoDB:", newUser._id);
        }
      } catch (userError: any) {
        // Log error but don't fail the reservation if user creation fails
        console.error("Error creating user in MongoDB:", userError);
        // Continue with reservation success even if user creation fails
      }
    }

    if (response.data.status_code == 410) {
      return {
        success: false,
        message: response.data.errors.error_message,
        data: null,
        reservationId: null,
        paymentLink: null,
      };
    }

    return {
      success: true,
      data: response.data,
      reservationId: response.data?.data?.reservation?.id,
      paymentLink: response.data?.data?.transaction?.payment_link,
    };
  } catch (error: any) {
    console.error("Error confirming reservation:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to confirm reservation",
      data: null,
      reservationId: null,
      paymentLink: null,
    };
  }
};
