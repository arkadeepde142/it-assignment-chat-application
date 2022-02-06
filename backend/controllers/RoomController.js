import * as Service from "../services/index.js";
//C
async function createRoom(req, res) {
  const { roomName, userList } = req.body;
  const room = await Service.RoomService.createRoom(roomName, userList);
  return res
    .status(200)
    .json({ roomId: room._id, roomName: room.name, userList: userList });
}

async function getRooms(req, res) {
  // console.log(req.locals.user);
  const { email } = req.locals.user;
  const rooms = Service.RoomService.getRooms(email);
  return res.status(200).json(rooms);
}

//U
async function addToRoom() {}
//U
async function leaveRoom() {}

async function deleteRoom() {}

//R
async function getParticipants() {}

export { createRoom, addToRoom, leaveRoom, getParticipants, getRooms };
