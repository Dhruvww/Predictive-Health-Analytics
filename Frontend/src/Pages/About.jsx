import React from 'react';
import './About.css';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white"> 
     
      <header className="about-header">
        <h1>About HealthAI</h1>
        <p>Your AI-powered companion for early health detection and personalized care.</p>
      </header>

      <div className="about-content">
        <div className="about-section">
          <h3>💡 What We Do</h3>
          <p>
            HealthAI uses machine learning and deep learning models to predict diseases such as heart conditions,
            kidney disease, pneumonia, and brain tumors — all with just a few clicks.
          </p>
        </div>

        <div className="about-section">
          <h3>🔒 Your Data is Safe</h3>
          <p>
            All health data is encrypted and processed securely. We do not store personal health records without
            your consent.
          </p>
        </div>

        <div className="about-section">
          <h3>🚀 Why Choose Us?</h3>
          <ul>
            <li> Fast and accurate predictions</li>
            <li> Easy-to-use interface</li>
            <li> Built for doctors, patients, and researchers</li>
          </ul>
        </div>

        <div className="about-section">
          <h3>🧠 Technologies We Use</h3>
          <p>
            Our models are powered by cutting-edge technologies like Python, TensorFlow, ReactJS, Node.js, and MongoDB.
          </p>
        </div>

        <div className="team-section">
  <h2>👩‍⚕️ Meet Our Team</h2>
  <div className="team-grid">
    <div className="team-member">
      <img src="/images/member1.jpg" alt="Team Member 1" />
      <h4>Dhruv Patel</h4>
      <p>Frontend Developer</p>
    </div>
    <div className="team-member">
      <img src="/images/member2.jpg" alt="Team Member 2" />
      <h4>Sahil Patel`</h4>
      <p>ML Engineer</p>
    </div>
    <div className="team-member">
      <img src="/images/member3.jpg" alt="Team Member 3" />
      <h4>Arjun Rajput</h4>
      <p>Backend Developer</p>
    </div>
  </div>
</div>

      </div>
      

      <footer>
        &copy; 2025 HealthAI Center — Empowering Preventive Healthcare
      </footer>
    </div>
  );
}

export default About;
