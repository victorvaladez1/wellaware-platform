import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

  if (!isAdmin) return <p style={{ color: "red" }}>Access denied.</p>;

  return (
    <div>
      <h2>Add New Well</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Well Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Well</button>
      </form>
    </div>
  );
}

export default AddWell;