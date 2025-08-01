const FinalBill = require('../models/finalBill');

exports.createFinalBill = async (req, res) => {
  try {
    const bill = new FinalBill(req.body);
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getFinalBills = async (req, res) => {
  const { table, status } = req.query;
  const filter = {};
  if (table) filter.table = table;
  if (status) filter.status = status;
  const bills = await FinalBill.find(filter);
  res.json(bills);
};

