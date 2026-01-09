const axios = require('axios');
const { connectdb } = require('../dbs/connectdb');

let Heart_user = async (req, res) => {
    let db = await connectdb();
    let collection = db.collection("heart_data_user");

    try {

        if (!req.session.user) {
            return res.status(401).json({ message: "Unauthorized: User not logged in" });
        }
        
        let records = await collection.find({PatientId:req.session.user.id}).toArray();;
        console.log("User data:", records);

        res.status(200).json({
          success: true,
          message: "Data retrieved successfully.",
          data: records
        });
    } catch (error) {
        console.error(" Error in /Heart:", error.message);
        res.status(500).json({
            success: false,
            error: "Something went wrong. Try again.",
        });
    }
};

module.exports = {
    Heart_user
};
