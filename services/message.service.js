const messageModel = require("../models/message.model");

module.exports.addMessage = async (req, res) => {
  const { message, userId } = req.body;
  await messageModel.insertMany({ message, userId });
  res.json({ message: "Added Success" });
};
module.exports.allMessage = async (req, res) => {
  const { userId } = req.body;
  let messages = await messageModel.find({userId:req.id },{message:1,_id:0});
  res.json({ message: "Success" , messages});
};
