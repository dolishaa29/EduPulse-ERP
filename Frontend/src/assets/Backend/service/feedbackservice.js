const rec = require("../models/feedback");

exports.addfeedback = async (req, res) => {
  console.log(req.body);
  try {
    let rating = req.body.rating;
    let comment = req.body.comment;
    let category = req.body.category;
    let studentId = req.body.studentId;

    let data = new rec({
      rating: rating,
      comment: comment,
      category: category,
      studentId: studentId,
    });

    await data.save();
    return res
      .status(201)
      .json({ success: true, msg: "Feedback submitted successfully." });
  } catch (error) {
    console.error("Error in submitting feedback:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Error in submitting feedback." });
  }
};

exports.viewfeedback = async (req, res) => {
    try {
    let feedbackList = await rec.find();

    if (feedbackList.length === 0) {
      return res.status(404).json({ success: false, msg: "No feedback found" });
    }

    return res.status(200).json({
      success: true,
      msg: "All feedbacks fetched successfully",
      feedback: feedbackList,
    });
  } catch (error) {
    console.error("Error in fetching feedback:", error);
    return res.status(500).json({ success: false, msg: "Error in fetching feedback." });
  }
};
