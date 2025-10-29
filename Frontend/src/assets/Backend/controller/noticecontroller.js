const { addnotice, deletenotice, viewnotice } = require("../service/noticeservice")



exports.addnotice = async (req, res) => {
    await addnotice(req,res);
};
exports.viewnotice = async (req, res) => {
    await viewnotice(req,res);
};  
exports.deletenotice = async (req, res) => {
    await deletenotice(req,res);
};

