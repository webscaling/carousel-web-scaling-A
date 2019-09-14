const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tenMillion', { useNewUrlParser: true });

const mongoConnection = mongoose.connection;
mongoConnection.on('error', console.error.bind(console, 'Mongo connection error:'));
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
}, {collection: 'item-data' });

const carouselItem = mongoose.model('carouselItem', schema);

module.exports = { carouselItem };