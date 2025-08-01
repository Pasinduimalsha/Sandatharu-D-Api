const KOT = require('../models/KOT');

createKOT = async (req, res) => {

    console.log(req.body);

  try {
    const lastKOT = await KOT.findOne().sort({ kotID: -1 }).lean();
    let nextNumber = 1;
    if (lastKOT && lastKOT.kotID) {
      const num = parseInt(lastKOT.kotID.replace('KOT', ''), 10);
      if (!isNaN(num)) nextNumber = num + 1;
    }
    const kotID = `KOT${nextNumber.toString().padStart(3, '0')}`;

    const kotData = { ...req.body, kotID };

    const kot = new KOT(kotData);
    await kot.save();
    res.status(201).json(kot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

addItemToKOT = async (req, res) => {
  try {
    const kot = await KOT.findById(req.params.id);
    kot.items.push(req.body);
    await kot.save();
    res.json(kot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

removeItemFromKOT = async (req, res) => {
  try {
    const kot = await KOT.findById(req.params.id);
    kot.items.id(req.body.itemId).remove();
    await kot.save();
    res.json(kot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

getKOTs = async (req, res) => {
  const { table, status } = req.query;
  const filter = {};
  if (table) filter.table = table;
  if (status) filter.status = status;
  const kots = await KOT.find(filter).sort({ date: -1, time: -1 });
  res.json(kots);
};



updateKOTStatus = async (req, res) => {
  try {
    const kot = await KOT.findByIdAndUpdate(req.params.id, { status: req.body.status , payment: req.body.payment}, { new: true });
    res.json(kot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
 


module.exports = {
  createKOT,
  addItemToKOT,
  removeItemFromKOT,
  getKOTs,
  updateKOTStatus,
};

