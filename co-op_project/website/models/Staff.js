const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
  branch: String,
  staffname: String,
  telephone: String,
});

const Staff = mongoose.model('Staff', StaffSchema)
module.exports = Staff;
 