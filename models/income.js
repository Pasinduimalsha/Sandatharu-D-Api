const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
  incomeID: String,
  source: String,
  description: String,
  amount: Number,
  date: Date,
  details: Object
});

module.exports = mongoose.model('Income', IncomeSchema);