import "../styles/WellDetails.css";

function WellDetails() {
  const well = { id: 1, name: "Well Alpha", location: "West Texas" };
  const liveReading = { pressure: 145.64, temp: 98.84, output: "bbl/day", timestamp: "10:06:55 PM" };
  const activeAlert = "High Pressure Detected";
  const alertHistory = ["6/10/2025, 9:52:05 PM", "6/10/2025, 9:52:06 PM", "6/10/2025, 9:52:10 PM"];

  return (
    <div className="well-details-container">
      <h2 className="well-details-title">Well #{well.id}</h2>

      <div className="well-info"><strong>Name:</strong> {well.name}</div>
      <div className="well-info"><strong>Location:</strong> {well.location}</div>

      <div className="live-readings">
        <strong>Pressure:</strong> {liveReading.pressure} psi,&nbsp;
        <strong>Temp:</strong> {liveReading.temp} °F,&nbsp;
        <strong>Output:</strong> {liveReading.output}&nbsp;
        <em>({liveReading.timestamp})</em>
      </div>

      <div className="alert-section">
        <h4>Active Alerts</h4>
        <div className="alert-box">{activeAlert || "None"}</div>
      </div>

      <div className="alert-section alert-history">
        <h4>Alert History</h4>
        {alertHistory.map((time, i) => (
          <div className="history-item" key={i}>
            — {time}
          </div>
        ))}
      </div>
    </div>
  );
}
