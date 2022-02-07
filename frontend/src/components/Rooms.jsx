import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useSocket from "../hooks/useSocket";

export default function Rooms() {
  // const { state } = useLocation();
  // console.log(useLocation());
  const auth = useAuth()[0];
  const { token } = auth;
  const [roomStore, setRoomStore] = useState([]);
  const socket = useSocket();
  const navigate = useNavigate();
  
  // const [participants, setParticipants] = useState([]);
  // const [show, setShow] = useState(false);
  
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



  return socket ? (
    <div style={{ height: 300, width: 700, marginLeft: 330, marginTop: 20 }}>
      <div style={{ height: 50, width: 700, marginLeft: 330, marginTop: 10 }}>
        <header>
          <h2>Chat Rooms</h2>
        </header>
      </div>
      {roomStore.map((room) => (
        <Link to={{pathname:'/messages'}}  key={room._id}>
        <div style={{width:400, height:40, margin:30, padding:15, color:'black', textAlign:'center', backgroundColor:'light-gray'}}>{room.name}</div>
        </Link>
      ))}
      <button
        onClick={
          ()=>{
            navigate('/createroom');
          }
        }
      >
        Create Room
      </button>
    </div>
  ) : (
    <div>Not Connected</div>
  );
}
