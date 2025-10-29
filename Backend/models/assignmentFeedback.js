let mongo=require("mongoose");
let assignmentfeed=mongo.Schema({
   stuId:{type:String},
   stuName:{type:String},
   stuEmail:{type:String},
   assignId:{type:String},
   feedback:{type:String},
   marks:{type:String},
    
});
module.exports=mongo.model('assignmentfeed',assignmentfeed);