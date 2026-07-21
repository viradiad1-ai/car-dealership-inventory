import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>🚗 Car Dealership</h2>
      <button onClick={() => navigate("/admin")}>
        Add Vehicle
      </button>

      <button onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;