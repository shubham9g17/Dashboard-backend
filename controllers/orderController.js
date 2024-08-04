const Order = require('../models/Order');
const asyncHandler = require('express-async-handler');

exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user_id: req.user._id });
  res.json(orders);
});
