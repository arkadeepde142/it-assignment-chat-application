import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

export default function Rooms() {
  const { state } = useLocation();
  // console.log(useLocation());
  const { email, token } = state;

  const [roomStore, setRoomStore] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(async () => {
    console.log(state)
    console.log(token)
    if (token) {
      const response = await fetch("http://localhost:8000/room", {
        method: "GET",
        mode: "cors",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const {rooms} = await response.json()
      console.dir(rooms);
    }

    // setRoomStore(await response.json())
  }, [token]);

  useEffect(() => {
    const newSocket = io(`http://127.0.0.1:8000`, {
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSocket(newSocket);
    const connectHandler = (s) => {
      console.log("Connected");
    };
    newSocket.on("connect", connectHandler);
    return () => {
      newSocket.off("connect", connectHandler);
      newSocket.close();
    };
  }, [setSocket]);

  return (
    <div style={{ height: 300, width: 700, marginLeft: 330, marginTop: 20 }}>
      <div style={{ height: 50, width: 700, marginLeft: 330, marginTop: 10 }}>
        <header>
          <h2>Chat Rooms</h2>
        </header>
      </div>
      <button
        onClick={async () => {
          const response = await fetch("http://localhost:8000/room", {
            method: "POST",
            mode: "cors",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              roomName: "testRoom",
              userList: ["arpannandi12@gmail.com"],
            }),
          });
          console.log(await response.json());
        }}
      >
        Create Room
      </button>
    </div>
  );
}
