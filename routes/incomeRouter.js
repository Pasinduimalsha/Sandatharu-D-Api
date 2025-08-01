const express = require('express');
const router = express.Router();
const IncomeController = require('../controllers/IncomeController');

router.get('/all', IncomeController.getAllIncomes);
router.post('/', IncomeController.createIncome);

module.exports = router;