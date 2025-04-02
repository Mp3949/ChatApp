import { Conversation } from "../models/convesationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;
        let gotCoversations = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!gotCoversations) {
            gotCoversations = await Conversation.create({
                participants: [senderId, receiverId],
            })
        };

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            gotCoversations.messages.push(newMessage._id);
        };
        // await gotCoversations.save();
        await Promise.all([gotCoversations.save(), newMessage.save()])

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }


        return res.status(200).json({
            newMessage
        })
        //SOCKET.IO



    } catch (error) {
        console.log(error);
    }
};

export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");
        // console.log(conversation.messages);
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log(error);
    }
}