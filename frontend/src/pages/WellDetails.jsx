import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function WellDetails() {
  const { id } = useParams();
  const [well, setWell] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/sim/wells/${id}`)
      .then((res) => {
        setWell(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch well data:", err);
        setError("Failed to load well details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading well data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Well #{well.id}</h2>
      <ul>
        <li><strong>Name:</strong> {well.name}</li>
        <li><strong>Location:</strong> {well.location}</li>
      </ul>
    </div>
  );
}

export default WellDetails;
