import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      requared: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      requared: true,
    },
    message: {
      type: String,
      requared: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Message = model("message", messageSchema);

export default Message;
