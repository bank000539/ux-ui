const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  branch: String,
  date: String,
  time: String,
  menu: String,
  size: String,
  price: String,
  namecustomer: String,
  phonecustomer: String,
  staffname: String,
  shippingplace: String,
  deliverytime: String,
  status: String,
});

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order;