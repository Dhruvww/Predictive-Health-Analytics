import React, { useEffect, useState } from "react";

function DoctorCard({ doc }) {
  const imgSrc =
    doc.img?.trim() ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=random`;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center space-y-4 max-w-sm mx-auto hover:shadow-xl transition-shadow">
      <img
        src={imgSrc}
        alt={doc.name}
        className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
      />
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900">{doc.name}</h3>
        <p className="text-indigo-600 font-medium mb-2">{doc.specialty}</p>
        <p className="text-gray-600">
          <span className="font-semibold">Email:</span> {doc.email}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Phone:</span> {doc.phone || "N/A"}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Timing:</span> {doc.timing || "N/A"}
        </p>
      </div>
    </div>
  );
}

export default function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "",
    email: "",
    phone: "",
    timing: "",
    img: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await fetch("http://localhost:8080/doctor_data", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setDoctors(data.data);
      } else if (Array.isArray(data)) {
        setDoctors(data);
      } else {
        setDoctors([]);
      }
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setDoctors([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((d) => ({ ...d, [name]: value }));
  };

  const handleAddDoctor = async () => {
    const { name, specialty, email } = newDoctor;
    if (!name.trim() || !specialty.trim() || !email.trim()) {
      alert("Please fill name, specialty, and email.");
      return;
    }
    try {
      await fetch("http://localhost:8080/doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newDoctor),
      });
      await fetchDoctors();
      setNewDoctor({
        name: "",
        specialty: "",
        email: "",
        phone: "",
        timing: "",
        img: "",
      });
    } catch (err) {
      console.error("Error adding doctor:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white flex flex-col items-center px-6 py-12">
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-10">
        Consult Our Doctors
      </h2>

      {/* Doctors Grid */}
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-7xl mb-12">
        {doctors.length > 0 ? (
          doctors.map((doc, i) => (
            <DoctorCard key={`${doc.email}-${i}`} doc={doc} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No doctors found.
          </p>
        )}
      </div>

      {/* Add Doctor Form */}
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Add New Doctor</h3>
        <div className="space-y-4">
          {[
            { name: "name", label: "Name", type: "text" },
            { name: "specialty", label: "Specialty", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "timing", label: "Timing (e.g., Mon–Fri | 9am–1pm)", type: "text" },
            { name: "img", label: "Image URL (optional)", type: "url" },
          ].map(({ name, label, type }) => (
            <input
              key={name}
              name={name}
              type={type}
              placeholder={label}
              value={newDoctor[name]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}
          <button
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            onClick={handleAddDoctor}
          >
            Add Doctor
          </button>
        </div>
      </div>
    </div>
  );
}
