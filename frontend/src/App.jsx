import Login from "./components/Login";
import Chat from "./components/Chat.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider.jsx";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/*" element={<Chat/>} />
          {/* <Chat/> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
