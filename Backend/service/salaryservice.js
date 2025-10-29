let rec=require("../models/salary");


exports.salaryregister=async(req,res)=>
{
let department=req.body.department;
let employee=req.body.employee;
let basicsalary=req.body.basicsalary;
let allowance=req.body.allowance;
let deduction=req.body.deduction;
let paydate=req.body.paydate;

let data=await rec.find();
if(data.length==0)
{
    const id=1;
    let record=new rec({id:id,department:department,employee:employee,basicsalary:basicsalary,allowance:allowance,deduction:deduction,paydate:paydate});
    await record.save();
    return res.status(200).json({success:true,msg:'salary git registered'});
}
else{
    const id=data.length+1;
    let record=new rec({id:id,department:department,employee:employee,basicsalary:basicsalary,allowance:allowance,deduction:deduction,paydate:paydate});
    await record.save();
    return res.status(201).json({success:true,msg:'salary git restired'});
}
    
}

exports.salaryview=async(req,res)=>
{
        let salarylist = await rec.find();
        console.log(salarylist);
        if (salarylist.length === 0) {
            return res.status(404).json({ success: false, msg: 'No salary found' });
        }

        return res.status(200).json({success: true,msg: 'All staff details fetched successfully',
            salary: salarylist.map(salary => ({
                _id:salary._id,
                department:salary.department,
                employee:salary.employee,
                basicsalary:salary.basicsalary,
                allowance:salary.allowance,
                deduction:salary.deduction,
                paydate:salary.paydate,
                id:salary.id,
            }))
        });


}

exports.salaryupdate=async(req,res)=>
{
    console.log('hiiii');
   
     let id = req.params.id; 
     let updatedData = req.body; 
     let record = await rec.findByIdAndUpdate({_id:id}, updatedData, { new: true });
   
     if (!record) {
       return res.status(404).json({ success: false, msg: "Salary not found" });
     }
   
     console.log(record);
   
     return res.status(200).json({ success: true, msg: "Salary updated successfully", staff: record });

}

exports.salarydelete=async(req,res)=>
{
    console.log('hello');
    let id=req.params.id;
    await rec.deleteOne({_id:id});
    return res.status(200).json({success:true,msg:"delete successfully!!"});
}

exports.viewbyid=async(req,res)=>
{
  try {
    const salaryId = req.params.id;
    let salary = await rec.findById(salaryId);
    if (!salary) {
      return res.status(404).json({ success: false, msg: "Salary not found" });
    }
    return res.status(200).json({
      success: true,
      msg: "Salary details fetched successfully",
      salary: salary,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
}