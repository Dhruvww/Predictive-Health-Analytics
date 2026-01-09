import React from 'react';
import { useNavigate } from 'react-router-dom';

function Predict() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedModel = e.target.model_type.value;

    switch (selectedModel) {
      case 'heart':
        navigate('/heart');
        break;
      case 'kidney':
        navigate('/kidney');
        break;
      case 'pneumonia':
        navigate('/pneumonia');
        break;
      case 'brain_tumor':
        navigate('/brain_tumor');
        break;
      default:
        alert('Please select a valid model');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white">
    <div className="prediction-container" >
      <h2 className="prediction-title">Run a New Prediction</h2>
      <form onSubmit={handleSubmit} className="prediction-form">
        <label>Select Prediction Type:</label>
        <select name="model_type" required>
          <option value="">Choose Model</option>
          <option value="heart">Heart Disease</option>
          <option value="kidney">Kidney Disease</option>
          <option value="pneumonia">Pneumonia</option>
          <option value="brain_tumor">Brain Tumor</option>
        </select>
        <button type="submit" className="cta-btn">Select Model</button>
      </form>
    </div>
    </div>
  );
}

export default Predict;
