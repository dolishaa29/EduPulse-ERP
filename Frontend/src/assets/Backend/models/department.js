let mongo=require("mongoose");
let deptmodel=mongo.Schema({
   departId:{type:Number},
   departName:{type:String},
   departDescription:{type:String},
   id:{type:Number},
});
module.exports=mongo.model('dept',deptmodel);