import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter.js";
import cors from "cors";
import loader from "./loaders/databaseLoader.js";

try {
  await loader({ url: "mongodb://localhost:27017/chat" });
  console.log("Database Connection Established");

  const app = express();

  app.use(
    cors({
      origin: "http://127.0.0.1:3000",
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/auth", authRouter);

  const server = http.createServer(app);
  const ws = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });


  ws.on("connect", (socket) => {
    console.log(`Client ${socket.id} connected`);
  });

  const PORT = 8000;
  server.listen(PORT, () => {
    console.log("Backend Server Started");
  });
} catch (err) {
  console.error(err);
}
