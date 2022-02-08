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
    socket.to(room).emit("message", message);
    callback(message);
  };
}

export async function getMessages(req, res) {
  const room = req.body.room;
  const messages = await Service.MessageService.getMessages(room);
  res.json({ messages });
}
