require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const { getItemByPostgresId } = require('../database/postgres.js');
const { seedPostgresData } = require('../database/postgres.js');
const { carouselItem } = require('../database/mongoose.js');
const { getItemByMongoId } = require('../database/mongoose.js');
const mongoose = require('mongoose');
const timerFn = require('timer-node');
const timer = timerFn('test-timer');
const app = express();
const port = 4444;


app.use(express.static('client'));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.post('/item', (req, res) => {
  const item = new carouselItem({
    _id: new mongoose.Types.ObjectId(),
    ProductId: req.body.ProductId,
    ItemName: req.body.ItemName,
    Price: req.body.Price,
    Rating: req.body.Rating,
    RatingCount: req.body.RatingCount,
    Category: req.body.Category,
    Photo: req.body.Photo[0],
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
      res.status(500).end();
    });
});



app.get('/item', (req, res) => {
  carouselItem.find(req.query.Category !== undefined ? { Category: req.query.Category } : { ProductId: req.query.ProductId } ).limit(20)
    .exec()
    .then(doc => {
      res.status(200).send(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

app.get('/getMongoItemById', (req, res) => {
  getItemByMongoId(req.query.ProductId, function(err, result) {
    if (err) {
      res.status(500).end();
    } else {
      res.status(200).send(result);
    }
  });
});

app.get('/getPostgresItemById', (req, res) => {
  getItemByPostgresId(req.query.ProductId, function(err, result) {
    if (err) {
      res.status(500).end();
    } else {
      res.status(200).send(result);
    }
  });
});

app.post('/seedPostgres', (req, res) => {
  timer.start();
  seedPostgresData(function() {
    timer.stop();
    console.log(timer.seconds()); 
  });
  res.send('postgres database is seeding...');
});

// app.put('/seed', (req, res) => {
//   const ratingCount = req.body.length;
//   let reviewsArray = [];
//   let avgReviews;
  
//   req.body.forEach(review => {
//     reviewsArray.push(review.rating);
//   });

//   avgReviews = reviewsArray.reduce((acc, num)=> {
//     return acc + num;
//   });
//   avgReviews = (avgReviews / ratingCount).toFixed(1);

//   carouselItem.updateOne({ ProductId: req.body[0].itemID }, { Rating: avgReviews, RatingCount: ratingCount })
//     .exec()
//     .then(() => {
//       res.status(200).end();
//     })
//     .catch(err => {
//       console.error(err);
//     });

// });

app.put('/item', (req, res) => {
  carouselItem.updateOne({ ProductId: req.body.ProductId }, { Rating: req.body.Rating, RatingCount: req.body.RatingCount })
    .exec()
    .then(() => {
      res.status(200).end();
    })
    .catch(err => {
      console.error(err);
    });
});




app.listen(port, () => { console.log(`we are listening from port ${port}`); });
