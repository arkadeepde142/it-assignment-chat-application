import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function CreateRoom() {
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState("");
  const {token} = useAuth()[0];
  const navigate = useNavigate();
  return (
    <div>
      <label htmlFor="name">enter room name</label>
      <input type="text" id="name"></input>

      <label htmlFor="email">enter email to add participant </label>
      <input type="email" id="email"></input>

      <button
        onClick={()=>{setParticipants((participants) => [
          ...participants,
          document.getElementById("email").value,
        ])}}
      >
        Add
      </button>

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
              roomName: document.getElementById("name").value,
              userList: participants,
            }),
          });
          if(response.ok){
              navigate(-1)
          }
          else{
              setError("Room cud not be created !");
          }
        }}
      >
        Create
      </button>
      <div>
          {error}
      </div>
    </div>
  );
}
