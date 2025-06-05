import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function WellDetails() {
  const { id } = useParams();
  const [well, setWell] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [readings, setReadings] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [alertLog, setAlertLog] = useState([]);


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
    axios
        .get(`http://localhost:5001/api/sim/readings?well_id=${id}`)
        .then((res) => setReadings(res.data))
        .catch((err) => console.error("Failed to fetch readings:", err));

    axios
        .get("http://localhost:5001/api/sim/alerts")
        .then((res) => {
        const related = res.data.filter((a) => a.well_id === Number(id));
        setAlerts(related);
        })
        .catch((err) => console.error("Failed to fetch alerts:", err));

    axios
        .get("http://localhost:5001/api/sim/alert-log")
        .then((res) => {
            const filtered = res.data.filter((entry) => entry.well_id === Number(id));
            setAlertLog(filtered);
        })
        .catch((err) => console.error("Failed to fetch alert log:", err));
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

        <h3>Live Readings</h3>
            {readings.length === 0 ? (
            <p>No readings available.</p>
            ) : (
            <ul>
                {readings.map((r, i) => (
                <li key={i}>
                    <strong>Pressure:</strong> {r.pressure} psi,&nbsp;
                    <strong>Temp:</strong> {r.temperature} °F,&nbsp;
                    <strong>Output:</strong> {r.output} bbl/day&nbsp;
                    <em>({new Date(r.timestamp).toLocaleTimeString()})</em>
                </li>
                ))}
            </ul>
            )}

            <h3>Active Alerts</h3>
            {alerts.length === 0 ? (
            <p>No alerts.</p>
            ) : (
            <ul>
                {alerts.map((a, i) => (
                <li key={i} style={{ color: "red" }}>
                    <strong>{a.type}:</strong> {a.message}
                </li>
                ))}
            </ul>
            )}

            <h3>Alert History</h3>
                {alertLog.length === 0 ? (
                <p>No past alerts.</p>
                ) : (
                <ul>
                    {alertLog.map((log) => (
                    <li key={log.id}>
                        <strong>{log.alert_type}</strong> —{" "}
                        {new Date(log.timestamp).toLocaleString()}
                    </li>
                    ))}
                </ul>
                )}
    </div>
  );
}

export default WellDetails;
