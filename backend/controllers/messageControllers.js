import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const { _id: senderId } = req.user;
    console.log(receiverId);
    let conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      console.log(newMessage);
      conversation.messages.push(newMessage._id);
    }

    // await newMessage.save();
    // await conversation.save();
    // This is the same that above but will run in parallel
    await Promise.all([newMessage.save(), conversation.save()]);
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { _id: senderId } = req.user;
    const { id: userToChatId } = req.params;
    console.log(senderId, userToChatId);
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json([]);
    }
    const { messages } = conversation;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default { sendMessage, getMessages };
