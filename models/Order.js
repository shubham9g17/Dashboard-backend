const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  click_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Click', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
