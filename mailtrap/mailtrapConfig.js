const { MailtrapClient } = require("mailtrap");
const dotenv = require("dotenv");


dotenv.config({ path: ".env" });

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

const mailtrapClient = new MailtrapClient({
    endpoint: ENDPOINT,
    token: TOKEN,
});

 const sender = {
  email: "mailtrap@demomailtrap.com ",
  name: "Mailtrap Test",
};

module.exports = {
  mailtrapClient,
  sender,
};


// const recipients = [
//   {
//     email: "pasinduimalsha2001@gmail.com",
//   }
// ];

// client
//   .send({ 
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
  