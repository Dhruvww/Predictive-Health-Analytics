const axios = require('axios');
const { connectdb } = require('../dbs/connectdb');

let Heart = async (req, res) => {
    let db = await connectdb();
    let collection = db.collection("heart_data_user");

    try {
        const {
            age,
            sex,
            cp,
            trestbps,
            chol,
            fbs,
            restecg,
            thalach,
            exang,
            oldpeak,
            slope,
            ca,
            thal
        } = req.body;

        const inputData = {
            age,
            sex,
            cp,
            trestbps,
            chol,
            fbs,
            restecg,
            thalach,
            exang,
            oldpeak,
            slope,
            ca,
            thal
        };
        console.log(inputData);
        
        if (!req.session.user) {
            return res.status(401).json({ message: "Unauthorized: User not logged in" });
        }
        const djangoResponse = await axios.post(
            'http://127.0.0.1:8000/api/heart-predict/',
            inputData
        );

        const prediction = djangoResponse.data.prediction;
        const message = djangoResponse.data.message;
        
        let dbdata = {
            PatientId: req.session.user.id,
            age: age,
            sex: sex,
            cp: cp,
            trestbps: trestbps,
            chol: chol,
            fbs: fbs,
            restecg: restecg,
            thalach: thalach,
            exang: exang,
            oldpeak: oldpeak,
            slope: slope,
            ca: ca,
            thal: thal,
            result: message,
            createdAt: new Date(),
            Disease: "Heart"
        }
        console.log("Before insert:", dbdata);
        let insert = await collection.insertOne(dbdata);
        console.log("Insert result:", insert);
        if (insert.acknowledged) {
            res.status(200).json({
                success: true,
                message: "Data added successfully and prediction received.",
                prediction,
                resultMessage: message
            });
        
        
        console.log(prediction);
        console.log(message);
        }
    } catch (error) {
        console.error(" Error in /Heart:", error.message);
        res.status(500).json({
            success: false,
            error: "Something went wrong. Try again.",
        });
    }
};

module.exports = {
    Heart
};
