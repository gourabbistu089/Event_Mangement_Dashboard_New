const mongoose =require("mongoose")
// const register =require("../init/dbInit.js")

exports.dbConnection=async()=>{
    try{
        await mongoose.connect(`${process.env.CLUSTER_URL}`);
        console.log("Database connected")
    }
    catch(err){
        console.log("DB Error", err);
    }
}
// register();
// exports.dbConnection;