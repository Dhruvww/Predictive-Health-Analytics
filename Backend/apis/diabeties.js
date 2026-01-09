const { connectdb } = require("../dbs/connectdb");

let diabeties = async (req, res) => {
    let db = await connectdb();
    let collection = db.collection("diabeties");
    let {
        Diabetes,
    } = req.body;
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }
    if (!Diabetes) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    let user = {
        PatientId: req.session.user.id ,
        Diabetes: Diabetes,
        createdAt: new Date(),
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
    diabeties
}