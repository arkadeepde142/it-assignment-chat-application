import * as Service from "../services/index.js";

export function createMessage(socket) {
  return async (payload, callback) => {
    const user = socket.request.locals.user.id;
    const { room, type, bytes } = payload;
    const message = await Service.MessageService.createMessage(
      user,
      room,
      type,
      bytes
    );
    message.source = {email : socket.request.locals.user.email};
    // console.log("message : ", message);
    message._id = message._id.toString();
    socket.to(room).emit(`message_${room}`, message);
    callback(message);
  };
}

export async function getMessages(req, res) {
  const room = req.body.room;
  const messages = await Service.MessageService.getMessages(room);
  res.json({ messages });
}
