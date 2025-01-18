
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// dotenv.config({ path: ".env" });


let mongoUrl = process.env.SERVER_URL;

 
const db = async () => { 
    try {
        mongoose.set("strictQuery", false);

        await mongoose.connect(mongoUrl);
        console.log(mongoUrl);
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};  

module.exports = db;
  