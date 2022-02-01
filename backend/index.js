import express from "express";
import http from "node:http";
import * as db from "./models/index.js";
import { Server } from "socket.io";
import authRouter from "./routes/authRouter.js";
import roomRouter from "./routes/roomRouter.js";
import cors from "cors";
import loader from "./loaders/databaseLoader.js";
import notifier from "./utils/NotificationStore.js";
import {AuthService} from "./services/index.js"
import { AuthController, RoomController } from "./controllers/index.js"; 



try {
  await loader({ url: "mongodb://localhost:27017/chat" });
  console.log("Database Connection Established");

  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/auth", authRouter);
  app.use("/room", roomRouter);

  const server = http.createServer(app);
  const ws = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  // const res= await AuthService.login("arpannandi12@gmail.com","12345678");
  // console.log(res)
  // await 
  ws.on("connect", (socket) => {
    console.log(`Client ${socket.id} connected`);
    socket.once("disconnect", async () => {
      notifier.removeSocket(socket);
      console.log(`Client ${socket.id} disconnected`);
    });
    socket.on("login", AuthController.login(socket));
    socket.on("room:join", async (room) => {});
    socket.on("room:create", RoomController.createRoom);
    socket.on("room:leave", async (roomID) => {});
    // socket.on("message:broadcast");
  });

  const PORT = 8000;
  server.listen(PORT, () => {
    console.log("Backend Server Started");
  });
} catch (err) {
  console.error(err);
}
