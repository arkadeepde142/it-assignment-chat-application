import * as Service from '../services/index.js';
//C
async function createRoom(payload) {
  const { roomName, userList } = payload;
  await Service.RoomService.createRoom(roomName, userList);
}

//U
async function addToRoom() {}
//U
async function leaveRoom() {}

async function deleteRoom() {}

//R
async function getParticipants() {}

export { createRoom, addToRoom, leaveRoom, getParticipants };
