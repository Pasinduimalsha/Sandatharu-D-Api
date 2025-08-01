const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  item: String,
  portion: String,
  weight: Number,
  quantity: Number,
  price: Number,
  pricePerKg: Number,
  pricePerPortion: Number
});

const KOTSchema = new mongoose.Schema({
  kotID: { type: String, unique: true },
  table: String,
  date: String,
  time: String,
  pax: Number,
  waiter: String,
  items: [ItemSchema],
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  payment: { type: String, enum: ['pending', 'done'], default: 'pending' }
});

module.exports = mongoose.model('KOT', KOTSchema);