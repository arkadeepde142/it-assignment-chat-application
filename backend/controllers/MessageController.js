import * as Service from "../services/index.js";

export default function createMessage(socket){
    return async(payload, callback)=>{
        const user = socket.request.locals.user.id;
        const {room, type, bytes} = payload
        const message = await Service.MessageService.createMessage(user, room, type, bytes);
        socket.to(room).emit("message", message)
        callback(message)
    }  
}