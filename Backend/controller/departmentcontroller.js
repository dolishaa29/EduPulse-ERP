const { adddepartment,viewdepartment,deletedepartment,updatedepartment,deletedept, Dviewbyid } = require("../service/departmentservice")



exports.adddepartment=async(req,res)=>
{
 await adddepartment(req,res);
}

exports.viewdepartment=async(req,res)=>
{
    await viewdepartment(req,res);
}

exports.deletedepartment=async(req,res)=>
{
    await deletedepartment(req,res);
}

exports.updatedepartment=async(req,res)=>
{
    await updatedepartment(req,res);
}

exports.deletedept=async(req,res)=>
{
    await deletedept(req,res);
}

exports.Dviewbyid=async(req,res)=>
{
  await Dviewbyid(req,res);
}