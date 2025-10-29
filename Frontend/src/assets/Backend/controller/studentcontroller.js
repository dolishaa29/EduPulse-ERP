const { studentregister, studentlogin, studentprofile, studentlogout, viewstudent ,deletestudent,updatestudent,Sviewbyid } = require("../service/studentservice");

exports.studentregister=async(req,res)=>
{
 await studentregister(req,res);
}
exports.studentlogin=async(req,res)=>
{
 await studentlogin(req,res);
}
exports.studentprofile=async(req,res)=>
{
 await studentprofile(req,res);
}
exports.studentlogout=async(req,res)=>
{
  await studentlogout(req,res);
}
exports.viewstudent=async(req,res)=>
{
  await viewstudent(req,res);
}

exports.deletestudent=async(req,res)=>
{
  await deletestudent(req,res);
}

exports.updatestudent=async(req,res)=>
{
  await updatestudent(req,res);
}

exports.Sviewbyid=async(req,res)=>
{
  await Sviewbyid(req,res);
}