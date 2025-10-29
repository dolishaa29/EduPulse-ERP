let mongo=require("mongoose");
let adminmodel=mongo.Schema({
   email:{type:String},
   password:{type:String},
   organization:{type:String},
   contact:{type:Number},
   city:{type:String},
   id:{type:Number},

});
module.exports=mongo.model('admin',adminmodel);