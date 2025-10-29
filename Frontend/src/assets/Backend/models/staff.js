let mongo=require("mongoose");
let staffmodel=mongo.Schema({
   email:{type:String},
   name:{type:String},
   password:{type:String},
   address:{type:String},
   contact:{type:Number},
   city:{type:String},
   department:{type:String},
   id:{type:Number},
   image:{type:String},

});
module.exports=mongo.model('staff',staffmodel);