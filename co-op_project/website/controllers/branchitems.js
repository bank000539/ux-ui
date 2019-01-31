const BranchItemSchema = require('../models/BranchItem.js');

module.exports.controller = (app) => {
  // add a new branchitem
  app.post('/branchitems', (req, res) => {
    const newBranchItem = new BranchItemSchema({
      branch: req.body.branch,
      name: req.body.name,
      size: req.body.size,
      price: req.body.price,
      picture: req.body.picture,
    });
    newBranchItem.save((error, branchitem) => {
      if (error) {
        console.log(error);
      }
      res.send(branchitem);
    });
  });

  // fetch all branchitems
  app.get('/branchitems', (req, res) => {
    BranchItemSchema.find({}, 'branch name size price picture', (error, branchitems) => {
      if (error) {
        console.log(error);
      }
      res.send({
        branchitems,
      });
    });
  });

  // fetch a single branchitem
  app.get(`/branchitem/:id`, (req, res) => {
    BranchItemSchema.findById(req.params.id, 'branch name size price picture', (error, branchitem) => {
      if (error) {
        console.error(error);
      }
      res.send(branchitem);
    });
  });


  // Update a branchitem
  app.put('/branchitems/:id', (req, res) => {
    BranchItemSchema.findById(req.params.id, 'branch name size price picture', (error, branchitem) => {
      if (error) {
        console.error(error);
      }
      branchitem.branch = req.body.branch
      branchitem.name = req.body.name
      branchitem.size = req.body.size
      branchitem.price = req.body.price
      branchitem.picture = req.body.picture
      branchitem.save(function (error) {
        if (error) {
          console.log(error)
        }
        res.send({
          success: true
        })
      })
    })
  })

  // delete a item
  app.delete('/branchitems/:id', (req, res) => {
    BranchItemSchema.remove({
      _id: req.params.id
    }, function (error, branchitem) {
      if (error) {
        console.error(error);
      }
      res.send({
        success: true
      })
    })
  })
};