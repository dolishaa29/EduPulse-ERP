let mongo=require("mongoose");
let stuattendance=mongo.Schema({
id:{type:Number},
date:{type:String},
status:{type:String,enum:["Full","Half","Leave"]},
  
});
module.exports=mongo.model('studentattendance',stuattendance);