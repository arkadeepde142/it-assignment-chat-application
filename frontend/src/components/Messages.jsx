import { useEffect, useState } from "react";

export default function Messages({ socket }) {
  const [messageStore, setMessageStore] = useState([]);

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
    <div>
      <div>Messages</div>
      {messageStore.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
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
