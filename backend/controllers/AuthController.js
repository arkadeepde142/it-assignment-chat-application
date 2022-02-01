import { AuthService, RoomService } from "../services/index.js";
import notifier from "../utils/NotificationStore.js";

export async function signup(req, res) {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
//   console.log({email, firstName, lastName, password})
  try {
    const user = await AuthService.signup(email, firstName, lastName, password);

    return res.json({ message: "signed up successfully" });
  } catch (e) {
    return res.status(400).json({ message: "error occurred" });
  }
}

export function login(socket) {
  return async (payload, callback) => {
    const email = payload.email;
    const password = payload.password;

    // console.log(email);
    const userId = await AuthService.login(email, password);
    if (userId){
      notifier.addSocket(payload.email, socket);
      const rooms = await RoomService.getRooms(email);
      // console.log(JSON.stringify(rooms, null, 4));
      rooms.map((room)=>{socket.join(room._id)})
      callback({message:"logged in successfully"});
      // socket.emit("rooms", rooms);
    }
    else{
        socket.emit("error")
        socket.close();
    }
  };
}
