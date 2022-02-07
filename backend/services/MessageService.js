import * as db from "../models/index.js";

export async function createMessage(userId, roomId,  type, buffer) {
    const user = userId;
    const room = roomId;
    
    const message = await db.Message.create(
        {
            source:user,
            room:room,
            type:type,
            bytes:buffer
        }
    )
    // console.log(message);
    return message;
}