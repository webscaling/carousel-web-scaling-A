const mongoose = require('mongoose');
const timerFn = require('timer-node');
const timer = timerFn('test-timer');

mongoose.connect('mongodb://localhost:27017/Shazamazon', { useNewUrlParser: true });

const mongoConnection = mongoose.connection;
mongoConnection.on('error', console.error.bind(console, 'Mongo connection error'));
mongoConnection.once('open', function () {
  console.log('connected to mongoDB');
});


const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ProductId: Number,
  ItemName: String,
  Price: Number,
  Rating: Number,
  RatingCount: Number,
  Category: String,
  Photo: String
}, {collection: 'tenMillion' });

const carouselItem = mongoose.model('tenMillion', schema);

const getItemByMongoId = function(inputId, callback) {
  timer.start();
  var query = carouselItem.find({ ProductId: inputId });
  query.exec(function(err, item) {
    console.log(item, 'here');
    if (err) {
      timer.stop();
      return callback (err, null);
    }
    if (item) {
      timer.stop();
      console.log(`MongoDB queried by ID ${inputId} in ${timer.seconds()} seconds`);
      console.log(`MongoDB queried by ID ${inputId} in ${timer.milliseconds()} milliseconds`);
      return callback(null, item);
    } else {
      timer.stop();
      console.log(`No item found in MongoDB with ProductId = ${inputId}`)
    }
  });
};


module.exports = { carouselItem, getItemByMongoId };