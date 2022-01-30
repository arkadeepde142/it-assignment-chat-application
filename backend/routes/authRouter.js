import { Router } from "express";
import {AuthController} from "../controllers/index.js"

const authRouter = Router();

authRouter.post("/", AuthController.signup);

export default authRouter;
