import express from "express";
import authRoutes from "./routes/authRoutes";
import vehicleRoutes from "./routes/vehicleRoutes";



const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Car Dealership Inventory API"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

export default app;