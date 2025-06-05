import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function WellsList() {
  const [wells, setWells] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/sim/wells")
      .then((res) => setWells(res.data))
      .catch((err) => {
        console.error("Failed to fetch wells:", err);
        setError("Unable to load wells.");
      });
  }, []);

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
              <Link to={`/well/${well.id}`}>
                <strong>{well.name}</strong> - {well.location}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WellsList;
