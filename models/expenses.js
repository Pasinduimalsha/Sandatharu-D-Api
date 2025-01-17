const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  billingID: { type: String, required: true },
  name: { type: String, required: true },
  unitType: {
    type: String,
    required: false,
    enum: ['Count', 'Weight'], // Restrict unitType to 'count' or 'weight'
  },
  quantity: { type: Number, required: false }, // Only required for `count`
  quantityKg: { type: Number, required: false }, // Only required for `weight`
  quantityG: { type: Number, required: false }, // Only required for `weight`
  unitPrice: { type: Number, required: false },
  total: { type: Number},
  date: { type: Date, required: true},
  // totalWheight: { type: Number, required: true },
  
});

// Custom validation for conditional fields
expenseSchema.pre('validate', function (next) {
  if (this.unitType === 'Count') {
    if (this.quantityKg || this.quantityG) {
      return next(
        new Error(
          "Invalid data: 'quantityKg' and 'quantityG' should not be provided for 'unitType' of 'count'."
        )
      );
    }
    if (!this.quantity) {
      return next(new Error("Invalid data: 'quantity' is required for 'unitType' of 'count'."));
    }
  } else if (this.unitType === 'Weight') {
    if (this.quantity) {
      return next(
        new Error(
          "Invalid data: 'quantity' should not be provided for 'unitType' of 'weight'."
        )
      );
    }
    if (!this.quantityKg && !this.quantityG) {
      return next(
        new Error(
          "Invalid data: At least one of 'quantityKg' or 'quantityG' is required for 'unitType' of 'weight'."
        )
      );
    }
  }
  next();
});

module.exports = mongoose.model('Expense', expenseSchema);
 