const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['cabana', 'room'] }
});

module.exports = mongoose.model('Table', TableSchema);