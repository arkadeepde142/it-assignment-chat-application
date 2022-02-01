import { useEffect, useState} from "react";
import {useLocation} from "react-router-dom"

export default function Rooms() {
    // const {state} = useLocation();
    console.log(useLocation());
    // const {email} = state;

  const [roomStore, setRoomStore] = useState([]);

  // useEffect(async () => {
  //   const response = await fetch("http://localhost:8000/room", {
  //       method: "GET",
  //       mode: "cors",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify({
  //       email:email
  //       }),
  //   });
  //   console.log(response.JSON)

  // }, []);

  return (
    <div style={{height:300, width:700, marginLeft:330, marginTop:20}}>
      <div  style={{height:50, width:700, marginLeft:330, marginTop:10}}>
      <header>
        <h2>
        Chat Rooms
        </h2>
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
            console.log((await response.json()));
          }}
        >
          Create Room
        </button>
    </div>
  );
}
