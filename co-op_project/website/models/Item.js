const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: String,
  size: String,
  price: String,
  picture: String,
});

const Item = mongoose.model('Item', ItemSchema)
module.exports = Item;
 