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
    productId: req.body.productId,
    name: req.body.name,
    price: req.body.price,
    stars: req.body.stars,
    category: req.body.category,
    picture: req.body.picture
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
  // console.log(req.query.category);
  carouselItem.find(req.query.category === undefined ? null : { category: req.query.category })
    .exec()
    .then(doc => {
      // console.log(doc);
      res.status(200).send(doc);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ error: err });
    });
});

app.listen(port, () => { console.log(`we are listening from port ${port}`); });
