import { useState } from "react";
import api from "../services/api";
import "../styles/style.css";

function Admin() {
  const [vehicle, setVehicle] = useState({
    make: "",
    model: "",
    category: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value,
    });
  };

  const addVehicle = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/vehicles",
        vehicle,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message || "Vehicle Added");

      setVehicle({
        make: "",
        model: "",
        category: "",
        price: "",
        quantity: "",
      });

    } catch (error) {
      alert(error.response?.data?.message || "Add Vehicle Failed");
    }
  };

  return (
  <div className="admin-container">
    <form className="admin-form" onSubmit={addVehicle}>
      <h2>Add New Vehicle</h2>

      <input
        type="text"
        name="make"
        placeholder="Vehicle Make"
        value={vehicle.make}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="model"
        placeholder="Vehicle Model"
        value={vehicle.model}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={vehicle.category}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={vehicle.price}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={vehicle.quantity}
        onChange={handleChange}
        required
      />

      <button type="submit">
        Add Vehicle
      </button>
    </form>
  </div>
);}

export default Admin;