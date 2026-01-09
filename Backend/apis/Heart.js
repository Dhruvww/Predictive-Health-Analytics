const { connectdb } = require("../dbs/connectdb");

let Heart = async(req,res)=>{
    let db = await connectdb();
    let collection = db.collection("heart");
    let {
        PatientId,
        Diabetes,
    } = req.body;
    
    if(!Diabetes){
        return res.status(400).json({ message: "Missing required fields" });
    }
    
    let user = {
        PatientId : PatientId,
        Diabetes : Diabetes,
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

module.exports={
    Heart
}