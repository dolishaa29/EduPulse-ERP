const mongo = require('mongoose');
const book = new mongo.Schema({
  bookId: { type: String, required: true, unique: true},
  bookName: {type: String,required: true},
  author: {type: String,required: true},
  quantity: {type: Number,required: true,min: 1},
  description: {type: String,required: false},
  category: {type: String,required: true},
  image: {type: String,required: false},
status: { type: String, enum: ['Available', 'Not Available'], default: 'Available' }
}, 
{ 
  timestamps: true
});

const Book = mongo.model('Book', book);
module.exports = Book;
