const { salaryregister,salaryview,salaryupdate,salarydelete } = require("../service/salaryservice");
const { viewbyid } = require("../service/salaryservice");

exports.salaryregister=async(req,res)=>
{
    await salaryregister(req,res);
}
exports.salaryview=async(req,res)=>
{
    await salaryview(req,res);
}
exports.salarydelete=async(req,res)=>
{
    await salarydelete(req,res);
}
exports.salaryupdate=async(req,res)=>
{
    await salaryupdate(req,res);
}
exports.viewbyid=async(req,res)=>
{
  await viewbyid(req,res);
}