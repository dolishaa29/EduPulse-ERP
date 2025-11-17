let mongo=require("mongoose");
let studentadmission=mongo.Schema({
   email:{type:String},
   name:{type:String},
   password:{type:String},
   dob:{type:Date},
   address:{type:String},
   contact:{type:Number},
   city:{type:String},
   id:{type:Number},
   department:{type:String},
   basefee:{type:Number},
   hostel:{type:String},
   
   library:{type:String},
   transport:{type:String},
   totalfee:{type:Number},
});
module.exports=mongo.model('studentadmission',studentadmission);