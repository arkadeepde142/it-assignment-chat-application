import * as db from "../models/index.js";

export async function createMessage(userId, roomId, type, buffer) {
  const user = userId;
  const room = roomId;

  const message = await db.Message.create({
    source: user,
    room: room,
    type: type,
    bytes: buffer,
  });
  // console.log(message);
  const result = {
    _id: message._id,
    source: message.source,
    type: type,
    bytes: buffer,
    createdAt: message.createdAt,
  };
  // console.log(result);
  return result;
}

export async function getMessages(room) {
  const messages = await db.Message.find({ room });
  return messages;
}
