const { addattendance, viewattendance,attendancecheck } = require("../service/attendanceservice");

exports.addattendance=async(req,res)=>
{
 await addattendance(req,res);
}

exports.viewattendance=async(req,res)=>
{
    await viewattendance(req,res);
}

exports.attendancecheck=async(req,res)=>{
    await attendancecheck(req,res);
}