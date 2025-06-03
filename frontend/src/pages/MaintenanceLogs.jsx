import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function MaintenanceLogs() {
  const [logs, setLogs] = useState([]);

  const [token] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAdmin(decoded.role === "admin");
      } catch (err) {
        console.error("Token decoding failed:", err);
        setIsAdmin(false); 
      }
    }
  }, [token]);


  useEffect(() => {
    axios
      .get("http://localhost:5001/api/maintenance")
      .then((res) => setLogs(res.data))
      .catch((err) => console.error("Failed to fetch logs", err));
  }, []);

  const handleDelete = async (id) => {
    if (!token) return alert("You must be logged in.");
    
    if (!window.confirm("Are you sure you want to delete this log?")) return;

    try {
      await axios.delete(`http://localhost:5001/api/maintenance/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLogs(logs.filter(log => log.id !== id));
    } catch (err) {
      console.error("Failed to delete log:", err);
      alert("Error deleting log.");
    }
  };

  return (
    <div>
      <h2>Maintenance Logs</h2>
      {logs.length === 0 ? (
        <p>No logs found</p>
      ) : (
        <ul>
          {logs.map((log) => (
            <li key={log.id}>
              <strong>{log.description}</strong> <br />
              <em>Peformed by:</em> {log.performed_by} <br />
              <em>Well ID:</em> {log.well_id} <br />
              <em>Date:</em> {new Date(log.timestamp).toLocaleString()} <br />

              {isAdmin && (
                <button onClick={() => handleDelete(log.id)} style={{color: "red" }}>
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MaintenanceLogs;
