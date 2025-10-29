let mongo=require("mongoose");
let form=mongo.Schema({
    question:{type:String},
    option1:{type:String},
    option2:{type:String},
    option3:{type:String},
    option4:{type:String},
    answer:{type:String,enum:["option1","option2","option3","option4"]},
  
});
module.exports=mongo.model('form',form);