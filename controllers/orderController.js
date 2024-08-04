const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.aggregate([
    {
      $match: { user_id: new mongoose.Types.ObjectId(req.user._id) },
    },
    {
      $lookup: {
        from: "clicks",
        localField: "click_id",
        foreignField: "_id",
        as: "clickDetails",
      },
    },
    {
      $unwind: "$clickDetails",
    },
  ]);
  res.json(orders);
});
