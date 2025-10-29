const mongo = require('mongoose');
const test =mongo.Schema({
  questionId: { type: String},
  question:{type:String},
  userAnswer: { type: String },
  correctAnswer: { type: String },
  Answer: { type: String},  
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongo.model('test', test);
