import { useEffect, useState } from "react";

export default function Messages({ socket }) {
  const [messageStore, setMessageStore] = useState([]);

  useEffect(() => {
    const messageListener = (message) => {
      setMessageStore((messageStore) => {
        messageStore.push(message);
        return messageStore;
      });
    };

    socket.on("message", messageListener);

    return () => {
      socket.off("message", messageListener);
    };
  }, [socket]);

  return (
    <div>
      {messageStore.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
}
