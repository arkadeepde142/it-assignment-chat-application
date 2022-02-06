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

    return res.json(user);
  } catch (e) {
    return res.status(400).json({ message: "error occurred" });
  }
}

// export function login(socket) {
//   return async (payload, callback) => {
//     const email = payload.email;
//     const password = payload.password;

//     // console.log(email);
//     try {
//       const user = await AuthService.login(email, password);
//       notifier.addSocket(email, socket);
//       const rooms = await RoomService.getRooms(email);
//       // console.log(JSON.stringify(rooms, null, 4));
//       rooms.map((room) => {
//         socket.join(room._id);
//       });
//       callback(user);
//     } catch (err) {
//       callback({ message: "Error Occurred" });
//     }
//     // socket.emit("rooms", rooms);
//   };
// }

export async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await AuthService.login(email, password);
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Wrong Password" });
  }
}
