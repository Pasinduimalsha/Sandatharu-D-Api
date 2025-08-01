// expensesRoute.js
const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Route to create a new expense
router.post("/signup", authController.signUp);
router.post("/login", authController.login );
router.post("/logout", authController.logout );

module.exports = router;


     