import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useSocket from "../hooks/useSocket";

export default function Rooms() {
  // const { state } = useLocation();
  // console.log(useLocation());
  console.log("loaded...");
  const auth = useAuth()[0];
  const { email, token } = auth;
  const [roomStore, setRoomStore] = useState(new Map());
  const socket = useSocket();
  const navigate = useNavigate();

  // const [participants, setParticipants] = useState([]);
  // const [show, setShow] = useState(false);

  useEffect(() => {
    (async () => {
      console.log("Fetch");
      const response = await fetch("http://localhost:8000/room", {
        method: "GET",
        mode: "cors",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { rooms } = await response.json();
      const map = new Map();
      for(const room of rooms)
      {
        map.set(room._id, room);
      }
      setRoomStore(map);
    })();
  }, [token]);

  useEffect(() => {
    console.log("HEHE");
    const cb = (room) => {
      setRoomStore((roomStore) => {
        const map = new Map(roomStore);
        map.set(room._id, room);
        console.log(map);
        return map;
      });
    };

    if (socket) {
      socket.on("join", cb);
    }
    return () => {
      if (socket) {
        socket.off("join", cb);
      }
    };
  }, [socket]);

  return socket ? (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: "#688A08",
          alignContent: "center",
          justifyContent: "center",
          paddingTop: 10,
          paddingBottom: 5,
        }}
      >
        <h2 style={{ color: "white", textAlign: "center" }}>Messenger</h2>
        <h4 style={{ color: "lavender", textAlign: "center" }}>{email}</h4>
      </div>
      <div
        style={{ backgroundColor: "#F7D358", borderRadius: 15, padding: 20 }}
      >
        <h2 style={{ textAlign: "center" }}>Chat Rooms</h2>
      </div>

      <button
        style={{
          textAlign: "center",
          maxWidth: "20%",
          alignSelf: "center",
          color: "grey",
          backgroundColor: "#F5D0A9",
          fontSize: 18,
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
          marginBottom: 10,
        }}
        onClick={() => {
          navigate("/createroom");
        }}
      >
        Create New Room
      </button>

      {Array.from(roomStore.values(), (room) => (
        <Link
          to={{ pathname: "/messages" }}
          state={{ room }}
          key={room._id}
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              width: "90%",
              height: "10%",
              marginBottom: 30,
              marginLeft: 15,
              marginTop: 5,
              padding: 20,
              borderRadius: 10,
              color: "black",
              textAlign: "left",
              paddingLeft: 80,
              backgroundColor: "lavender",
            }}
          >
            {room.name}
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div>Not Connected</div>
  );
}
