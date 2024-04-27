const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDB(){
    try {
        await mongoose.connect(process.env.server_URL);
        console.log("Server connected to DB succesfully");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    
}

module.exports={
    connectToDB
}