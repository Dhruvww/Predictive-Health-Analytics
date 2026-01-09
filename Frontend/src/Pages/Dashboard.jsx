import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHeartbeat,
  FaCalendarAlt,
  FaHistory,
  FaUserMd,
} from "react-icons/fa";

function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user", { withCredentials: true })
      .then((res) => {
        setUsername(res.data.username);
      })
      .catch((err) => {
        console.log("User not logged in or error:", err);
      });
  }, []);

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-indigo-50 via-blue-100 to-white flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <main className="w-full max-w-7xl mx-auto py-12">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10 animate-fade-in">
          👋 Welcome,{" "}
          <span className="text-indigo-600">
            {username ? username : "Guest"}
          </span>
          !
        </h2>

        {/* Dashboard Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Prediction Models */}
          <div className="dash-card p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300">
            <div className="flex items-center space-x-4">
              <FaHeartbeat className="text-4xl text-red-500 animate-pulse" />
              <h3 className="text-xl font-bold text-gray-800">
                Prediction Models
              </h3>
            </div>
            <p className="text-gray-600 mt-3">
              Heart, Kidney, Pneumonia, Brain Tumor
            </p>
            <Link
              to="/Predict"
              className="inline-block mt-5 px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition"
            >
              Make Prediction
            </Link>
          </div>

          {/* Appointments */}
          <div className="dash-card p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300">
            <div className="flex items-center space-x-4">
              <FaCalendarAlt className="text-4xl text-blue-500 animate-bounce" />
              <h3 className="text-xl font-bold text-gray-800">
                Your Appointments
              </h3>
            </div>
            <p className="text-gray-600 mt-3">
              Next: <b>30 July 2025</b> <br /> Consult: Dr. Mehta
            </p>
            <Link
              to="/Appointments"
              className="inline-block mt-5 px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition"
            >
              See All
            </Link>
          </div>

          {/* Prediction History */}
          <div className="dash-card p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300">
            <div className="flex items-center space-x-4">
              <FaHistory className="text-4xl text-green-500 animate-spin-slow" />
              <h3 className="text-xl font-bold text-gray-800">
                Prediction History
              </h3>
            </div>
            <p className="text-gray-600 mt-3">
              See your recent tests and model results.
            </p>
            <Link
              to="/History"
              className="inline-block mt-5 px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition"
            >
              View History
            </Link>
          </div>

          {/* Consult a Doctor */}
          <div className="dash-card p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300">
            <div className="flex items-center space-x-4">
              <FaUserMd className="text-4xl text-purple-500 animate-pulse" />
              <h3 className="text-xl font-bold text-gray-800">
                Consult a Doctor
              </h3>
            </div>
            <p className="text-gray-600 mt-3">
              Get in touch with a specialist for your condition.
            </p>
            <Link
              to="/Doctor"
              className="inline-block mt-5 px-5 py-2 text-sm font-medium text-white bg-purple-600 rounded-full hover:bg-purple-700 transition"
            >
              Contact Now
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
