
const mongoose = require("mongoose");
const server = require("../config/server");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });


mongoUrl = process.env.SEVER_URL;

 
const db = async () => { 
    try {
        mongoose.set("strictQuery", false);

        await mongoose.connect(mongoUrl);
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}; 

module.exports = db;
