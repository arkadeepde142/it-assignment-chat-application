import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  name: String,
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Room = mongoose.model("Room", RoomSchema);

export default Room;
