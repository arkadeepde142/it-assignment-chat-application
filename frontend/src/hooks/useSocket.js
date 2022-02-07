import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import socketContext from "../contexts/socketContext";

export default function useSocket() {
  const socket = useContext(socketContext)
  return socket;
}
