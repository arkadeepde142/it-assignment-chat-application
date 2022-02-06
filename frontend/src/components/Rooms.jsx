import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useSocket from "../hooks/useSocket";

export default function Rooms() {
  const { state } = useLocation();
  // console.log(useLocation());
  const { token } = state;
  const [roomStore, setRoomStore] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/room", {
        method: "GET",
        mode: "cors",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { rooms } = await response.json();
      setRoomStore(rooms);
    })();
    // setRoomStore(await response.json())
  }, [token]);

  const socket = useSocket(token);

  return socket ? (
    <div style={{ height: 300, width: 700, marginLeft: 330, marginTop: 20 }}>
      <div style={{ height: 50, width: 700, marginLeft: 330, marginTop: 10 }}>
        <header>
          <h2>Chat Rooms</h2>
        </header>
      </div>
      {roomStore.map((room) => (
        <div key={room._id}>{room.name}</div>
      ))}
      <button
        onClick={async () => {
          const response = await fetch("http://localhost:8000/room", {
            method: "POST",
            mode: "cors",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              roomName: "testRoom",
              userList: ["ab@gmail.com"],
            }),
          });
          const room = await response.json();
          setRoomStore((rooms) => [...rooms, room]);
        }}
      >
        Create Room
      </button>
    </div>
  ) : (
    <div>Not Connected</div>
  );
}
