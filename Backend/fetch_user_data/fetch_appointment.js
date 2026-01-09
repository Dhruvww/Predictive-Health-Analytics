const { connectdb } = require('../dbs/connectdb');

let fetch_appointment = async (req, res) => {
  let db = await connectdb();
  let collection = db.collection("appointment");

  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset to start of the day

    // Fetch only upcoming appointments for the logged-in user
    let records = await collection.find({
      PatientId: req.session.user.id,
      date: { $gte: today.toISOString().split("T")[0] } // assumes "date" is stored as YYYY-MM-DD string
    }).sort({ date: 1 }).toArray();

    console.log("Upcoming Appointments:", records);

    res.status(200).json({
      success: true,
      message: "Upcoming appointments retrieved successfully",
      data: records
    });
  } catch (error) {
    console.error("Error in /appointment:", error.message);
    res.status(500).json({
      success: false,
      error: "Something went wrong. Try again.",
    });
  }
};

module.exports = {
  fetch_appointment
};
