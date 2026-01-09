import React, { useState } from "react";
import "./Kidney.css"; 
import axios from "axios";

function Kidney() {
  let [result, Setresult] = useState(null);
  let [data, setData] = useState({
    age: "",
    bp: "",
    sg: "",
    al: "",
    su: "",
    rbc: "",
    pc: "",
    pcc: "",
    ba: "",
    bgr: "",
    bu: "",
    sc: "",
    sod: "",
    pot: "",
    hemo: "",
    pcv: "",
    wc: "",
    rc: "",
    htn: "",
    dm: "",
    cad: "",
    appet: "",
    pe: "",
    ane: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Setresult(null);

    try {
      const res = await axios.post(
        "http://localhost:8080/kidney",
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
    <div className="kidney-container">
      <div className="form-wrapper">
        <h3>Kidney Disease Prediction</h3>
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
              name="bp"
              value={data.bp}
              placeholder="Blood Pressure"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              step="any"
              name="sg"
              value={data.sg}
              placeholder="Specific Gravity"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="al"
              value={data.al}
              placeholder="Albumin"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="su"
              value={data.su}
              placeholder="Sugar"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="rbc"
              value={data.rbc}
              placeholder="Red Blood Cells (0=Normal, 1=Abnormal)"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="pc"
              value={data.pc}
              placeholder="Pus Cell (0=Normal, 1=Abnormal)"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="pcc"
              value={data.pcc}
              placeholder="Pus Cell Clumps (0=Not Present, 1=Present)"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="ba"
              value={data.ba}
              placeholder="Bacteria (0=Not Present, 1=Present)"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="bgr"
              value={data.bgr}
              placeholder="Blood Glucose Random"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="bu"
              value={data.bu}
              placeholder="Blood Urea"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              step="any"
              name="sc"
              value={data.sc}
              placeholder="Serum Creatinine"
              required
              onChange={handleChange}
            />
          </div>

          <div className="form-column">
            <input
              type="number"
              name="sod"
              value={data.sod}
              placeholder="Sodium"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              step="any"
              name="pot"
              value={data.pot}
              placeholder="Potassium"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              step="any"
              name="hemo"
              value={data.hemo}
              placeholder="Hemoglobin"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="pcv"
              value={data.pcv}
              placeholder="Packed Cell Volume"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="wc"
              value={data.wc}
              placeholder="White Blood Cell Count"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              step="any"
              name="rc"
              value={data.rc}
              placeholder="Red Blood Cell Count"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="htn"
              value={data.htn}
              placeholder="Hypertension (0=No, 1=Yes)"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="dm"
              value={data.dm}
              placeholder="Diabetes Mellitus (0=No, 1=Yes)"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="cad"
              value={data.cad}
              placeholder="Coronary Artery Disease (0=No, 1=Yes)"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="appet"
              value={data.appet}
              placeholder="Appetite (0=Good, 1=Poor)"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="pe"
              value={data.pe}
              placeholder="Pedal Edema (0=No, 1=Yes)"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="ane"
              value={data.ane}
              placeholder="Anemia (0=No, 1=Yes)"
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

export default Kidney;
