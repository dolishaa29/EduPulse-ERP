let rec=require("../models/form");
let rec2=require("../models/test");

exports.addquestion=async(req,res)=>
{
 let question=req.body.question;
 let option1=req.body.option1;
 let option2=req.body.option2;
 let option3=req.body.option3;
 let option4=req.body.option4;
 let answer=req.body.answer;

 let data=new rec({question:question,option1:option1,option2:option2,option3:option3,option4:option4,answer:answer});
 await data.save();
 return res.status(201).json({success:true,msg:"question got registered"});
}


exports.viewquestion=async(req,res)=>
{
  console.log("1");
  let formlist = await rec.find();
  console.log("aa"+formlist);
  if (formlist.length == 0) {
    return res.status(404).json({ success: false, msg: "No question found" });
  }
  return res.status(200).json({
    success: true,msg: "All questions  fetched successfully",form: formlist,
  });
}


exports.deletequestion=async(req,res)=>
{
  console.log("hello");
  let id = req.params.id;
  await rec.deleteOne({ _id: id });
  return res.status(200).json({ success: true, msg: "delete successfully!!" });
}


exports.checkquestion = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  let userAnswer = req.body.answer;
  console.log(userAnswer);
  let question = await rec.findOne({ _id: id });
  let correctAnswer = question.answer;
  let right="right";
  let wrong="wrong";
  if (!question) {
    return res.status(404).json({ success: false, msg: "Question not found" });
  }
  userAnswer = userAnswer.toString();
  if (userAnswer === correctAnswer) {
    const result = new rec2({questionId: id,userAnswer: userAnswer,question:question.question,correctAnswer: question.answer,Answer: right,submittedAt: new Date()});
    await result.save();
    return res.status(200).json({success: true,msg: "Correct answer submitted",Answer: right});

  } else {
    const result = new rec2({questionId: id,userAnswer: userAnswer,question:question.question,correctAnswer: question.answer,Answer: wrong,submittedAt: new Date()});
    await result.save();
    return res.status(200).json({success: true,msg: "Incorrect answer submitted",Answer: wrong});
  }
};
