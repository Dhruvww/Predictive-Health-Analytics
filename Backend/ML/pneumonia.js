const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const multer = require("multer");
const { connectdb } = require("../dbs/connectdb");

const upload = multer({ dest: "uploads/" });

let Pneumonia = async (req, res) => {
    let db = await connectdb();
    let collection = db.collection("pneumonia_data_user");

    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Prepare FormData for Django
        const formData = new FormData();
        formData.append("image", fs.createReadStream(req.file.path), {
            filename: req.file.originalname,
            contentType: req.file.mimetype
        });

        // Send to Django backend
        const djangoResponse = await axios.post(
            "http://127.0.0.1:8000/pneumonia",
            formData,
            {
                headers: {
                    ...formData.getHeaders()
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );

        const { results } = djangoResponse.data;

        // Save results in MongoDB
        const dbInsertData = results.map(r => ({
            // Uncomment when using authentication
            PatientId: req.session.user?.id,
            imageName: r.filename,
            confidence: r.confidence,
            result: r.prediction,
            createdAt: new Date(),
            Disease: "Pneumonia"
        }));

        await collection.insertMany(dbInsertData);

        // Delete temp uploaded file
        fs.unlinkSync(req.file.path);

        res.status(200).json({
            success: true,
            message: "Data added successfully and prediction received.",
            results
        });

    } catch (error) {
        console.error("Error in /Pneumonia:", error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: "Something went wrong. Try again."
        });
    }
};

module.exports = {
    Pneumonia,
    upload
};
