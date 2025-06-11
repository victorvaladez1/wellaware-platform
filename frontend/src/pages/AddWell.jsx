import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/AddWell.css";

function AddWell() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const isAdmin = (() => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return decoded.role === "admin";
    } catch {
      return false;
    }
  })();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !isAdmin) {
      setError("Unauthorized. Only admins can create wells.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5001/api/sim/wells",
        { name, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/wells");
    } catch (err) {
      console.error("Failed to add well:", err);
      setError("Error creating well.");
    }
  };

  if (!isAdmin) return <p className="access-denied">Access denied.</p>;

  return (
    <div className="add-well-container">
      <div className="add-well-card">
        <h2>Add New Well</h2>
        {error && <p className="form-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Well Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <button type="submit">Create Well</button>
        </form>
      </div>
    </div>
  );
}

export default AddWell;
