const { connectdb } = require('../dbs/connectdb');

let doctor_data = async (req, res) => {
  let db = await connectdb();
  let collection = db.collection("doctor");

  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    
    let records = await collection.find({ PatientId: req.session.user.id }).toArray();
    console.log("User data:", records);

    
    res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: records
    });
  } catch (error) {
    console.error("Error in /doctor_data:", error.message);
    res.status(500).json({
      success: false,
      error: "Something went wrong. Try again.",
    });
  }
};

module.exports = {
  doctor_data
};
