import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

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
    <div>
      <h2>All Wells</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {wells.length === 0 ? (
        <p>No wells available.</p>
      ) : (
        <ul>
          {wells.map((well) => (
            <li key={well.id}>
                <strong>{well.name}</strong> - {well.location}
                    &nbsp; <a href={`/well/${well.id}`}>View</a>
                        {isAdmin && (
                        <>
                        &nbsp; | &nbsp;
                        <button style={{ color: "red" }} onClick={() => handleDelete(well.id)}>
                            Delete
                        </button>
                    </>
                )}
                {isAdmin && (
                  <button onClick={() => navigate(`/wells/${well.id}/edit`)}>
                    Edits
                  </button>
                )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WellsList;
