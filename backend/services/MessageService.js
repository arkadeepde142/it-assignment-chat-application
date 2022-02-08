import * as db from "../models/index.js";

export async function createMessage(userId, roomId, type, buffer) {
  const user = userId;
  const room = roomId;

  const message = await db.Message.create({
    source: user,
    room: room,
    type: type,
    bytes: buffer,
  })

  // const messagePop = await message.populate("source", "email -_id");
  // console.log(message);
  const result = {
    _id: message._id,
    source: message.source,
    type: message.type,
    bytes: message.bytes,
    createdAt: message.createdAt,
  };
  // console.log(result);
  return result;
}

export async function getMessages(room) {
  const messages = await db.Message.find({ room }).populate(
    "source",
    "email -_id"
  );
  return messages;
}
