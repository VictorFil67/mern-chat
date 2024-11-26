import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

const sendMessage = async (req, res) => {
  try {
    const { id: reseiverId } = req.params;
    const { message } = req.body;
    const { _id: senderId } = req.user;
    console.log(senderId);
    let conversation = await Conversation.findOne({
      participants: { $all: [reseiverId, senderId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, reseiverId],
      });
    }

    const newMessage = Message({
      senderId,
      reseiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await newMessage.save();
    await conversation.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json("Internal server error");
  }
};

export default { sendMessage };
