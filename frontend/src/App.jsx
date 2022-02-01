import io from "socket.io-client";
import { useEffect, useState } from "react";
import Messages from "./components/Messages";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  return (
    <>
      <header style={{marginLeft:550, marginTop:10}}>
        <h2>Landing Page</h2>
      </header>
      <main>
        {/* {socket ? (
          <Messages socket={socket}></Messages>
        ) : (
          <div>Not connected :(</div>
        )} */}
        <div style={{marginLeft:350, marginTop:100}}>
          <div> <h3>Login</h3></div>
          <div style={{ margin: 15 }}>
            <label htmlFor="email">email :  </label>
            <input type="text" id="email"></input>
          </div>
          <div style={{ margin: 15 }}>
            <label htmlFor="password">password :  </label>
            <input type="text" id="password"></input>
          </div>
          <div style={{ margin: 15 }}>
            <button
              onClick={async () => {
                const emailField = document.getElementById("email");
                const passwordField = document.getElementById("password");
                socket.emit(
                  "login",
                  {
                    email: emailField.value,
                    password: passwordField.value,
                  },
                  (res) => {
                    navigate("/rooms", {
                      state: { socket: socket, email: emailField.value },
                    });
                  }
                );
              }}
            >
              Login
            </button>
          </div>
        </div>

        <div style={{marginLeft:350, marginTop:100}}>

        <div><h3>Sign up</h3></div>
        <div style={{ margin: 15 }}>
          <label htmlFor="email_signup">email :  </label>
          <input type="text" id="email_signup"></input>
        </div>
        <div style={{ margin: 15 }}>
          <label htmlFor="password_signup">password :  </label>
          <input type="text" id="password_signup"></input>
        </div>

        <div style={{ margin: 15 }}>
          <label htmlFor="fname">first name :  </label>
          <input type="text" id="fname"></input>
        </div>

        <div style={{ margin: 15 }}>
          <label htmlFor="lname">last name :  </label>
          <input type="text" id="lname"></input>
        </div>

        <div style={{ margin: 15 }}>
          <button
            onClick={async () => {
              const emailField = document.getElementById("email_signup");
              const passwordField = document.getElementById("password_signup");
              const lname = document.getElementById("lname");
              const fname = document.getElementById("fname");
              const response = await fetch("http://localhost:8000/auth", {
                method: "POST",
                mode: "cors",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  email: emailField.value,
                  password: passwordField.value,
                  lastName: lname.value,
                  firstName: fname.value,
                }),
              });

              console.log(await response.json());
            }}
          >
            Signup
          </button>
        </div>
        </div>
      </main>
    </>
  );
}

export default App;
