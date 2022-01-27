import { Router } from "express";
import EventEmitter from "events";

const authRouter = Router();

authRouter.get("/", async (req, res) => {
  res.json({ message: "Hello" });
});

export default authRouter;
