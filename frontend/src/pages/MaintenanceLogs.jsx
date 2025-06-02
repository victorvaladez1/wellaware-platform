import { useEffect, useState } from "react";
import axios from "axios";

function MaintenanceLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/maintenance")
      .then((res) => setLogs(res.data))
      .catch((err) => console.error("Failed to fetch logs", err));
  }, []);

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
              <em>Performed by:</em> {log.performed_by} <br />
              <em>Well ID:</em> {log.well_id} <br />
              <em>Date:</em> {new Date(log.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MaintenanceLogs;
