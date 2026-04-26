import { useState } from "react";
import metricsData from "./data/metrics";

function App() {
  const [developer, setDeveloper] = useState("");
  const [month, setMonth] = useState("");

  const selectedData = metricsData.find(
    (item) => item.developer === developer && item.month === month
  );

  // 🔹 Interpretation Logic
  let interpretation = "";
  let nextSteps = [];

  if (selectedData) {
    if (selectedData.pattern === "Healthy flow") {
      interpretation =
        "Your work is moving smoothly with good speed and quality.";
      nextSteps = [
        "Keep PR sizes small",
        "Help teammates by reviewing code",
      ];
    } else if (selectedData.pattern === "Quality watch") {
      interpretation =
        "You are shipping regularly, but bugs are escaping to production.";
      nextSteps = [
        "Add more test cases before merging",
        "Review the cause of recent bugs",
      ];
    } else if (selectedData.pattern === "Needs review") {
      interpretation =
        "Your work is taking longer than expected. There may be delays.";
      nextSteps = [
        "Break tasks into smaller parts",
        "Ask for help if blocked",
      ];
    }
  }

  // 🔹 Card style
  const cardStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "10px",
    width: "120px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Developer Productivity MVP</h1>

      {/* Developer Dropdown */}
      <h3>Select Developer:</h3>
      <select
        value={developer}
        onChange={(e) => setDeveloper(e.target.value)}
      >
        <option value="">-- Select --</option>
        <option value="Ava Chen">Ava Chen</option>
        <option value="Noah Patel">Noah Patel</option>
        <option value="Mia Lopez">Mia Lopez</option>
      </select>

      {/* Month Dropdown */}
      <h3>Select Month:</h3>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="">-- Select --</option>
        <option value="2026-03">March 2026</option>
        <option value="2026-04">April 2026</option>
      </select>

      <p>Selected Developer: {developer}</p>
      <p>Selected Month: {month}</p>

      {/* 🔹 Metrics Cards */}
      {selectedData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Metrics:</h3>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <div style={cardStyle}>
              <h4>Cycle Time</h4>
              <p>{selectedData.cycleTime} days</p>
            </div>

            <div style={cardStyle}>
              <h4>Lead Time</h4>
              <p>{selectedData.leadTime} days</p>
            </div>

            <div style={cardStyle}>
              <h4>Bug Rate</h4>
              <p>{selectedData.bugRate}</p>
            </div>

            <div style={cardStyle}>
              <h4>Deployments</h4>
              <p>{selectedData.deployments}</p>
            </div>

            <div style={cardStyle}>
              <h4>PR Throughput</h4>
              <p>{selectedData.prThroughput}</p>
            </div>
          </div>

          {/* Pattern with color */}
          <p style={{ marginTop: "10px" }}>
            Pattern:{" "}
            <span
              style={{
                color:
                  selectedData.pattern === "Healthy flow"
                    ? "green"
                    : selectedData.pattern === "Quality watch"
                    ? "orange"
                    : "red",
                fontWeight: "bold",
              }}
            >
              {selectedData.pattern}
            </span>
          </p>
        </div>
      )}

      {/* 🔹 Insight Section */}
      {selectedData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Insight:</h3>
          <p style={{ fontWeight: "bold" }}>{interpretation}</p>

          <h4>Next Steps:</h4>
          <ul>
            {nextSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;