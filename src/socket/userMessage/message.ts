import { Types } from "mongoose";
import { io } from "../socket";
import { MessageServices } from "../../app/modules/message/message.service";

export const handleSendMessage = (data: {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  message?: string;
  image?: string;
}) => {
  console.log("outer", data.senderId, data.receiverId);
  io.emit(`receiver-${data.receiverId}`, {
    senderId: data.senderId,
    receiverId: data.receiverId,
    message: data.message,
    image: data.image,
    isRead: false,
  });

  if (data.message && data.receiverId && data.senderId) {
    console.log("inner", data);
    MessageServices.createMessage({
      sender: new Types.ObjectId(data.senderId),
      receiver: new Types.ObjectId(data.receiverId),
      message: data.message,
      isRead: false,
    });
  }
};
