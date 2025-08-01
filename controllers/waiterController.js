const Waiter = require('../models/Waiter');

exports.getWaiters = async (req, res) => {
  const waiters = await Waiter.find();
  res.json(waiters);
};