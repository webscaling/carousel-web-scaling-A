const express = require('express');
const bodyParser = require('body-parser');
const { carouselItem } = require('./mongoose.js');
const mongoose = require('mongoose');
const app = express();
const port = 4444;


app.use(express.static('client'));
app.use(bodyParser.json());

app.post('/item', (req, res) => {
  const item = new carouselItem({
    _id: new mongoose.Types.ObjectId(),
    ProductId: req.body.ProductId,
    ItemName: req.body.ItemName,
    Price: req.body.Price,
    Rating: req.body.Rating,
    Category: req.body.Category,
    Photo: req.body.Photo,
    Video: req.body.Video
  });
  item.save()
    .then(result => {
      res.status(201).send({
        message: 'handling POST requests to /item',
        createdProduct: result
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ error: err });
    });
});

app.get('/item', (req, res) => {
  carouselItem.find(req.query.Category !== undefined ? { Category: req.query.Category } : { ProductId: req.query.ProductId } )
    .exec()
    .then(doc => {
      console.log('get request successful');
      res.status(200).send(doc);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ error: err });
    });
});

app.listen(port, () => { console.log(`we are listening from port ${port}`); });
