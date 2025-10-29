let mongo = require("mongoose");
const notice = new mongo.Schema({
  title: { type: String},
  content: { type: String },
  eventDate: { type: Date },
  issueDate: { type: Date },
});
module.exports=mongo.model('notice',notice);
