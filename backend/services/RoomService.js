import * as db from "../models/index.js";

export async function createRoom(roomName, userList) {
  const users = await db.User.find({ email: { $in: userList } });
  const room = await db.Room.create({ name: roomName, participants: users.map((user) => user._id) });
  return room;
}

//U
async function addToRoom() {}
//U
async function leaveRoom() {}

async function deleteRoom() {}

//R
export async function getParticipants(roomID) {
    const participants = await db.Room.findById(roomID).populate('participants');
    return participants;
}
