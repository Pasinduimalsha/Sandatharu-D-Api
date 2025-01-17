const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const host = process.env.MONGO_HOST;
const port = process.env.SERVER_PORT;
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;


module.exports = { username, password,port, host };
 