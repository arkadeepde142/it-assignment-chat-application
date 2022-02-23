import express from "express";
import http from "node:http";
import * as db from "./models/index.js";
import { Server } from "socket.io";
import authRouter from "./routes/authRouter.js";
import roomRouter from "./routes/roomRouter.js";
import messageRouter from "./routes/messageRouter.js";
import loader from "./loaders/databaseLoader.js";
import notifier from "./utils/NotificationStore.js";
import { AuthService, RoomService } from "./services/index.js";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  AuthController,
  RoomController,
  MessageController,
} from "./controllers/index.js";
import "dotenv/config";
import { verifyToken } from "./middlewares/index.js";
import { randomBytes } from "node:crypto";

try {
  await loader({ url: process.env.DATABASE_URI || "mongodb://localhost:27017/chat" });
  console.log("Database Connection Established");

  const app = express();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  app.use(express.static(resolve(__dirname, "../frontend/build")));

  if (!(await db.User.findOne({ email: "server@server.server" }))) {
    await AuthService.signup("server@server.server", "Bhogoban", "De", randomBytes(256).toString('base64'));
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api/auth", authRouter);
  app.use("/api/room", verifyToken, roomRouter);
  app.use("/api/message", verifyToken, messageRouter);

  const server = http.createServer(app);

  const ws = new Server(server);

  ws.use((socket, next) => verifyToken(socket.request, {}, next));
  ws.on("connect", async (socket) => {
    const email = socket.request.locals.user.email;
    const id = socket.request.locals.user.id;
    console.log(`Client ${email} connected`);
    notifier.addSocket(id, socket);
    const rooms = await RoomService.getRooms(email);
    const ids = rooms.map(async (room) => {
      await socket.join(room._id.toString());
    });

    socket.once("disconnect", async () => {
      notifier.removeSocket(socket);
      console.log(`Client ${email} disconnected`);
    });
    // socket.on("room:join", async (room) => {});
    // socket.on("room:create", RoomController.createRoom);
    // socket.on("room:leave", async (roomID) => {});
    socket.on("message", MessageController.createMessage(socket));
  });

  notifier.on("join", (socket, room, message) => {
    socket.join(room._id.toString());
    console.log("emitting.....");
    ws.to(room._id.toString()).emit("join", room);
    ws.to(room._id.toString()).emit(`notification_${room._id}`, message);
  });
  notifier.on("leave", (socket, room, message) => {
    ws.to(room._id.toString()).emit("leave", room);
    ws.to(room._id.toString()).emit(`message_${room._id}`, message);
    socket.leave(room._id.toString());
  });

  // console.log(process.env.PRIVATE_KEY);
  server.listen(process.env.PORT || 8000, () => {
    console.log("Backend Server Started");
  });
} catch (err) {
  console.error(err);
}
