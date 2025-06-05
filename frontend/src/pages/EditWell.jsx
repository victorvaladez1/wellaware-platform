import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function EditWell() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

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

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/sim/wells/${id}`)
      .then((res) => {
        setName(res.data.name);
        setLocation(res.data.location);
      })
      .catch((err) => {
        console.error("Failed to fetch well:", err);
        setError("Failed to load well data.");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !isAdmin) {
      setError("Unauthorized.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5001/api/sim/wells/${id}`,
        { name, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/wells");
    } catch (err) {
      console.error("Failed to update well:", err);
      setError("Error updating well.");
    }
  };

  if (!isAdmin) return <p style={{ color: "red" }}>Access denied.</p>;

  return (
    <div>
      <h2>Edit Well #{id}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={name}
            placeholder="Well Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Well</button>
      </form>
    </div>
  );
}

export default EditWell;
