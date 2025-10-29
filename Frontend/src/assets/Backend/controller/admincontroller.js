const { adminregister, adminlogin, adminprofile, adminlogout, updateadmin } = require("../service/adminservice");

exports.adminregister=async(req,res)=>
{
 await adminregister(req,res);
}
exports.adminlogin = async (req, res) =>
{
  try {
    
    await adminlogin(req, res);
  } catch (error) {
    console.log("error in login........",error);
  }
}
exports.adminprofile=async(req,res)=>
{
 await adminprofile(req,res);
}
exports.adminlogout=async(req,res)=>
{
  await adminlogout(req,res);
}
