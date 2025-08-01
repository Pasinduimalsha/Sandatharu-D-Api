const express = require('express');
const router = express.Router();
const WaiterController = require('../controllers/waiterController');

router.get('/', WaiterController.getWaiters);

module.exports = router;