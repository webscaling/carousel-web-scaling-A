const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shazam-carousel', { useNewUrlParser: true });

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {
  console.log('we\'re connected!');
});

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productId: Number,
  name: String,
  price: String,
  stars: Number,
  category: String,
  picture: String
}, {collection: 'carousel-data' });

const carouselItem = mongoose.model('carouselItem', schema);

module.exports = { carouselItem };