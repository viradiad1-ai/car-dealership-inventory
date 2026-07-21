import api from "../services/api";

function VehicleCard({ vehicle }) {
  const token = localStorage.getItem("token");

  // Purchase Vehicle
  const purchaseVehicle = async () => {
    try {
      const response = await api.post(
        `/vehicles/${vehicle.id}/purchase`,
        { quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Purchase Failed");
    }
  };

  // Edit Vehicle
  const editVehicle = () => {
    window.location.href = `/admin/edit/${vehicle.id}`;
  };

  // Delete Vehicle
  const deleteVehicle = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(
        `/vehicles/${vehicle.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  // Restock Vehicle
  const restockVehicle = async () => {
    const quantity = prompt("Enter quantity to restock:");

    if (!quantity || Number(quantity) <= 0) {
      return;
    }

    try {
      const response = await api.post(
        `/vehicles/${vehicle.id}/restock`,
        {
          quantity: Number(quantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Restock Failed");
    }
  };

  return (
    <div className="card">
      <h2>
        {vehicle.make} {vehicle.model}
      </h2>

      <p>
        <strong>Category:</strong> {vehicle.category}
      </p>

      <p>
        <strong>Price:</strong> ₹
        {Number(vehicle.price).toLocaleString()}
      </p>

      <p>
        <strong>Stock:</strong> {vehicle.quantity}
      </p>

      <button
        className="purchase-btn"
        onClick={purchaseVehicle}
      >
        Purchase
      </button>

      <button
        className="edit-btn"
        onClick={editVehicle}
      >
        Edit
      </button>

      <button
        className="delete-btn"
        onClick={deleteVehicle}
      >
        Delete
      </button>

      <button
        className="restock-btn"
        onClick={restockVehicle}
      >
        Restock
      </button>
    </div>
  );
}

export default VehicleCard;