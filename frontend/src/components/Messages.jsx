import { useEffect, useState } from "react";

export default function Messages({ socket }) {
  const [messageStore, setMessageStore] = useState([]);

  useEffect(() => {
    const messageListener = async (message) => {
      setMessageStore((messageStore) => [...messageStore, message]);
    };
    socket.on("message", messageListener);

    return () => {
      socket.off("message", messageListener);
    };
  }, [socket, setMessageStore]);

  return (
    <div>
      <div>Messages</div>
      {messageStore.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
      <input type="text" id="message-window"></input>
      <button
        onClick={async () => {
          const messageWindow = document.getElementById("message-window");
          socket.emit("message", messageWindow.value);
        }}
      >
        Send
      </button>

      <div>Login</div>
      <div>
        <label for="email">email :</label>
        <input type="text" id="email"></input>
      </div>
      <div>
        <label for="password">password :</label>
        <input type="text" id="password"></input>
      </div>
      <div>
        <button
          onClick={async () => {
            const emailField = document.getElementById("email");
            const passwordField = document.getElementById("password");
            socket.emit("login", {
              email: emailField.value,
              password: passwordField.value,
            });
          }}
        >
          Login
        </button>
      </div>

      <div>Sign up</div>
      <div>
        <label for="email_signup">email :</label>
        <input type="text" id="email_signup"></input>
      </div>
      <div>
        <label for="password_signup">password :</label>
        <input type="text" id="password_signup"></input>
      </div>

      <div>
        <label for="fname">first name :</label>
        <input type="text" id="fname"></input>
      </div>

      <div>
        <label for="lname">last name :</label>
        <input type="text" id="lname"></input>
      </div>

      <div>
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
  );
}
