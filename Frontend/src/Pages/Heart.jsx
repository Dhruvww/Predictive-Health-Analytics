import React, { useState } from "react";
import "./Heart.css";
import axios from "axios";

function Heart() {
  let [result, Setresult] = useState(null);
  let [data, setData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Setresult(null);

    try {
      const res = await axios.post(
        "http://localhost:8080/Heart",
        data,
        { withCredentials: true }
      );
      Setresult(res.data.resultMessage);
      console.log(res.data.resultMessage);
    } catch (err) {
      console.log("Something went wrong !!!", err);
    }
  };

  return (
    <div className="heart-container">
      <div className="form-wrapper">
        <h3>Heart Disease Prediction</h3>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-column">
            <input
              type="number"
              name="age"
              value={data.age}
              placeholder="Age"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="sex"
              value={data.sex}
              placeholder="Sex (1=Male, 0=Female)"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="cp"
              value={data.cp}
              placeholder="Chest Pain Type (0-3)"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="trestbps"
              value={data.trestbps}
              placeholder="Resting Blood Pressure"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="chol"
              value={data.chol}
              placeholder="Cholesterol"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="fbs"
              value={data.fbs}
              placeholder="Fasting Blood Sugar (>120 = 1)"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="restecg"
              value={data.restecg}
              placeholder="Rest ECG (0-2)"
              required
              onChange={handleChange}
            />
          </div>

          <div className="form-column">
            <input
              type="number"
              name="thalach"
              value={data.thalach}
              placeholder="Max Heart Rate"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="exang"
              value={data.exang}
              placeholder="Exercise Induced Angina (0/1)"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              step="any"
              name="oldpeak"
              value={data.oldpeak}
              placeholder="Oldpeak"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="slope"
              value={data.slope}
              placeholder="Slope (0-2)"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="ca"
              value={data.ca}
              placeholder="Major Vessels (0-3)"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="thal"
              value={data.thal}
              placeholder="Thal (0=normal,1=fixed,2=reversible)"
              required
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-btn">
            Predict
          </button>
        </form>

        {result && (
          <div className="result-box">
            <h4>Prediction Result:</h4>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Heart;
