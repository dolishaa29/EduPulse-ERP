const mongo= require('mongoose');

const submission = new mongo.Schema({
  studentName: { type: String, required: true },
  quizTitle: { type: String, required: true },
  answers: { type: Object, required: true },
  studentId: { type: String, required: true },  
  submittedAt: { type: Date, default: Date.now }
});

const Submission = mongo.model('Subm', submission);

module.exports = Submission;
