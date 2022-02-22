import { useEffect, useState } from "react";
import { useAuth, useSocket } from "../hooks";
import { useLocation } from "react-router";

export default function Messages() {
  const [messageStore, setMessageStore] = useState([]);
  const socket = useSocket();
  const location = useLocation();
  console.log(location);
  const { room } = location.state;
  const { email, token } = useAuth()[0];
  const [image, setImage] = useState(null);

  // const imageDecoder = (arrayBuffer) =>
  //   new Promise((res, rej) => {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       res(e.target.result);
  //     };
  //     reader.onerror = (e) => {
  //       rej(e);
  //     };
  //     reader.readAsDataURL(new Blob([arrayBuffer]));
  //   });

  useEffect(() => {
    const messageListener = async (message) => {
      if (message.type === "text") {
        const decoder = new TextDecoder();
        const text = decoder.decode(new Uint8Array(message.bytes));
        message = { ...message, bytes: text };
        setMessageStore((messageStore) => [...messageStore, message]);
        console.log(message);
      } else {
        message.url = URL.createObjectURL(
          new Blob([new Uint8Array(message.bytes)])
        );
        setMessageStore((messageStore) => [...messageStore, message]);
      }
    };

    socket.on(`message_${room._id}`, messageListener);

    return () => {
      socket.off(`message_${room._id}`, messageListener);
    };
  }, [socket, room._id]);

  useEffect(() => {
    const notifListener = async (message) => {
      const decoder = new TextDecoder();
      const text = decoder.decode(new Uint8Array(message.bytes));
      message = { ...message, bytes: text };
      setMessageStore((messageStore) => [...messageStore, message]);
      console.log(message);
    };

    socket.on(`notification_${room._id}`, notifListener);

    return () => {
      socket.off(`notification_${room._id}`, notifListener);
    };
  }, [socket, room._id]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/message/", {
        method: "POST",
        mode: "cors",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          room: room,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        const modified = await Promise.all(
          result.messages.map(async (message) => {
            if (message.type === "text") {
              const decoder = new TextDecoder();
              // console.log("hello")
              const text = decoder.decode(Uint8Array.from(message.bytes.data));
              return { ...message, bytes: text };
            }
            const url = URL.createObjectURL(
              new Blob([Uint8Array.from(message.bytes.data).buffer])
            );
            return { ...message, url: url };
          })
        );
        setMessageStore(modified);
        console.log("http request for message store setting");
      }
    })();
  }, [room, token]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div id="try"></div>
      <div
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: "#688A08",
          alignContent: "center",
          justifyContent: "center",
          paddingTop: 10,
          paddingBottom: 5,
        }}
      >
        <h2 style={{ color: "white", textAlign: "center" }}>Messenger</h2>
        <h4 style={{ color: "lavender", textAlign: "center" }}>{email}</h4>
      </div>

      <div
        style={{
          backgroundColor: "#F7D358",
          borderRadius: 15,
          padding: 30,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <label htmlFor="email">enter email : </label>
          <input type="email" id="email"></input>
          <button
            style={{
              textAlign: "center",
              alignSelf: "center",
              color: "grey",
              backgroundColor: "#F5D0A9",
              fontSize: 16,
              padding: 10,
              borderRadius: 10,
              marginLeft: 30,
              flexGrow: 1,
              maxWidth: "30%",
            }}
            onClick={async () => {
              const response = await fetch("http://localhost:8000/room", {
                method: "PUT",
                mode: "cors",
                headers: {
                  "content-type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  roomId: room._id,
                  email: document.getElementById("email").value,
                }),
              });
            }}
          >
            Add participant
          </button>
        </div>
        <h2 style={{ textAlign: "center" }}>{room.name}</h2>
        <button
          style={{
            textAlign: "center",
            alignSelf: "center",
            color: "grey",
            backgroundColor: "#F5D0A9",
            fontSize: 16,
            padding: 10,
            borderRadius: 10,
            marginLeft: 30,
            flexGrow: 1,
            maxWidth: "30%",
          }}
          onClick={async () => {
            const response = await fetch("http://localhost:8000/room", {
              method: "DELETE",
              mode: "cors",
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                roomId: room._id,
              }),
            });
          }}
        >
          Leave Room
        </button>
      </div>

      <div
        style={{
          height: 350,
          maxWidth: "70%",
          marginLeft: "15%",
          marginTop: 20,
          borderColor: "lavender",
          borderStyle: "solid",
          borderWidth: 2,
          borderRadius: 10,
          borderBottomWidth: 0,
          overflowY: "scroll",
          padding: 15,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* {messageStore.map((message, index) => (
          <div key={message._id} style={{maxWidth:"50%", backgroundColor:'lightgrey', padding:10, margin:5, borderRadius:5}}>
            <span>
              {message.source && message.source.email === email
                ? "Me"
                : message.source.email}{" "}
              :{" "}
            </span>
            <span>{message.bytes}</span>
          </div>
        ))} */}

        {messageStore.map((message, index) => (
          <div key={message._id}>
            {message.source.email === "server@server.server" ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    // maxWidth: "60%",
                    // minWidth: "20%",
                    width: "fit-content",
                    borderStyle: "dashed",
                    borderWidth: 1,
                    padding: 10,
                    margin: 5,
                    borderRadius: 5,
                    color: "purple",
                    justifySelf: "center",
                    // marginLeft: "80%",
                  }}
                >
                  {message.bytes}
                </div>
              </div>
            ) : (
              <div>
                {message.source.email === email ? (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div
                      style={{
                        // maxWidth: "60%",
                        // minWidth: "20%",
                        width: "fit-content",
                        backgroundColor: "#D8EC87",
                        padding: 10,
                        margin: 5,
                        borderRadius: 5,
                        // marginLeft: "80%",
                      }}
                    >
                      {message.type === "text" ? (
                        <>{message.bytes}</>
                      ) : (
                        <img
                          src={message.url}
                          alt={`${message.url}`}
                          style={{
                            display: "block",
                            // height: "200px",
                            maxWidth: "300px",
                            objectFit: "contain",
                          }}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      // maxWidth: "60%",
                      // minWidth: "20%",
                      width: "fit-content",
                      backgroundColor: "lightgrey",
                      padding: 10,
                      margin: 5,
                      borderRadius: 5,
                      justifySelf: "flex-end",
                    }}
                  >
                    <div>
                      {message.source.email} :{" "}
                      {message.type === "text" ? (
                        <>{message.bytes}</>
                      ) : (
                        <img
                          src={message.url}
                          alt={`${message.url}`}
                          style={{
                            display: "block",
                            // height: "200px",
                            maxWidth: "300px",
                            objectFit: "contain",
                            // marginLeft:"20%"
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* <span>{message.bytes}</span> */}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          maxWidth: "70%",
          backgroundColor: "lavender",
          padding: 15,
          borderRadius: 5,
          marginLeft: "15%",
          fontSize: 17,
        }}
      >
        <input
          type="text"
          id="message-window"
          style={{ maxWidth: "80%", borderRadius: 5, flexGrow: 1 }}
        />
        <button
          style={{
            textAlign: "center",
            alignSelf: "center",
            color: "grey",
            backgroundColor: image != null ? "black" : "#F5D0A9",
            fontSize: 18,
            padding: 10,
            borderRadius: 10,
            marginLeft: 30,
            flexGrow: 1,
            maxWidth: "20%",
          }}
          onClick={() => {
            const imageInput = document.getElementById("image");
            imageInput.click();
          }}
        >
          Image
        </button>
        <input
          type="file"
          style={{ display: "none" }}
          id="image"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            console.log(e.target.files[0]);
            const reader = new FileReader();
            reader.onload = (e) => {
              setImage(e.target.result);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
          }}
        />
        <button
          style={{
            textAlign: "center",
            alignSelf: "center",
            color: "grey",
            backgroundColor: "#F5D0A9",
            fontSize: 18,
            padding: 10,
            borderRadius: 10,
            marginLeft: 30,
            flexGrow: 1,
            maxWidth: "20%",
          }}
          onClick={async () => {
            const messageWindow = document.getElementById("message-window");
            if (image) {
              console.log(
                URL.createObjectURL(
                  new Blob([image], {
                    type: "image/png",
                  })
                )
              );
              socket.emit(
                "message",
                {
                  room: room._id,
                  bytes: image,
                  type: "image",
                },
                (message) => {
                  message.url = URL.createObjectURL(
                    new Blob([new Uint8Array(message.bytes).buffer], {
                      type: "image/png",
                    })
                  );
                  console.log(message.url);
                  setMessageStore((messageStore) => [...messageStore, message]);
                }
              );
            } else {
              socket.emit(
                "message",
                {
                  room: room._id,
                  bytes: messageWindow.value,
                  type: "text",
                },
                (message) => {
                  const decoder = new TextDecoder();
                  const text = decoder.decode(new Uint8Array(message.bytes));
                  message = { ...message, bytes: text };
                  setMessageStore((messageStore) => [...messageStore, message]);
                }
              );
            }
            messageWindow.value = "";
            setImage(null);
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
