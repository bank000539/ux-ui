const ItemOrderSchema = require('../models/ItemOrder.js');

module.exports.controller = (app) => {
  // add a new item
  app.post('/itemorders', (req, res) => {
    const newItemOrder = new ItemOrderSchema({
      menu: req.body.menu,
      size: req.body.size,
      price: req.body.price,
    });
    newItemOrder.save((error, itemorder) => {
      if (error) {
        console.log(error);
      }
      res.send(itemorder);
    });
  });

  // fetch all items
  app.get('/itemorders', (req, res) => {
    ItemOrderSchema.find({}, 'menu size price', (error, itemorders) => {
      if (error) {
        console.log(error);
      }
      res.send({
        itemorders,
      });
    });
  });

  // fetch a single item
  app.get('/itemorder/:id', (req, res) => {
    ItemOrderSchema.findById(req.params.id, 'menu size price', (error, itemorders) => {
      if (error) {
        console.error(error);
      }
      res.send(itemorders);
    });
  });


  // Update a item
  app.put('/itemorders/:id', (req, res) => {
    ItemOrderSchema.findById(req.params.id, 'menu size price', (error, itemorders) => {
      if (error) {
        console.error(error);
      }
      itemorders.menu = req.body.menu
      itemorders.size = req.body.size
      itemorders.price = req.body.price
      itemorders.save(function (error) {
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
  app.delete('/itemorders/:id', (req, res) => {
    ItemOrderSchema.remove({
      _id: req.params.id
    }, function (error, itemorders) {
      if (error) {
        console.error(error);
      }
      res.send({
        success: true
      })
    })
  })
};
