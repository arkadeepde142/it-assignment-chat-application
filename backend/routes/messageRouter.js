import { Router } from "express";
import {MessageController} from "../controllers/index.js"

const authRouter = Router();

authRouter.post("/", MessageController.getMessages);

export default authRouter;