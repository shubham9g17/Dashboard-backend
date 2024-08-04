const Click = require('../models/Click');
const asyncHandler = require('express-async-handler');

exports.getClicks = asyncHandler(async (req, res) => {
  const clicks = await Click.find({ user_id: req.user._id });
  res.json(clicks);
});
