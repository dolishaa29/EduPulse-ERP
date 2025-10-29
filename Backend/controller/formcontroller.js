const {addquestion,viewquestion,updatequestion,deletequestion,checkquestion}=require("../service/formservice")


exports.addquestion=async(req,res)=>{
    await addquestion(req,res);
}

exports.viewquestion=async(req,res)=>
{
    await viewquestion(req,res);
}
 
exports.updatequestion=async(req,res)=>
{
    await updatequestion(req,res);
}

exports.deletequestion=async(req,res)=>
{
    await deletequestion(req,res);
}

exports.checkquestion=async(req,res)=>
{
    await checkquestion(req,res);
}