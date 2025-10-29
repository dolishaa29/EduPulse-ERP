const { create,view,submission, viewsubmission,assfeedback,viewassfeedback, findSubmissionById } = require("../service/assignmentservice");

exports.create=async(req,res)=>
{
    await create(req,res);
}
exports.view=async(req,res)=>
{
    await view(req,res);
}
exports.submission=async(req,res)=>
{
    await submission(req,res);
}
exports.viewsubmission=async(req,res)=>
{
    await viewsubmission(req,res);
}
exports.assfeedback=async(req,res)=>
{
    await assfeedback(req,res);
}
exports.viewassfeedback=async(req,res)=>
{
    await viewassfeedback(req,res);
}

exports.findSubmissionById=async(req,res)=>
{
    await findSubmissionById(req,res);
}