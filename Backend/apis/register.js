const { connectdb } = require("../dbs/connectdb");
const bcrypt = require('bcrypt');

let register = async(req,res)=>{
    let db = await connectdb();
    let collection = db.collection("user");
    let {
        name,
        email,
        username,
        password,
        cpassword
    } = req.body;
    
    
    if(!name || !email || !username || !password || !cpassword){
        return res.status(400).json({ message: "Missing required fields" });
    }
    if (password !== cpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let user = {
        name : name,
        email : email,
        username : username,
        password : hashedPassword,
        // cpassword : cpassword,
        createdAt : new Date()
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
    register
}