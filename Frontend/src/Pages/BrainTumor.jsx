import { useState } from "react";
import './ImagePredict.css';

function BrainTumor() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image_file", file);

    try {
      const res = await fetch("http://localhost:8080/brain_tumor", {
        method: "POST",
        body: formData,
        credentials: "include" // if session auth needed
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="image-upload-container">
      <h2>Brain Tumor Prediction</h2>
      <form onSubmit={handleSubmit}>
        <label>Select Brain MRI Image:</label>
        <input type="file" name="image_file" accept="image/*" onChange={handleFileChange} required />
        <button type="submit">Predict</button>
      </form>

      {result && (
        <div className="prediction-result">
          <h3>Prediction Result:</h3>
          <p style={{ color: "green", fontWeight: "bold", fontSize: "18px" }}>
            {result.resultMessage} ({result.confidence})
          </p>
        </div>
      )}

    </div>
  );
}

export default BrainTumor;
