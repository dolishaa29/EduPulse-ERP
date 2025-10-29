let mongo=require("mongoose");
let attendance=mongo.Schema({
id:{type:Number},
date:{type:String},
status:{type:String,enum:["Full","Half","Leave"]},
  
});
module.exports=mongo.model('attendance',attendance);