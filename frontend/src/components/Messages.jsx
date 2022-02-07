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
      setMessageStore((messageStore) => [...messageStore, message]);
    };
    socket.on("message", messageListener);

    return () => {
      socket.off("message", messageListener);
    };
  }, [socket]);

  useEffect(() => {
    // async() => {
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
        setMessageStore((messageStore) => [...messageStore, ...result.messages]);
      }
    })();
  }, [room, token]);

  return (
    <div style={{ height: 300, width: 700, marginLeft: 30, marginTop: 20 }}>
      <div style={{ height: 0, width: 100, marginLeft: 100, marginTop: 50 }}>
        <header>
          <h2>Messages</h2>
        </header>
      </div>
      <div style={{ height: 200, width: 500, marginLeft: 60, marginTop: 20 }}>
        {messageStore.map((message, index) => (
          <div key={message._id}>
            <span>{message.source === email ? "Me" : message.source} : </span>
            <span>{message.bytes.toString()}</span>
          </div>
        ))}
      </div>
      <input type="text" id="message-window" />
      <button
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
              setMessageStore((messageStore) => [...messageStore, message]);
            }
          );
        }}
      >
        Send
      </button>
    </div>
  );
}
