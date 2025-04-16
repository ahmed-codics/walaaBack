import Message from "../models/messageModel.js";
import mongoose, { mongo } from "mongoose";

export const sendMessage = async (req , res) => {
    const { sender  , reciever , content } = req.body;

    //Validate ObjectId format 
    if (!mongoose.Types.ObjectId.isValid(sender) || !mongoose.Types.ObjectId.isValid(reciever)) {
        return res.status(400).json({ error: "Invalid sender/receiver ID format" });
    }

    if (!content?.trim()) {
        return res.status(400).json({ error: "Message content cannot be empty"});
    }
    try {
        const newMessage = await Message.create({ sender , reciever , content });

        // Populate sender/reciever details
        const populatedMessage = await Message.findById(newMessage._id).populate('sender' , 'email').populate('reciever' , 'email').exec();
        res.status(201).json(populatedMessage);
    } catch (error) {
        console.error("Message send error:", error);
        res.status(500).json({ error: "Failed to send message. Server error." });    
    }
}

export const getMessage = async (req , res) => {
    const {senderId , recieverId , page = 1 , limit = 20} = req.query;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(recieverId)) {
        return res.status(400).json({ error: "Invalid user ID format" });
    }

    try {
        const message = await Message.find({
            $or: [
                {sender : senderId , reciever : recieverId},
                {sender : recieverId , reciever : senderId}
            ]
        })
          .sort({ timestamp : -1}) // Newest First
          .skip((page -1) * limit) //Pagination
          .limit(parseInt(limit))
          .populate('sender' , 'username avatar')
          .populate('reciever' , 'username avatar')
          .exec();

res.status(200).json(message); // ✅ use the correct variable name
    } catch (error) {
        console.error("Fetch messages error:", error);
        res.status(500).json({ error: "Failed to fetch messages" });    
    }
}

export const deleteMessage = async (req, res) => {
    const { messageId, userId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return res.status(400).json({ error: "Invalid message ID" });
    }
  
    try {
      const message = await Message.findOneAndDelete({
        _id: messageId,
        sender: userId  // Ensure only the sender can delete
      });
  
      if (!message) {
        return res.status(404).json({ error: "Message not found or unauthorized" });
      }
  
      res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
      console.error("Delete message error:", error);
      res.status(500).json({ error: "Failed to delete message" });
    }
  };
  
