import { Router } from "express";
import {
  createVehicle,
  getVehicles,
  searchVehicles,editVehicle,removeVehicle,buyVehicle, restockVehicleController
} from "../controllers/vehicleController";
import { authenticate } from "../middleware/authMiddleware";
import { authorizeAdmin } from "../middleware/adminMiddleware";


const router = Router();

router.post("/", authenticate, createVehicle);
router.get("/search", searchVehicles);
router.get("/", getVehicles);
router.put("/:id", authenticate, editVehicle);
router.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  removeVehicle
);
router.post(
  "/:id/purchase",
  authenticate,
  buyVehicle
);
router.post(
  "/:id/restock",
  authenticate,
  authorizeAdmin,
  restockVehicleController
);

export default router;