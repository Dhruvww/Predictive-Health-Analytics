import React, { useState, useEffect } from "react";
import axios from "axios";
import './About.css';

function Appointments() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]); // store fetched appointments
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Fetch doctors
  useEffect(() => {
    axios
      .get("http://localhost:8080/doctor_data", { withCredentials: true })
      .then((res) => {
        if (res.data && Array.isArray(res.data.data)) {
          setDoctors(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
      });
  }, []);

  // Fetch existing appointments
  useEffect(() => {
    axios
      .get("http://localhost:8080/fetch_appointment", { withCredentials: true })
      .then((res) => {
        if (res.data && Array.isArray(res.data.data)) {
          setAppointments(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
      });
  }, []);

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/appointment",
        {
          doctor: selectedDoctor,
          date,
          time,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("✅ Appointment booked successfully!");
        // Refresh appointments after booking
        const updatedAppointments = await axios.get("http://localhost:8080/fetch_appointment", {
          withCredentials: true,
        });
        if (updatedAppointments.data && Array.isArray(updatedAppointments.data.data)) {
          setAppointments(updatedAppointments.data.data);
        }
      } else {
        alert("❌ Failed to book appointment");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white">
      <main className="appointments-container">
        <h2>Your Appointments</h2>

        {/* Appointment Table */}
        <section className="appointment-table-section">
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <table border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt, index) => (
                  <tr key={index}>
                    <td>{appt.doctor}</td>
                    <td>{appt.date}</td>
                    <td>{appt.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Book New Appointment */}
        <section className="book-appointment-section">
          <h3>Book New Appointment</h3>
          <form className="appointment-form" onSubmit={handleSubmit}>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <label>Time:</label>
            <input
              type="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />

            <label>Doctor:</label>
            <select
              name="doctor"
              value={selectedDoctor}
              onChange={handleDoctorChange}
              required
            >
              <option value="">-- Select Doctor --</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc.name}>
                  {doc.name}
                </option>
              ))}
            </select>

            <button type="submit" className="cta-btn">
              Book Appointment
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Appointments;
