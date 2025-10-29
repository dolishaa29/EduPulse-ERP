const mongo = require('mongoose');
const feedback =mongo.Schema({
  rating: {type: Number},
  comment: {type: String},
  category: {type: String},
  studentId: {type:String},
  date: {type: Date},
});

const Feedback = mongo.model('Feedback', feedback);

module.exports = Feedback;
