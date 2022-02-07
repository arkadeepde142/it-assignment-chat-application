import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import useSocket from "../hooks/useSocket";

export default function Messages() {
  const [messageStore, setMessageStore] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    const messageListener = async (message) => {
      setMessageStore((messageStore) => [...messageStore, message]);
    };
    socket.on("message", messageListener);

    return () => {
      socket.off("message", messageListener);
    };
  }, [socket, setMessageStore]);

  return (
    <div style={{ height: 300, width: 700, marginLeft: 30, marginTop: 20 }}>
      <div style={{ height: 0, width: 100, marginLeft: 100, marginTop: 50 }}>
        <header>
          <h2>Messages</h2>
        </header>
      </div>
      <div style={{ height: 200, width: 500, marginLeft: 60, marginTop: 20}}>
      {messageStore.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
      </div>
      <input type="text" id="message-window"></input>
      <button
        onClick={async () => {
          const messageWindow = document.getElementById("message-window");
          socket.emit("message", messageWindow.value);
        }}
      >
        Send
      </button>
    </div>
  );
}
