const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;
const url = process.env.SERVER_URL;
const accessSecret = process.env.ACCESS_SECRET;

module.exports = { url, port, host, accessSecret };
