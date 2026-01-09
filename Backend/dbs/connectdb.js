let {MongoClient} = require("mongodb");

require("dotenv").config();

let connectdb = async(req,res) =>{
    let url = process.env.URL;
    let client = await MongoClient.connect(url);
    let db = client.db("LDRP");
    return db;
}

module.exports={
    connectdb
}