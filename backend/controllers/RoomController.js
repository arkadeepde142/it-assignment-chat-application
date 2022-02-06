import * as Service from "../services/index.js";
//C
export async function createRoom(req, res) {
  const { roomName, userList } = req.body;
  const room = await Service.RoomService.createRoom(roomName, userList);
  return res
    .status(200)
    .json({ _id: room._id, name: room.name, participants: room.participants });
}

export async function getRooms(req, res) {
  // console.log(req.locals.user);
  const { email } = req.locals.user;
  const rooms = await Service.RoomService.getRooms(email);
  console.log(rooms);
  return res.status(200).json({ rooms });
}

//U
export async function addToRoom() {}
//U
export async function leaveRoom() {}

export async function deleteRoom() {}

//R
export async function getParticipants() {}
