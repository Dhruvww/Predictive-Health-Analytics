const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const multer = require("multer");
const { connectdb } = require("../dbs/connectdb");

const upload = multer({ dest: "uploads/" });

let BrainTumor = async (req, res) => {
    let db = await connectdb();
    let collection = db.collection("brain_tumor_data_user");

    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const imagePath = req.file.path;

        // Create FormData for Django
        const formData = new FormData();
        formData.append("image_file", fs.createReadStream(imagePath), {
            filename: req.file.originalname, // important for Django
            contentType: req.file.mimetype
        });

        // Send to Django
        const djangoResponse = await axios.post(
            "http://127.0.0.1:8000/brain", // ensure trailing slash matches urls.py
            formData,
            {
                headers: {
                    ...formData.getHeaders()
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );  

        const { filename, predicted_class, confidence } = djangoResponse.data.results.at(-1);
        console.log(filename, predicted_class, confidence);
        // Insert to DB
        const dbdata = {
            PatientId: req.session.user.id,
            imageName: req.file.originalname,
            confidence: confidence,
            result: predicted_class,
            createdAt: new Date(),
            Disease: "Brain Tumor"
        };
        const insert = await collection.insertOne(dbdata);

        fs.unlinkSync(imagePath);

        if (insert.acknowledged) {
            res.status(200).json({
                success: true,
                message: "Data added successfully and prediction received.",
                resultMessage: predicted_class,
                confidence: confidence
            });
        }
    } catch (error) {
        console.error("Error in /BrainTumor:", error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: "Something went wrong. Try again.",
        });
    }
};

module.exports = {
    BrainTumor,
    upload
};
