const { connectdb } = require('../dbs/connectdb');

let fetch_user_data = async (req, res) => {
    try {
        if (!req.session?.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const db = await connectdb();
        const userId = req.session.user.id;

        const allData = await db.collection("Kidney_data_user").aggregate([
            { $match: { PatientId: userId } },
            { $addFields: { Disease: "Kidney" } },

            // Heart details
            {
                $unionWith: {
                    coll: "heart_data_user",
                    pipeline: [
                        { $match: { PatientId: userId } },
                        { $addFields: { Disease: "Heart" } }
                    ]
                }
            },

            // Brain Tumor details
            {
                $unionWith: {
                    coll: "brain_tumor_data_user",
                    pipeline: [
                        { $match: { PatientId: userId } },
                        { $addFields: { Disease: "Brain Tumor" } }
                    ]
                }
            },
            // pneumonia details
            {
                $unionWith: {
                    coll: "pneumonia_data_user",
                    pipeline: [
                        { $match: { PatientId: userId } },
                        { $addFields: { Disease: "Pneumonia" } }
                    ]
                }
            },

            { $sort: { createdAt: -1 } }
        ]).toArray();

        res.json({
            success: true,
            count: allData.length,
            data: allData
        });

    } catch (error) {
        console.error("Error fetching history:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

module.exports = { fetch_user_data };
