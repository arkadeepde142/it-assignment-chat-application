import { useContext } from "react";
import socketContext from "../contexts/socketContext";

export default function useSocket() {
  const socket = useContext(socketContext)
  return socket;
}
