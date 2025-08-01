const mongoose = require('mongoose');

const WaiterSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Waiter', WaiterSchema);