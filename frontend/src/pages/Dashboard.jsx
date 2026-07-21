import { useEffect, useState } from "react";
import api from "../services/api";
import VehicleCard from "../components/VehicleCard";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import "../styles/style.css";

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);

  // Load all vehicles
  const loadVehicles = async () => {
    try {
      const response = await api.get("/vehicles");
      setVehicles(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch vehicles");
    }
  };

  // Search vehicles
  const searchVehicles = async (make) => {
    try {
      if (make.trim() === "") {
        loadVehicles();
        return;
      }

      const response = await api.get(
        `/vehicles/search?make=${make}`
      );

      setVehicles(response.data);
    } catch (error) {
      console.error(error);
      alert("Search failed");
    }
  };

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const response = await api.get("/vehicles");
        setVehicles(response.data);
      } catch (error) {
        console.error(error);
        alert("Unable to fetch vehicles");
      }
    };

    loadVehicles();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Car Dealership Inventory</h1>

        <SearchBar onSearch={searchVehicles} />

        <div className="card-container">
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
              />
            ))
          ) : (
            <h3>No Vehicles Found</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;