let mongo=require("mongoose");
let assignment=mongo.Schema({
    Id:{type:String},
    Title:{type:String},
    Assignment:{type:String},
    IssueDate:{type:Date},
    SubmissionDate:{type:Date},
    Description:{type:String},
    
});
module.exports=mongo.model('assignment',assignment);