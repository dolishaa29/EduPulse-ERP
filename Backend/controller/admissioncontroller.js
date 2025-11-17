const { admission,admissionlogin,studentprofile,viewstudent,payfee,viewbyids,studentprofile2} = require("../service/admissionservice");

exports.admission=async(req,res)=>
{
 await admission(req,res);
}

exports.admissionlogin=async(req,res)=>
{
    console.log("1")
 await admissionlogin(req,res);
 console.log("4")
}

exports.studentprofile=async(req,res)=>
{   console.log("5")
    await studentprofile(req,res);
    console.log("7")
}

exports.viewstudent=async(req,res)=>
{
    await viewstudent(req,res);
}

exports.payfee=async(req,res)=>
{
    await payfee(req,res);  
}

exports.viewbyids=async(req,res)=>
{
    await viewbyids(req,res);
}

exports.studentprofile2=async(req,res)=>
{
    await studentprofile2(req,res);
}