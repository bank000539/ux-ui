const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
  branch_name: String,
  telephone: String,
  username: String,
  password: String,
});

const Branch = mongoose.model('Branch', BranchSchema)
module.exports = Branch;

module.exports.createBranch = (newBranch, callback) => {
  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(newBranch.password, salt, (error, hash) => {
      // store the hashed password
      const newBranchResource = newBranch;
      newBranchResource.password = hash;
      newBranchResource.save(callback);
    });
  });
};

module.exports.getUserByBranch = (username, callback) => {
  const query = {
    username
  };
  Branch.findOne(query, callback);
};

module.exports.comparePasswordBranch = (candidatePassword, hash, callback) => {
  bcryptjs.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
