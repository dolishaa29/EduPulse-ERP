const {addquestion, viewAssessment, AssessmentSubmission, ViewResult, viewTitle}=require("../service/formservice")

exports.addquestion=async(req,res)=>
{
    await addquestion(req,res);
}

exports.viewAssessment=async(req,res)=>
{
    await viewAssessment(req,res);
}

exports.AssessmentSubmission=async(req,res)=>
{
    await AssessmentSubmission(req,res);
}

exports.ViewResult=async(req,res)=>
{
    await ViewResult(req,res);
}

exports.viewTitle=async(req,res)=>{
    await viewTitle(req,res);
}