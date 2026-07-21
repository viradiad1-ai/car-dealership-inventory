import { Request, Response } from "express";
import {
  addVehicle,
  fetchVehicles,
  searchVehicle,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
} from "../services/vehicleService";

// Create Vehicle
export const createVehicle = async (
  req: Request,
  res: Response
) => {
  try {
    const { make, model, category, price, quantity } = req.body;

    const vehicle = await addVehicle(
      make,
      model,
      category,
      price,
      quantity
    );

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: "Error adding vehicle",
    });
  }
};

// Get All Vehicles
export const getVehicles = async (
  req: Request,
  res: Response
) => {
  try {
    const vehicles = await fetchVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching vehicles",
    });
  }
};

// Search Vehicles
export const searchVehicles = async (
  req: Request,
  res: Response
) => {
  try {
    const vehicles = await searchVehicle(req.query);
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({
      message: "Error searching vehicles",
    });
  }
};

// Update Vehicle
export const editVehicle = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { make, model, category, price, quantity } = req.body;

    const vehicle = await updateVehicle(
      Number(id),
      make,
      model,
      category,
      price,
      quantity
    );

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: "Vehicle Update Failed",
    });
  }
};

// Delete Vehicle
export const removeVehicle = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const vehicle = await deleteVehicle(Number(id));

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
    });
  }
};

// Purchase Vehicle
export const buyVehicle = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const vehicle = await purchaseVehicle(
      Number(id),
      quantity
    );

    res.status(200).json({
      message: "Vehicle purchased successfully",
      vehicle,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Purchase failed",
    });
  }
};

// Restock Vehicle
export const restockVehicleController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const vehicle = await restockVehicle(
      Number(id),
      quantity
    );

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      message: "Vehicle restocked successfully",
      vehicle,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Restock failed",
    });
  }
};