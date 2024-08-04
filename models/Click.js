const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  merchant: { type: String, required: true },
  product: { type: String, required: true },
  price: { type: Number, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Click = mongoose.model('Click', clickSchema);
module.exports = Click;
