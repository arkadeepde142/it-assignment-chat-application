import Login from "./components/Login";
import Rooms from "./components/Rooms";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/rooms"
            element={
              <RequireAuth>
                <Rooms />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
