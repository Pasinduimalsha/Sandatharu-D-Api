const Table = require('../models/tables');

exports.getTables = async (req, res) => {
  const tables = await Table.find();
  res.json(tables);
};