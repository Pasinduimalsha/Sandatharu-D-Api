const Expense = require("../models/expenses");

// Create a new expense
const addExpense = async (req, res) => {

    console.log('Request Body:' ,req.body)
    const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required!' });
  }

  try {
   const newExpense = new Expense({
    billingID: req.body.billingID,
    name: req.body.name,
    unitType: req.body.unitType,
    quantity: req.body.quantity,
    quantityKg: req.body.quantityKg,
    quantityG: req.body.quantityG,
    unitPrice: req.body.unitPrice,
    total: req.body.total,
    date: req.body.date,
    // totalWheight: req.body.totalWheight,
   })

   await newExpense.save();

    res.status(201).json({ message: "Expense added successfully", newExpense });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Error adding expenses", error });
  }
};

// Get all expenses by billing ID in a specific order
const getExpensesByBillingID = async (req, res) => {
    try {
      const { billingID } = req.params;
  
      // Sort order: ascending by date, descending by total, etc.
      const sortOrder = { date: -1 }; // Sort by date in descending order
  
      const expenses = await Expense.aggregate([
        {
          $match: { billingID },
        },
        {
          $sort: sortOrder,
        },
        {
            $project: {
                id: 1,
                name: 1,
                quantity: 1,
                quantityKg: 1,
                quantityG: 1,
                unitPrice: 1,
                total: 1,
                date: 1,
                billingID: 1,
                unitType: 1,
                // titalWheight: 1,
              }
        }
      ]);
      res.status(200).json(expenses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching expenses", error });
    }
  };
  
// Fetch all billing IDs
const fetchBillingIDs = async (req, res) => {
  try {
    const billingIDs = await Expense.distinct('billingID');
    res.status(200).json(billingIDs);
  } catch (error) {
    console.error('Error fetching billing IDs:', error);
    res.status(500).json({ message: 'Server error while fetching billing IDs' });
  }
};

// Update an expense
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Expense updated successfully", updatedExpense });
  } catch (error) {
    res.status(400).json({ message: "Error updating expense", error });
  }
};
 
// Delete an expense
const deleteExpense = async (req, res) => {
    const expenseId = req.params.id;
  try {
    
    await Expense.findByIdAndDelete({ _id: expenseId });
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
};  


module.exports = {
    addExpense,
  getExpensesByBillingID,
  fetchBillingIDs,
  updateExpense,
  deleteExpense, 
};

  