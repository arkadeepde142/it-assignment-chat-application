import { Router } from "express";
import {RoomController} from "../controllers/index.js"

const roomRouter = Router();

roomRouter.post("/", RoomController.createRoom);

roomRouter.get("/", RoomController.getRooms);

export default roomRouter;