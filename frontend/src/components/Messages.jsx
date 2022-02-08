import { useEffect, useState } from "react";
import { useAuth, useSocket } from "../hooks";
import { useLocation } from "react-router";

export default function Messages() {
  const [messageStore, setMessageStore] = useState([]);
  const socket = useSocket();
  const location = useLocation();
  console.log(location);
  const { room } = location.state;
  const { email, token } = useAuth()[0];

  useEffect(() => {
    const messageListener = async (message) => {
      // message = await new Blob(message.bytes.data).text();
      const decoder = new TextDecoder();
      // console.log("hello")
      const text = decoder.decode(new Uint8Array(message.bytes));
      message = { ...message, bytes: text };
      setMessageStore((messageStore) => [...messageStore, message]);
      console.log(message);
    };
    socket.on("message", messageListener);

    return () => {
      socket.off("message", messageListener);
    };
  }, [socket]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/message/", {
        method: "POST",
        mode: "cors",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          room: room,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        const modified = await Promise.all(
          result.messages.map(async (message) => {
            const decoder = new TextDecoder();
            // console.log("hello")
            const text = decoder.decode(Uint8Array.from(message.bytes.data));
            return { ...message, bytes: text };
          })
        );
        setMessageStore((messageStore) => [...messageStore, ...modified]);
      }
    })();
  }, [room, token]);

  return (
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
      </div>

      <div
        style={{ backgroundColor: "#F7D358", borderRadius: 15, padding: 20 }}
      >
        <h2 style={{ textAlign: "center" }}>{room.name}</h2>
      </div>

      <div
        style={{
          height: 350,
          maxWidth: "70%",
          marginLeft: "15%",
          marginTop: 20,
          borderColor: "lavender",
          borderStyle:'solid',
          borderWidth: 2,
          borderRadius: 10,
          borderBottomWidth:0,
          overflowY : "scroll",
          padding:15
        }}
      >
        {messageStore.map((message, index) => (
          <div key={message._id} style={{maxWidth:"50%", backgroundColor:'lightgrey', padding:10, margin:5, borderRadius:5}}>
            <span>
              {message.source && message.source.email === email
                ? "Me"
                : message.source.email}{" "}
              :{" "}
            </span>
            <span>{message.bytes}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          maxWidth: "70%",
          backgroundColor: "lavender",
          padding: 15,
          borderRadius: 5,
          marginLeft: "15%",
        }}
      >
        <input
          type="text"
          id="message-window"
          style={{ maxWidth: "80%", borderRadius: 5, flexGrow: 1 }}
        />
        <button
          style={{
            textAlign: "center",
            alignSelf: "center",
            color: "grey",
            backgroundColor: "#F5D0A9",
            fontSize: 18,
            padding: 10,
            borderRadius: 10,
            marginLeft: 30,
            flexGrow: 1,
            maxWidth: "20%",
          }}
          onClick={async () => {
            const messageWindow = document.getElementById("message-window");
            socket.emit(
              "message",
              {
                room: room._id,
                bytes: messageWindow.value,
                type: "text",
              },
              (message) => {
                console.log(message);
                const decoder = new TextDecoder();
                const text = decoder.decode(new Uint8Array(message.bytes));
                message = { ...message, bytes: text };
                console.log(message);
                setMessageStore((messageStore) => [...messageStore, message]);
              }
            );
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
