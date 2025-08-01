const mongoose = require('mongoose');

const FinalBillSchema = new mongoose.Schema({
  table: String,
  invoiceNo: String,
  customerName: String,
  address: String,
  date: String,
  items: [{
    item: String,
    portion: String,
    weight: Number,
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number
  }],
  subtotal: Number,
  serviceCharge: Number,
  discount: Number,
  total: Number,
  amountPaid: Number,
  paymentMethod: String,
  balance: Number,
  status: { type: String, enum: ['income', 'complete'], default: 'income' }
});

module.exports = mongoose.model('FinalBill', FinalBillSchema);