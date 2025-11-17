const mongo = require('mongoose');

const data = new mongo.Schema({
  bookId: { type: String, required: true },
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  action: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongo.model('data', data);
