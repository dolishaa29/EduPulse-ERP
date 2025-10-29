const { viewfeedback, addfeedback } = require("../service/feedbackservice");


exports.addfeedback=async(req,res)=>
{
    await addfeedback(req,res);
}

exports.viewfeedback=async(req,res)=>
{
    await viewfeedback(req,res);
}