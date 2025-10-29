let mongo=require("mongoose");
let salary=mongo.Schema({
    department:{type:String},
    employee:{type:String},
    basicsalary:{type:Number},
    allowance:{type:Number},
    deduction:{type:Number},
    paydate:{type:Date},
    id:{type:Number},
  
});
module.exports=mongo.model('salary',salary);