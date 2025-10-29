let mongo=require("mongoose");
exports.erp=()=>
{
mongo.connect("mongodb://localhost:27017/erp")
console.log('successfully connected')
}