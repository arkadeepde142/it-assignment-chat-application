import SocketContext from "../contexts/socketContext";
import {useEffect, useState } from "react";
import io from "socket.io-client";
export default function SocketProvider({children, token}) {
  const [socket,setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io('/', {
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
  
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
