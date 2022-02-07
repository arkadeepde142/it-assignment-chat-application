import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const auth = useAuth()[0];
  return auth ? children : <Navigate to="/" replace={true} />;
}
