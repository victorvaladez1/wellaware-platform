import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../styles/WellsList.css";

function WellsList() {
  const [wells, setWells] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
      .get("http://localhost:5001/api/sim/wells")
      .then((res) => setWells(res.data))
      .catch((err) => {
        console.error("Failed to fetch wells:", err);
        setError("Unable to load wells.");
      });
  }, []);

  const handleDelete = async (wellId) => {
    if (!window.confirm("Are you sure you want to delete this well?")) return;

    try {
      await axios.delete(`http://localhost:5001/api/sim/wells/${wellId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWells(wells.filter((well) => well.id !== wellId));
    } catch (err) {
      console.error("Failed to delete well:", err);
      alert("Error deleting well.");
    }
  };

  return (
    <div className="wells-page">
      <h2>All Wells</h2>
      {error && <p className="wells-error">{error}</p>}
      {wells.length === 0 ? (
        <p>No wells available.</p>
      ) : (
        <ul className="well-list">
          {wells.map((well) => (
            <li className="well-card" key={well.id}>
              <div className="well-info">
                <span className="well-name">{well.name}</span>
                <span className="well-location"> - {well.location}</span>
              </div>
              <div className="well-actions">
                <Link className="view-link" to={`/well/${well.id}`}>View</Link>
                {isAdmin && (
                  <>
                    <button className="delete-btn" onClick={() => handleDelete(well.id)}>Delete</button>
                    <button className="edit-btn" onClick={() => navigate(`/wells/${well.id}/edit`)}>Edit</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WellsList;
