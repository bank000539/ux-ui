const StaffSchema = require('../models/Staff.js');

module.exports.controller = (app) => {
  // add a new staff
  app.post('/staffs', (req, res) => {
    const newStaff = new StaffSchema({
      branch: req.body.branch,
      staffname: req.body.staffname,
      telephone: req.body.telephone,
    });
    newStaff.save((error, staff) => {
      if (error) {
        console.log(error);
      }
      res.send(staff);
    });
  });

  // fetch all staffs
  app.get('/staffs', (req, res) => {
    StaffSchema.find({}, 'branch staffname telephone', (error, staffs) => {
      if (error) {
        console.log(error);
      }
      res.send({
        staffs,
      });
    });
  });

  // fetch a single staff
  app.get('/staff/:id', (req, res) => {
    StaffSchema.findById(req.params.id, 'branch staffname telephone', (error, staff) => {
      if (error) {
        console.error(error);
      }
      res.send(staff);
    });
  });


  // Update a staff
  app.put('/staffs/:id', (req, res) => {
    StaffSchema.findById(req.params.id, 'branch staffname telephone', (error, staff) => {
      if (error) {
        console.error(error);
      }
      staff.branch = req.body.branch
      staff.staffname = req.body.staffname
      staff.telephone = req.body.telephone
      staff.save(function (error) {
        if (error) {
          console.log(error)
        }
        res.send({
          success: true
        })
      })
    })
  })

  // delete a staff
  app.delete('/staffs/:id', (req, res) => {
    StaffSchema.remove({
      _id: req.params.id
    }, function (error, staff) {
      if (error) {
        console.error(error);
      }
      res.send({
        success: true
      })
    })
  })
};