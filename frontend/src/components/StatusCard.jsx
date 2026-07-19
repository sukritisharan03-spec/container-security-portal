function StatusCard({ title, status }) {

  const getColor = () => {

    if (
      status === "Connected" ||
      status === "Running" ||
      status === "Synced"
    ) {
      return "#16a34a"; // Green
    }

    if (
      status === "Disconnected" ||
      status === "Not Connected"
    ) {
      return "#dc2626"; // Red
    }

    return "#2563eb"; // Blue (for Security Score)
  };

  return (
    <div className="status-card">
      <h3>{title}</h3>

      <span
        style={{
          background: getColor(),
          color: "white",
          padding: "8px 16px",
          borderRadius: "20px",
          display: "inline-block",
          marginTop: "12px",
          fontWeight: "bold"
        }}
      >
        {status}
      </span>
    </div>
  );
}

export default StatusCard;