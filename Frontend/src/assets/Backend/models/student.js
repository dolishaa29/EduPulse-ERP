let mongo=require("mongoose");
let studentmodel=mongo.Schema({
   email:{type:String},
   name:{type:String},
   password:{type:String},
   dob:{type:Date},
   address:{type:String},
   contact:{type:Number},
   city:{type:String},
   id:{type:Number},
   image:{type:String},

});
module.exports=mongo.model('student',studentmodel);