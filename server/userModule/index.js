import e from "express";
import { registerUser, loginUser } from "./Controller/index.js";

const userRouter = e.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export { userRouter };
