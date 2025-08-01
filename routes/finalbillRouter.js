const express = require('express');
const router = express.Router();
const FinalBillController = require('../controllers/finalBillController');

router.post('/', FinalBillController.createFinalBill);
router.get('/', FinalBillController.getFinalBills);

module.exports = router;