// expensesRoute.js
const express = require("express");
const expensesController = require("../controllers/expensesController");

const router = express.Router();

// Route to create a new expense
router.post("/add", expensesController.addExpense );

// Route to get expenses by billing ID
router.get("/get/:billingID", expensesController.getExpensesByBillingID);

// Route to get all billingIDs
router.get('/billing-ids', expensesController.fetchBillingIDs);

// Route to update an expense
router.put("/:id", expensesController.updateExpense);

// Route to delete an expense
router.delete("/delete/:id", expensesController.deleteExpense);

module.exports = router;

