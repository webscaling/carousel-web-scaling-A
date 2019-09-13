const express = require('express');
const bodyParser = require('body-parser');
const { getItemById } = require('../database/postgres.js');
const { seedData } = require('../database/postgres.js');
//const { carouselItem } = require('../database/mongoose.js');
//const mongoose = require('mongoose');
const app = express();
const port = 4444;


app.use(express.static('client'));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.post('/item', (req, res) => {
//   const item = new carouselItem({
//     _id: new mongoose.Types.ObjectId(),
//     ProductId: req.body.ProductId,
//     ItemName: req.body.ItemName,
//     Price: req.body.Price,
//     Rating: req.body.Rating,
//     RatingCount: Math.floor(Math.random() * 20) + 1,
//     Category: req.body.Category,
//     Photo: req.body.Photo[0],
//   });
//   item.save()
//     .then(result => {
//       res.status(201).send({
//         message: 'handling POST requests to /item',
//         createdProduct: result
//       });
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).end();
//     });
// });



// app.get('/item', (req, res) => {
//   carouselItem.find(req.query.Category !== undefined ? { Category: req.query.Category } : { ProductId: req.query.ProductId } )
//     .exec()
//     .then(doc => {
//       res.status(200).send(doc);
//     })
//     .catch(err => {
//       res.status(500).end();
//     });
// });

app.post('/seed', (req, res) => {
  seedData();
  res.send('database seeded');
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

// app.put('/item', (req, res) => {
//   carouselItem.updateOne({ ProductId: req.body.ProductId }, { Rating: req.body.Rating, RatingCount: req.body.RatingCount })
//     .exec()
//     .then(() => {
//       res.status(200).end();
//     })
//     .catch(err => {
//       console.error(err);
//     });
// });




app.listen(port, () => { console.log(`we are listening from port ${port}`); });
