const { connectdb } = require("../dbs/connectdb");

let bp = async (req, res) => {
    let db = await connectdb();
    let collection = db.collection("Blood_Pressure");
    let {
        Blood_Pressure,
    } = req.body;
    console.log(Blood_Pressure);
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }
    if (!Blood_Pressure) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    let user = {
        PatientId: req.session.user.id,
        Blood_Pressure: Blood_Pressure,
        createdAt: new Date()
    }
    let insert = await collection.insertOne(user);

    if (insert.acknowledged) {
        res.status(201).json({
            success: true,
            message: "data added succuessfully",
            insert
        })
    }
    else {
        res.status(400).json({
            success: false,
            message: "internal server error",
        })
    }
}

module.exports = {
    bp
}