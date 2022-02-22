import { Router } from "express";
import {RoomController} from "../controllers/index.js"

const roomRouter = Router();

roomRouter.post("/", RoomController.createRoom);

roomRouter.put("/", RoomController.addToRoom);

roomRouter.delete("/", RoomController.leaveRoom);

roomRouter.get("/", RoomController.getRooms);

export default roomRouter;