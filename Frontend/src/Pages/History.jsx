// History.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination"; // Import Pagination component
import "./History.css";

function History() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:8080/history", { withCredentials: true })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      });
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(data.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white">
   <main className="history-container">
      <section className="history-header">
        <h2>Prediction History</h2>
        <p>All your previous AI test results and doctor feedback.</p>
      </section>

      <table className="history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Disease</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length === 0 ? (
            <tr>
              <td colSpan="3">No history found</td>
            </tr>
          ) : (
            currentRecords.map((value, index) => (
              <tr key={index}>
                <td>{new Date(value.createdAt).toLocaleDateString()}</td>
                <td>{value.Disease}</td>
                <td>
                  <span
                    className={`feedback-badge ${value.Disease === "Heart"
                        ? value.result.toLowerCase().includes("does not have")
                          ? "feedback-positive"
                          : value.result
                            .toLowerCase()
                            .includes("has exercise-induced angina")
                            ? "feedback-danger"
                            : "feedback-neutral"
                        : value.Disease === "Kidney"
                          ? value.result.toLowerCase().includes("not likely")
                            ? "feedback-positive"
                            : value.result
                              .toLowerCase()
                              .includes("likely to have kidney disease")
                              ? "feedback-warning"
                              : "feedback-warning"
                          : value.Disease === "Brain Tumor"
                            ? value.result.toLowerCase().includes("no tumor")
                              ? "feedback-positive"
                              : value.result.toLowerCase().includes("glioma")
                                ? "feedback-warning"
                                : value.result.toLowerCase().includes("meningioma")
                                  ? "feedback-danger"
                                  : value.result.toLowerCase().includes("pituitary")
                                    ? "feedback-info"
                                    : "feedback-neutral"
                            : value.Disease === "Pneumonia"
                              ? value.result.toLowerCase().includes("normal")
                                ? "feedback-positive"
                                : value.result.toLowerCase().includes("pneumonia")
                                  ? "feedback-danger"
                                  : "feedback-neutral"
                              : "feedback-neutral"
                      }`}
                  >
                    {value.result}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
</div>
   
  );
}

export default History;
