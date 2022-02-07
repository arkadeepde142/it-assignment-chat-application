import UserContext from "../contexts/userContext";
import { useState } from "react";
export default function AuthProvider({children}) {
  const auth = useState(null);
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
}
