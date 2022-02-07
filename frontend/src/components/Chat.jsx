import Rooms from "./Rooms.jsx";
import Messages from "./Messages.jsx";
import RequireAuth from "./RequireAuth.jsx";
import SocketProvider from "../providers/SocketProvider.jsx";
import useAuth from "../hooks/useAuth";
import { Routes, Route } from "react-router-dom";
import CreateRoom from "./CreateRoom.jsx";


function Chat() {
    const auth = useAuth()[0]

  return auth?(

    <SocketProvider token={auth.token}>
    <Routes>
      <Route
        exact
        path="/rooms"
        element={
          <RequireAuth>
            <Rooms />
          </RequireAuth>
        }
      />
      <Route
        exact
        path="/messages"
        element={
          <RequireAuth>
            <Messages />
          </RequireAuth>
        }
      />
      <Route
      exact
      path="/createroom"
      element={
        <RequireAuth>
          <CreateRoom/>
        </RequireAuth>
      }
      />
      </Routes>
    </SocketProvider>

  ):null;
}

export default Chat;
