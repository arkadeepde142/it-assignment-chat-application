import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function CreateRoom() {
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState("");
  const { token } = useAuth()[0];
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
    <div
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "#688A08",
            alignContent: "center",
            justifyContent: "center",
            paddingTop:10,
            paddingBottom:5
          }}
        
        >
          <h2 style={{ color: "white", textAlign: "center"}}>
            Messenger
          </h2>
        </div>
      <div style={{ backgroundColor:'#F7D358', borderRadius:15, padding:20}}>
          <h2 style={{textAlign:'center'}}>Create New Room</h2>
      </div>
      <div style={{margin:20, alignSelf:'center', backgroundColor:"lavender", padding:20, borderRadius:10}}>
        <label htmlFor="name">enter room name :     </label>
        <input type="text" id="name"></input>
      </div>

      <div style={{margin:20, alignSelf:'center', backgroundColor:"lavender", padding:20, borderRadius:10}}>
        <label htmlFor="email">enter email to add participant :      </label>
        <input type="email" id="email"></input>
      

      <button
      style={{
        textAlign:'center', maxWidth:"20%", alignSelf:'center' ,color:'grey', backgroundColor:'#F5D0A9', fontSize:18, paddingLeft:15, paddingRight:15, borderRadius:10, marginLeft:20
      }}
        onClick={() => {
          setParticipants((participants) => [
            ...participants,
            document.getElementById("email").value,
          ]);
        }}
      >
        Add
      </button>

      </div>

      <button
      style={{
        textAlign:'center', maxWidth:"20%", alignSelf:'center' ,color:'grey', backgroundColor:'#F5D0A9', fontSize:18, paddingLeft:25, paddingRight:25, borderRadius:10, marginTop:20
      }}
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
          if (response.ok) {
            navigate(-1);
          } else {
            setError("Room cud not be created !");
          }
        }}
      >
        Create 
      </button>
      <div>{error}</div>
    </div>
  );
}
