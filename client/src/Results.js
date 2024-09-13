import React from "react";
import { useLocation } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const { userInfo, prediction } = location.state;

  const capitalizeWords = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", backgroundColor: "#ddd", height: "100vh" }}>
      <h1>Prediction Results</h1>
      <div style={{ margin: "20px 0" }}>
        <h2>Your Input:</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {Object.entries(userInfo).map(([key, value]) => (
            <li key={key}>
              <strong>{capitalizeWords(key.replace(/_/g, " "))}:</strong>{" "}
              {value}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>
          Predicted Diagnosis: {prediction === "B" ? "Benign" : "Malignant"}
        </h2>
      </div>
    </div>
  );
};

export default Results;
