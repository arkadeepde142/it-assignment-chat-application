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
export async function addToRoom(roomId, email) {
  const user = await db.User.findOne({ email: { $in: email } });
  console.log(user);
  console.log(`id = ${user._id}`);
  const room = await new Promise((res, rej) =>
    db.Room.findByIdAndUpdate(
      roomId,
      { $push: { participants: user._id} },
      { new: true }
    ).exec((err, doc) => {
      if (err) rej(err);
      else res(doc);
    })
  );
  // console.log(room);
  return room;
}
//U
export async function leaveRoom(roomId, email) {
  const user = await db.User.findOne({ email: { $in: email } });
  const room = await db.Room.findByIdAndUpdate(
    roomId,
    { $pull: { participants: user._id } },
    { new: true }
  ).exec();
  // console.log(room);
  return room;
}

async function deleteRoom(roomId, user_id) {}

//R
export async function getParticipants(roomID) {
  const participants = (
    await db.Room.findById(roomID, { participants: 1 }).populate("participants")
  ).participants;
  return participants;
}

export async function getRooms(email) {
  const userId = (await db.User.findOne({ email }))._id;
  const rooms = await db.Room.find({
    participants: { $in: [userId] },
  }).populate({ path: "participants", select: "email -_id" });
  // console.log(rooms)
  return rooms;
}
