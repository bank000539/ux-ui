const BranchSchema = require('../models/Branch.js');
const Branch = require('../models/Branch.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports.controller = (app) => {
  // fetch all branchs 
  app.get('/branchs', (req, res) => {
    BranchSchema.find({}, 'branch_name telephone username password', (error, branchs) => {
      if (error) {
        console.log(error);
      }
      res.send({
        branchs,
      });
    });
  });

  // fetch a single branch
  app.get('/api/branchs/:id', (req, res) => {
    BranchSchema.findById(req.params.id, 'branch_name telephone username password', (error, branch) => {
      if (error) {
        console.error(error);
      }
      res.send(branch);
    });
  });

  // Update a branch
  app.put('/api/branchs/:id', (req, res) => {
    BranchSchema.findById(req.params.id, 'branch_name telephone username password', (error, branch) => {
      if (error) {
        console.error(error);
      }
      branch.branch_name = req.body.branch_name
      branch.telephone = req.body.telephone
      branch.username = req.body.username
      branch.password = req.body.password
      branch.save(function (error) {
        if (error) {
          console.log(error)
        }
        res.send({
          success: true
        })
      })
    })
  })

  // delete a branch
  app.delete('/api/branchs/:id', (req, res) => {
    BranchSchema.remove({
      _id: req.params.id
    }, function (error, branch) {
      if (error) {
        console.error(error);
      }
      res.send({
        success: true
      })
    })
  })

    // local strategy
    passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
    }, (username, password, done) => {
      Branch.getUserByBranch(username, (err, branch) => {
        if (err) {
          return done(err);
        }
        if (!branch) {
          return done(null, false);
        }
        Branch.comparePasswordBranch (password, branch.password, (error, isMatch) => {
          if (isMatch) {
            return done(null, branch);
          }
          return done(null, false);
        });
        return true;
      });
    }));
    // user login
    app.post('/branchs/login',
      passport.authenticate('local', {
        failureRedirect: '/branchs/login'
      }),
      (req, res) => {
        res.redirect('/');
      });
    passport.serializeUser((branch, done) => {
      done(null, branch.id);
    });
    passport.deserializeUser((id, done) => {
      Branch.findById(id, (err, branch) => {
        done(err, branch);
      });
    });
    // register a user
    app.post('/branchs/register', (req, res) => {
      const branch_name = req.body.branch_name;
      const telephone = req.body.telephone;
      const username = req.body.username;
      const password = req.body.password;
      const newBranch = new Branch({
        branch_name,
        telephone,
        username,
        password,
      });
      Branch.createBranch(newBranch, (error, branch) => {
        if (error) {
          res.status(422).json({
            message: 'Something went wrong. Please try again after sometime!',
          });
        }
        res.send({
          branch
        });
      });
    });
};


