const mongo = require('mongoose');

const Quiz = new mongo.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, 
  questions: [
    {
      questionId: { type: Number, required: true },
      questionText: { type: String, required: true },
      options: {
        A: { type: String, required: true },
        B: { type: String, required: true },
        C: { type: String, required: true },
        D: { type: String, required: true },
      },
      correctAnswer: { type: String, enum: ['A','B','C','D'], required: true },
      points: { type: Number, default: 1 }
    }
  ]
});

module.exports = mongo.model('Quiz', Quiz);
