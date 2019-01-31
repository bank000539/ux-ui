const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BranchItemSchema = new Schema({
    branch: String,
    name: String,
    size: String,
    price: String,
    picture: String,
});

const BranchItem = mongoose.model('BranchItem', BranchItemSchema)
module.exports = BranchItem;
