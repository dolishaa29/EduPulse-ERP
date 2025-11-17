const mongo = require('mongoose');
const feeActivitySchema = new mongo.Schema({
  studentId: {
    type: Number, 
  },
  studentName: {
    type: String,  
  },
  quarter: {
    type: String,  
  },
  amount: {
    type: Number,  
  },
  paymentDate: {type: Date, 
    default: Date.now  
  },

});
const FeeActivity = mongo.model('FeeActivity', feeActivitySchema);
module.exports = FeeActivity;
