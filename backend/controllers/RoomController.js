import * as Service from "../services/index.js";
import notifier from "../utils/NotificationStore.js";
//C
export async function createRoom(req, res) {
  const { roomName, userList } = req.body;
  const email = req.locals.user.email;
  userList.push(email);
  const room = await Service.RoomService.createRoom(roomName, userList);
  const serverUser = await Service.AuthService.getIdByEmail("server@server.server");


  const zip = userList.map((user, index)=>[user,room.participants[index]])

  for( const [email, userId] of zip){
    const message = await Service.MessageService.createMessage(
      serverUser._id,
      room._id,
      "text",
      `${email} joined`
    )
    message.source = {email:"server@server.server"};
    message._id = message._id.toString();
    notifier.emit("join", userId, room, message);
  }
  return res
    .status(200)
    .json({ _id: room._id, name: room.name, participants: room.participants });
}

export async function getRooms(req, res) {
  // console.log(req.locals.user);
  const { email } = req.locals.user;
  const rooms = await Service.RoomService.getRooms(email);
  return res.status(200).json({ rooms });
}

//U
export async function addToRoom(req, res) {
  const { roomId, email } = req.body;
  const room = await Service.RoomService.addToRoom(roomId, email);
  const userId = await Service.AuthService.getIdByEmail(email);
  const serverUser = await Service.AuthService.getIdByEmail("server@server.server");
  const message = await Service.MessageService.createMessage(
    serverUser._id,
    roomId,
    "text",
    `${email} joined`
  )
  message.source = {email:"server@server.server"};
  // console.log(message)
  message._id = message._id.toString();
  notifier.emit("join",userId, room, message);
  return res
    .status(200)
    .json({ _id: room._id, name: room.name, participants: room.participants });
}
//U
export async function leaveRoom(req, res) {
  const { roomId } = req.body;
  const email = req.locals.user.email;
  const room = await Service.RoomService.leaveRoom(roomId, email);
  const serverUser = await Service.AuthService.getIdByEmail("server@server.server");
  const message = await Service.MessageService.createMessage(
    serverUser._id,
    roomId,
    "text",
    `${email} left`
  )
  message.source = {email:"server@server.server"};
  message._id = message._id.toString();
  notifier.emit("leave", req.locals.user.id, room, message);
  return res
    .status(200)
    .json({ _id: room._id, name: room.name, participants: room.participants });
}

export async function deleteRoom() {}

//R
export async function getParticipants() {}
