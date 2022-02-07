import * as db from "../models/index.js";

export async function createRoom(roomName, userList) {
  const users = await db.User.find({ email: { $in: userList } });
  const room = await db.Room.create({
    name: roomName,
    participants: users.map((user) => user._id),
  });
  console.log(room);
  return room;
}

//U
async function addToRoom() {}
//U
async function leaveRoom() {}

async function deleteRoom() {}

//R
export async function getParticipants(roomID) {
  const participants = (
    await db.Room.findById(roomID, { participants: 1 }).populate("participants")
  ).participants;
  return participants;
}

export async function getRooms(email) {
  const userId = (await db.User.findOne({email}))._id
  const rooms = await db.Room.find({
    participants: { $in: [userId] },
  }).populate({path:"participants", select:"email -_id"});
  // console.log(rooms)
  return rooms
}


