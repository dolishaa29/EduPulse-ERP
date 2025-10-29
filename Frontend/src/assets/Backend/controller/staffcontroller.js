const { staffregister, stafflogin, staffprofile, stafflogout, viewstaff ,deletestaff,updatestaff, viewbyid } = require("../service/staffservice");

exports.staffregister=async(req,res)=>
{
 await staffregister(req,res);
}
exports.stafflogin=async(req,res)=>
{
 await stafflogin(req,res);
}
exports.staffprofile=async(req,res)=>
{
 await staffprofile(req,res);
}
exports.stafflogout=async(req,res)=>
{
  await stafflogout(req,res);
}
exports.viewstaff=async(req,res)=>
{
  await viewstaff(req,res);
}

exports.deletestaff=async(req,res)=>
{
  await deletestaff(req,res);
}

exports.updatestaff=async(req,res)=>
{
  await updatestaff(req,res);
}

exports.viewbyid=async(req,res)=>
{
  await viewbyid(req,res);
}