const mongo = require('mongoose');
const feeManagement= new mongo.Schema({
  studentId: {type:Number},
  studentName: {type: String},
  email: {type: String},
  totalFee: {
    type: Number,
  },
  quarter1: {
    fees: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['Paid', 'Overdue'],
      default: 'Overdue',
    },
  },
  quarter2: {
    fees: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['Paid', 'Overdue'],
      default: 'Overdue',
    },
  },
  quarter3: {
    fees: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['Paid', 'Overdue'],
      default: 'Overdue',
    },
  },
  quarter4: {
    fees: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['Paid', 'Overdue'],
      default: 'Overdue',
    },
  },
  remainingFee: {type: Number},
});

module.exports = mongo.model('FeeManagement', feeManagement);
