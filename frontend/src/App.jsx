import io from "socket.io-client";
import { useEffect, useState } from "react";
import Messages from "./components/Messages";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://127.0.0.1:8000`, {
      withCredentials: true,
    });
    setSocket(newSocket);
    const connectHandler = (s) => {
      console.log("Connected");
    };
    newSocket.on("connect", connectHandler);

    return () => {
      newSocket.off("connect", connectHandler);
      newSocket.close();
    };
  }, [setSocket]);

  return (
    <>
      <header>
        <h2>Chat</h2>
      </header>
      <main>
        {socket ? (
          <Messages socket={socket}></Messages>
        ) : (
          <div>Not connected :(</div>
        )}
      </main>
    </>
  );
}

export default App;
