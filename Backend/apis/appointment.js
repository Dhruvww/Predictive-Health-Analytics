const { connectdb } = require("../dbs/connectdb");

let appointment = async(req,res)=>{
    let db = await connectdb();
    let collection = db.collection("appointment");
    console.log("SAHIL PATEL");
    
    let {
        date,
        time,
        doctor,
    } = req.body;
    
    if (!req.session.user) {
            return res.status(401).json({ message: "Unauthorized: User not logged in" });
        }
    
    let user = {
        PatientId: req.session.user.id,
        date : date,
        time : time,
        doctor : doctor,
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
    appointment

}


