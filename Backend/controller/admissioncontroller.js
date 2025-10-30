const { admission} = require("../service/admissionservice");

exports.admission=async(req,res)=>
{
 await admission(req,res);
}