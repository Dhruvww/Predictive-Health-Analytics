import React, { useState } from "react";
import axios from "axios";
import "./ImagePredict.css";

function Pneumonia() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("image", selectedFile); // name must match multer config in backend

    try {
      const res = await axios.post("http://localhost:8080/pneumonia", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true // if using session auth
      });

      if (res.data.success) {
        setResult(res.data.results);
      } else {
        setError(res.data.error || "Unexpected error");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while predicting.");
    }

    setLoading(false);
  };

  return (
    <div className="image-upload-container">
      <h2>Pneumonia Prediction</h2>
      <form onSubmit={handleSubmit}>
        <label>Select Chest X-ray Image:</label>
        <input type="file" onChange={handleFileChange} accept="image/*" required />
        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result-section">
          <h3>Prediction Result:</h3>
          {result.map((r, index) => (
            <div key={index}>
              <p><strong>Prediction:</strong> {r.prediction}</p>
              {/* <p><strong>Confidence:</strong> {(r.confidence * 100).toFixed(2)}%</p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Pneumonia;
