// api/index.js

const express = require('express');
const cors = require('cors');
const server = require("./config/server");
const db = require("./config/db"); 
const bodyParser = require("body-parser");
const expensesRoute = require("./routes/expensesRouter");
const authRoute = require("./routes/authRouter");

const app = express();

const whitelist = [];
const corsOptions = {
    origin: function (origin, callback) {
        console.log("New req." + origin);
        if (1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }, 
    credentials: true,
};
  
// Middleware
app.use(cors(corsOptions)); 
app.use(express.json());
app.use(bodyParser.json()); //to pase json data
app.use(express.urlencoded({ extended: true }));

// Use the expenses routes
app.use("/expenses", expensesRoute);
app.use("/auth", authRoute);

app.use("/public", express.static(__dirname + "/public"));

// Sample route
app.all("/api", (req, res) => {
    res.status(200).send("API END POINT");
});

app.listen(server.port, () => {
    console.log(`Server listening on ${server.port}`);
});

db(); 
  
