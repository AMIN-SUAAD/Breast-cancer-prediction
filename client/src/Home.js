import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userInfo, setUserInfo] = useState({});
  const [prediction, setPrediction] = useState("");
  const navigate = useNavigate();

  function handleBlur(e) {
    userInfo[e.target.name] = e.target.value;
    setUserInfo(userInfo);
  }

  function handleClick(e) {
    e.preventDefault();

    const url = "http://127.0.0.1:5000/predict_diagnosis";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        setPrediction(data.predicted_diagnosis);
        navigate("/results", { state: { userInfo, prediction: data.predicted_diagnosis } });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div
      style={{
        backgroundColor: "#ddd",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "150vh",
      }}
    >
      <form>
        <div>
          <h1 style={{ paddingBottom: "15px" }}>Breast Cancer Prediction</h1>
        </div>
        {[
          "Radius Mean",
          "Texture Mean",
          "Perimeter Mean",
          "Area Mean",
          "Smoothness Mean",
          "Compactness Mean",
          "Concavity Mean",
          "Concave Points Mean",
          "Symmetry Mean",
          "Fractal Dimension Mean",
          "Radius Se",
          "Texture Se",
          "Perimeter Se",
          "Area Se",
          "Smoothness Se",
          "Compactness Se",
          "Concavity Se",
          "Concave Points Se",
          "Symmetry Se",
          "Fractal Dimension Se",
          "Radius Worst",
          "Texture Worst",
          "Perimeter Worst",
          "Area Worst",
          "Smoothness Worst",
          "Compactness Worst",
          "Concavity Worst",
          "Concave Points Worst",
          "Symmetry Worst",
          "Fractal Dimension Worst",
        ].map((label, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
            }}
          >
            <label
              htmlFor={`input${index}`}
              style={{
                paddingRight: "10px",
              }}
            >
              {label}
            </label>
            <input
              id={`input${index}`}
              style={{
                fontSize: "18px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              onBlur={handleBlur}
              type="text"
              name={label.toLowerCase().replace(/ /g, "_")}
            />
          </div>
        ))}
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handleClick}
            style={{
              padding: "8px 20px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007BFF")
            }
          >
            Predict
          </button>
        </div>
      </form>
      {(prediction === "B" || prediction === "M") && (
        <p>
          Predicted diagnosis: {prediction === "B" ? "Benign" : "Malignant"}
        </p>
      )}
    </div>
  );
};

export default Home;
