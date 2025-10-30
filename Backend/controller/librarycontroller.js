const { addbook, viewbook, deletebook,issuebook ,returnbook,issued} = require("../service/libraryservice");

exports.addbook=async(req,res)=>
{
    await addbook(req,res);
}
exports.viewbook=async(req,res)=>
{
    await viewbook(req,res);
}
exports.deletebook=async(req,res)=>
{
    await deletebook(req,res);
}
exports.issuebook=async(req,res)=>
{
    await issuebook(req,res);
}

exports.returnbook=async(req,res)=>
{
    await returnbook(req,res);
}
exports.issued=async(req,res)=>
{
    await issued(req,res);
}