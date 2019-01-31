const OrderSchema = require('../models/Order.js');

module.exports.controller = (app) => {
  // add a new item
  app.post('/orders', (req, res) => {
    const newOrder = new OrderSchema({
      branch: req.body.branch,
      date: req.body.date,
      time: req.body.time,
      menu: req.body.menu,
      size: req.body.size,
      price: req.body.price,
      namecustomer: req.body.namecustomer,
      phonecustomer: req.body.phonecustomer,
      staffname: req.body.staffname,
      shippingplace: req.body.shippingplace,
      deliverytime: req.body.deliverytime,
      status: req.body.status,
    });
    newOrder.save((error, order) => {
      if (error) {
        console.log(error);
      }
      res.send(order);
    });
  });

  // fetch all items
  app.get('/orders', (req, res) => {
    OrderSchema.find({}, 'branch date time menu size price namecustomer phonecustomer staffname shippingplace deliverytime status', (error, orders) => {
      if (error) {
        console.log(error);
      }
      res.send({
        orders,
      });
    });
  });

  // fetch sum date
  app.get('/orders', (req, res) => {
    OrderSchema.find({}, 'branch date time menu size price namecustomer phonecustomer staffname shippingplace deliverytime status', (error, orders) => {
      if (error) {
        console.log(error);
      }
      res.send({
        orders,
      });
    });
  });

  // fetch a single item
  app.get('/order/:id', (req, res) => {
    OrderSchema.findById(req.params.id, 'branch date time menu size price namecustomer phonecustomer staffname shippingplace deliverytime status', (error, order) => {
      if (error) {
        console.error(error);
      }
      res.send(order);
    });
  });


  // Update a item
  app.put('/orders/:id', (req, res) => {
    OrderSchema.findById(req.params.id, 'branch date time menu size price namecustomer phonecustomer staffname shippingplace deliverytime status', (error, order) => {
      if (error) {
        console.error(error);
      }
      order.branch = req.body.branch
      order.date = req.body.date
      order.time = req.body.time
      order.menu = req.body.menu
      order.size = req.body.size
      order.price = req.body.price
      order.namecustomer = req.body.namecustomer
      order.phonecustomer = req.body.phonecustomer
      order.staffname = req.body.staffname
      order.shippingplace = req.body.shippingplace
      order.deliverytime = req.body.deliverytime
      order.status = req.body.status
      order.save(function (error) {
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
  app.delete('/orders/:id', (req, res) => {
    OrderSchema.remove({
      _id: req.params.id
    }, function (error, order) {
      if (error) {
        console.error(error);
      }
      res.send({
        success: true
      })
    })
  })
};
