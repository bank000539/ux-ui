const ItemSchema = require('../models/Item.js');

module.exports.controller = (app) => {
  // add a new item
  app.post('/items', (req, res) => {
    const newItem = new ItemSchema({
      name: req.body.name,
      size: req.body.size,
      price: req.body.price,
      picture: req.body.picture,
    });
    newItem.save((error, item) => {
      if (error) {
        console.log(error);
      }
      res.send(item);
    });
  });

  // fetch all items
  app.get('/items', (req, res) => {
    ItemSchema.find({}, 'name size price picture', (error, items) => {
      if (error) {
        console.log(error);
      }
      res.send({
        items,
      });
    });
  });

  // fetch a single item
  app.get('/item/:id', (req, res) => {
    ItemSchema.findById(req.params.id, 'name size price picture', (error, item) => {
      if (error) {
        console.error(error);
      }
      res.send(item);
    });
  });


  // Update a item
  app.put('/items/:id', (req, res) => {
    ItemSchema.findById(req.params.id, 'name size price picture', (error, item) => {
      if (error) {
        console.error(error);
      }
      item.name = req.body.name
      item.size = req.body.size
      item.price = req.body.price
      item.picture = req.body.picture
      item.save(function (error) {
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
  app.delete('/items/:id', (req, res) => {
    ItemSchema.remove({
      _id: req.params.id
    }, function (error, item) {
      if (error) {
        console.error(error);
      }
      res.send({
        success: true
      })
    })
  })
};