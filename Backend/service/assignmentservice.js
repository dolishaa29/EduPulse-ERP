const rec=require("../models/assignment");
const rec3=require("../models/asssubmission");
const rec4=require("../models/assignmentFeedback");
exports.create=async(req,res)=>
{
    console.log(req.body);
    let Id=req.body.Id;
    let Title=req.body.Title;
    let Assignment=req.file.filename;
    let IssueDate=req.body.IssueDate;
    let SubmissionDate=req.body.SubmissionDate;
    let Description=req.body.Description;

    const record=new rec({Id:Id,Title:Title,Assignment:Assignment,IssueDate:IssueDate,SubmissionDate:SubmissionDate,Description:Description});
    await record.save();
    return res.status(201).json({ success: true, msg: "assignment registered successfully" });
}

exports.view=async(req,res)=>
{
      let assignment = await rec.find();
      console.log(assignment);
      if (assignment.length === 0) {
        return res.status(404).json({ success: false, msg: "No assignment found" });
      }
    
      return res.status(200).json({
        success: true,
        msg: "All assignment details fetched successfully",
        assignment: assignment,
      });
}

exports.submission=async(req,res)=>
{ let stuEmail=req.body.stuEmail;
  let stuName=req.body.stuName;
  let stuId=req.body.stuId;
  let assignId=req.body.assignId;
  let submissionFile=req.file.filename;

  const record=await rec3({
    stuId:stuId,
    stuEmail:stuEmail,
    stuName:stuName,
    assignId:assignId,
    submissionFile:submissionFile,
  });

  await record.save();
  return res.status(201).json({
    success:true,
    msg:"Assignment submitted successfully",
    submission:record,
  });
}

exports.viewsubmission=async(req,res)=>
{     
      let submission = await rec3.find();
      console.log(submission);
      if (submission.length === 0) {
        return res.status(404).json({ success: false, msg: "No submission found" });
      }
    
      return res.status(200).json({
        success: true,
        msg: "All submission details fetched successfully",
        submission: submission,
      });
}

exports.assfeedback=async(req,res)=>
{
  console.log(req.body);
  let stuId=req.body.stuId;
  let stuName=req.body.stuName;
  let stuEmail=req.body.stuEmail;
  let assignId=req.body.assignId;
  let feedback=req.body.feedback;
  let marks=req.body.marks;

  const record= new rec4({
    stuId:stuId,
    stuEmail:stuEmail,
    stuName:stuName,
    assignId:assignId,
    feedback:feedback,
    marks:marks,
  });
  await record.save();
  return res.status(201).json({
    success:true,
    msg:"Assignment submitted successfully",
    feed:record,
  });
}

exports.viewassfeedback=async(req,res)=>
{      console.log("ji")
      let staff=req.staff;
      let feedback = await rec4.find({stuId:staff.id});
      console.log(feedback);
      if (feedback.length === 0) {
        return res.status(404).json({ success: false, msg: "No submission found" });
      }
      return res.status(200).json({
        success: true,
        msg: "All submission details fetched successfully",
        feedback: feedback,
      });
}


exports.findSubmissionById = async (req, res) => {
  console.log('hiii')
  try {
    console.log("ho")
    const submissionId = req.params.id;
    console.log(submissionId);
    let submission = await rec3.findById(submissionId);

    if (!submission) {
      return res.status(404).json({
        success: false,
        msg: "No submission found for this assignment ID",
      });
    }

    return res.status(200).json({
      success: true,
      submission: submission,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      msg: "An error occurred while fetching the submission",
    });
  }
};
