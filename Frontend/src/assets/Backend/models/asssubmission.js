let mongo=require("mongoose");
let submission=mongo.Schema({
   stuId:{type:String},
   stuName:{type:String},
   stuEmail:{type:String},
   assignId:{type:String},
   submissionFile:{type:String},
    
});
module.exports=mongo.model('submission',submission);