import {
  createVehicle,
  getAllVehicles,
  searchVehiclesByFilter,
  updateVehicleById,
  deleteVehicleById,
  purchaseVehicleById,
  restockVehicleById,getVehicleById
} from "../models/vehicleModel";

// Add Vehicle
export const addVehicle = async (
  make: string,
  model: string,
  category: string,
  price: number,
  quantity: number
) => {
  return await createVehicle(
    make,
    model,
    category,
    price,
    quantity
  );
};

// Get All Vehicles
export const fetchVehicles = async () => {
  return await getAllVehicles();
};

// Search Vehicle
export const searchVehicle = async (filters: any) => {
  return await searchVehiclesByFilter(filters);
};

// Update Vehicle
export const updateVehicle = async (
  id: number,
  make: string,
  model: string,
  category: string,
  price: number,
  quantity: number
) => {
  return await updateVehicleById(
    id,
    make,
    model,
    category,
    price,
    quantity
  );
};

// Delete Vehicle
export const deleteVehicle = async (id: number) => {
  return await deleteVehicleById(id);
};

// Purchase Vehicle
export const purchaseVehicle = async (
  id: number,
  quantity: number
) => {
  const vehicle = await purchaseVehicleById(id, quantity);

  if (!vehicle) {
    throw new Error("Not enough stock");
  }

  return vehicle;
};

// Restock Vehicle
export const restockVehicle = async (
  id: number,
  quantity: number
) => {
  const vehicle = await restockVehicleById(id, quantity);

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  return vehicle;
};
export const fetchVehicleById = async (id: number) => {
  return await getVehicleById(id);
};