import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function useSocket(token) {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(`http://127.0.0.1:8000`, {
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
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
  }, [token]);
  return socket;
}
