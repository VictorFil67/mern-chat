import { Schema, model } from "mongoose";

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    messages: [{ type: Schema.Types.ObjectId, ref: "message", default: [] }],
  },
  { timestamps: true }
);

const Conversation = model("conversation", conversationSchema);

export default Conversation;
