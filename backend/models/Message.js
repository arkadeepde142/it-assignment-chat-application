import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    type: {
      type: String,
      enum: ["text", "image"],
    },
    bytes: {
      type: mongoose.Schema.Types.Buffer,
    }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;
