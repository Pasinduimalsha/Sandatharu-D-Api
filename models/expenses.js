const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  billingID: { type: String, required: true },
  name: { type: String, required: true },
  unitType: {
    type: String,
    required: true,
    enum: ['Count', 'Weight', 'Liter'],
  },
  quantity: { type: Number, required: false },
  quantityKg: { type: Number, required: false },
  quantityG: { type: Number, required: false },
  quantityL: { type: Number, required: false },
  quantityMl: { type: Number, required: false }, // Changed to camelCase to match client
  unitPrice: { type: Number, required: true },
  total: { type: Number, required: true  },
  date: { type: Date, required: true },  
});

// Custom validation for conditional fields
expenseSchema.pre('validate', function (next) {
  if (this.unitType === 'Count') {
    if (this.quantityKg || this.quantityG || this.quantityL || this.quantityMl) {
      return next(
        new Error(
          "Invalid data: Weight or Volume quantities should not be provided for 'unitType' of 'Count'."
        )
      ); 
    }
    if (!this.quantity) {
      return next(new Error("Invalid data: 'quantity' is required for 'unitType' of 'Count'."));
    }
  } else if (this.unitType === 'Weight') {
    if (this.quantity || this.quantityL || this.quantityMl) {
      return next(
        new Error(
          "Invalid data: Count or Volume quantities should not be provided for 'unitType' of 'Weight'."
        )
      );
    }
    if (!this.quantityKg && !this.quantityG) {
      return next(
        new Error(
          "Invalid data: At least one of 'quantityKg' or 'quantityG' is required for 'unitType' of 'Weight'."
        )
      );
    }
  } else if (this.unitType === 'Liter') {
    if (this.quantity || this.quantityKg || this.quantityG) {
      return next(
        new Error(
          "Invalid data: Count or Weight quantities should not be provided for 'unitType' of 'Liter'."
        )
      );
    }
    if (!this.quantityL && !this.quantityMl) {
      return next(
        new Error(
          "Invalid data: At least one of 'quantityL' or 'quantityMl' is required for 'unitType' of 'Liter'."
        )
      );
    }
  }
  next();
});

module.exports = mongoose.model('Expense', expenseSchema);