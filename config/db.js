
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

// mongoUrl = process.env.SEVER_URL;

// const mongoUrl = "mongodb://localhost:27017/sandatharu";
 
const db = async () => { 
    try {
        mongoose.set("strictQuery", false);

        await mongoose.connect(process.env.SEVER_URL);
        console.log(process.env.SEVER_URL);
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};  

module.exports = db;
 