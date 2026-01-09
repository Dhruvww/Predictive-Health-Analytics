const { connectdb } = require("../dbs/connectdb");

let doctor = async(req,res)=>{
    let db = await connectdb();
    let collection = db.collection("doctor");
    console.log("SAHIL PATEL");
    
    let {
        name,
        specialty,
        phone,
        email,
        timing
    } = req.body;
    console.log(name);
    if (!req.session.user) {
            return res.status(401).json({ message: "Unauthorized: User not logged in" });
        }
    if(!name){
        return res.status(400).json({ message: "Missing required fields" });
    }
    
    let user = {
        PatientId: req.session.user.id,
        name : name,
        specialty : specialty,
        phone : phone,
        email : email,
        timing : timing,
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
    doctor

}