const { transportcreate, transportview, transport, transportupdate, transportdelete } = require('../service/transportservice');


exports.transportcreate =async (req, res) => {
    await transportcreate(req,res);

};
exports.transportview =async (req, res) => {
    await transportview(req,res);   
};
exports.transport =async (req, res) => {
    await transport(req,res);   
};

exports.transportupdate =async (req, res) => {
    await transportupdate(req,res);   
};
exports.transportdelete =async (req, res) => {
    await transportdelete(req,res);
};