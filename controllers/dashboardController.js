const Click = require('../models/Click');
const Order = require('../models/Order');
const asyncHandler = require('express-async-handler');

exports.getDashboard = asyncHandler(async (req, res) => {
  const clicks = await Click.find({ user_id: req.user._id });
  const orders = await Order.find({ user_id: req.user._id });
  const amountOfOrders = orders.reduce((sum, order) => {
    const click = clicks.find((click) => click._id.equals(order.click_id));
    return sum + (click ? click.price : 0);
  }, 0);

  res.json({
    numberOfClicks: clicks.length,
    numberOfOrders: orders.length,
    amountOfOrders,
  });
});
