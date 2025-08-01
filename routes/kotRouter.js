const express = require('express');
const router = express.Router();
const KOTController = require('../controllers/kotController');

router.post('/', KOTController.createKOT);
router.post('/:id/item', KOTController.addItemToKOT);
router.delete('/:id/item', KOTController.removeItemFromKOT);
router.get('/', KOTController.getKOTs);
router.patch('/:id/status', KOTController.updateKOTStatus);


module.exports = router;