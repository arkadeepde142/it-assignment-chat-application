import logo from "./logo.svg";
import "./App.css";
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
      console.log('Connected');
    };
    newSocket.on("connect", connectHandler);

    return () => {
      newSocket.off("connect", connectHandler);
      newSocket.close();
    };
  }, [setSocket]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {socket ? (
          <Messages socket={socket}></Messages>
        ) : (
          <div>Not connected :(</div>
        )}
        <p></p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
