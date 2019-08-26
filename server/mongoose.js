const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shazam-carousel', { useNewUrlParser: true });

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {
  console.log('we\'re connected!');
});

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ProductId: Number,
  ItemName: String,
  Price: Number,
  Rating: Number,
  Category: String,
  Photo: Array,
  Video: String
}, {collection: 'carousel-all-data' });

const carouselItem = mongoose.model('carouselItem', schema);

module.exports = { carouselItem };