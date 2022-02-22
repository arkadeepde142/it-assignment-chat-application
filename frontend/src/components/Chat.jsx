import Rooms from "./Rooms";
import Messages from "./Messages";
import SocketProvider from "../providers/SocketProvider";
import { useAuth } from "../hooks";
import { Routes, Route } from "react-router-dom";
import CreateRoom from "./CreateRoom";

function Chat() {
  const auth = useAuth()[0];
  console.log(auth);
  return auth ? (
    <SocketProvider token={auth.token}>
      <Routes>
        <Route exact path="/rooms" element={(() =>{console.log("Reload");return <Rooms />})()} />
        <Route exact path="/messages" element={<Messages />} />
        <Route exact path="/createroom" element={<CreateRoom />} />
      </Routes>
    </SocketProvider>
  ) : null;
}

export default Chat;
