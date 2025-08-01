const Income = require('../models/income');

exports.getAllIncomes = async (req, res) => {
  const incomes = await Income.find().sort({ date: -1 });
  res.json(incomes);
};

exports.createIncome = async (req, res) => {
  try {
    const income = new Income(req.body);
    await income.save();
    res.status(201).json(income);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};