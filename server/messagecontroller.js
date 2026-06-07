const Message = require("./messagemodal");

const sendMessage = async (req, res) => {
  const { sender, receiver, text } = req.body;
  try {
    const message = await Message.create({ sender, receiver, text });
    res.status(201).json({ response: message });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getChatHistory = async (req, res) => {
  const { receiver } = req.params;
  const { sender } = req.query;
  try {
    const messages = await Message.find({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json({ response: messages });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  sendMessage,
  getChatHistory,
};
