import { useParams } from "react-router-dom";
import "../styles/style.css";

function EditVehicle() {
  const { id } = useParams();

  return (
    <div className="edit-container">
      <form className="edit-form">
        <h2>Edit Vehicle</h2>

        <input
          type="text"
          placeholder="Vehicle Make"
        />

        <input
          type="text"
          placeholder="Vehicle Model"
        />

        <input
          type="text"
          placeholder="Category"
        />

        <input
          type="number"
          placeholder="Price"
        />

        <input
          type="number"
          placeholder="Quantity"
        />

        <button type="submit">
          Update Vehicle
        </button>

        <p className="vehicle-id">
          Vehicle ID: {id}
        </p>
      </form>
    </div>
  );
}

export default EditVehicle;