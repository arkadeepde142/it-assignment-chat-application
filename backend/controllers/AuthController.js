import { AuthService } from "../services/index.js";
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
  return async (payload) => {
    const email = payload.email;
    const password = payload.password;

    // console.log(email);
    if (await AuthService.login(email, password)) {
      notifier.addSocket(payload.email, socket);
    }
    else{
        socket.emit("error")
        socket.close();
    }
  };
}
