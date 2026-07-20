import { useEffect, useState } from "react";
import { endpoints } from "../services/api";
function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
   fetch(endpoints.alerts)
      .then((res) => res.json())
      .then((data) => setAlerts(data.alerts || []))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page">
      <h1>Critical Alerts</h1>

      <h3>Total Alerts: {alerts.length}</h3>

      {alerts.length === 0 ? (
        <div
          style={{
            padding: "20px",
            marginTop: "20px",
            border: "1px solid #4CAF50",
            borderRadius: "8px",
            background: "#f0fff4",
            color: "#2e7d32",
            fontWeight: "bold",
          }}
        >
          ✅ No Critical Alerts Found
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Severity</th>
              <th>Service</th>
              <th>Message</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((alert, index) => (
              <tr key={index}>
                <td>{alert.severity}</td>
                <td>{alert.service}</td>
                <td>{alert.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Alerts;