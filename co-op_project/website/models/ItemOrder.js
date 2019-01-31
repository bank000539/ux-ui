const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemOrderSchema = new Schema({
  menu: String,
  size: String,
  quantity: String,
  price: String,
});

const ItemOrder = mongoose.model('ItemOrder', ItemOrderSchema)
module.exports = ItemOrder;
