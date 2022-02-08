import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const setAuth = useAuth()[1];
  return (
    <>
      <main style={{height:"100%"}}>
        <div
          style={{
            flex: 1,
            height: "20%",
            width: "100%",
            backgroundColor: "#688A08",
            alignContent: "center",
            justifyContent: "center",
            paddingTop:40
          }}
        
        >
          <h2 style={{ color: "white", textAlign: "center"}}>
            Messenger  
          </h2>
        </div>
        <div style={{marginLeft:'30%', marginTop:'3%' , backgroundColor:'lavender', borderRadius:15, padding:20}}>
          <div>
            {" "}
            <h3>Login</h3>
          </div>
          <div style={{ margin: 15 }}>
            <label htmlFor="email">email : </label>
            <input type="text" id="email"></input>
          </div>
          <div style={{ margin: 15 }}>
            <label htmlFor="password">password : </label>
            <input type="text" id="password"></input>
          </div>
          <div style={{ margin: 15 }}>
            <button
            style={{textAlign:'center', color:'grey', backgroundColor:'#F5D0A9', fontSize:18, padding:10, borderRadius:10}}
              onClick={async () => {
                const emailField = document.getElementById("email");
                const passwordField = document.getElementById("password");
                try {
                  const response = await fetch(
                    "http://localhost:8000/auth/login",
                    {
                      method: "POST",
                      mode: "cors",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify({
                        email: emailField.value,
                        password: passwordField.value,
                      }),
                    }
                  );
                  if (response.ok) {
                    const p = await response.json();
                    console.log(p);
                    //navigate
                    setAuth(p);
                    navigate("/rooms");
                  } else {
                    throw new Error("Wrong password");
                  }
                } catch (e) {
                  // invalid log in ( display error message )
                  console.log("Login Error");
                }
              }}
            >
              Login
            </button>
          </div>
        </div>

        <div style={{marginLeft:'30%', marginTop:'1%' ,backgroundColor:'lavender', borderRadius:15, padding:20}}>
          <div>
            <h3>Sign up</h3>
          </div>
          <div style={{ margin: 15 }}>
            <label htmlFor="email_signup">email : </label>
            <input type="text" id="email_signup"></input>
          </div>
          <div style={{ margin: 15 }}>
            <label htmlFor="password_signup">password : </label>
            <input type="text" id="password_signup"></input>
          </div>

          <div style={{ margin: 15 }}>
            <label htmlFor="fname">first name : </label>
            <input type="text" id="fname"></input>
          </div>

          <div style={{ margin: 15 }}>
            <label htmlFor="lname">last name : </label>
            <input type="text" id="lname"></input>
          </div>

          <div style={{ margin: 15 }}>
            <button
            style={{textAlign:'center', color:'grey', backgroundColor:'#F5D0A9', fontSize:18, padding:10, borderRadius:10}}
              onClick={async () => {
                const emailField = document.getElementById("email_signup");
                const passwordField =
                  document.getElementById("password_signup");
                const lname = document.getElementById("lname");
                const fname = document.getElementById("fname");
                const response = await fetch(
                  "http://localhost:8000/auth/signup",
                  {
                    method: "POST",
                    mode: "cors",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                      email: emailField.value,
                      password: passwordField.value,
                      lastName: lname.value,
                      firstName: fname.value,
                    }),
                  }
                );

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

export default Login;
