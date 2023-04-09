import e from "express";
import { userRouter } from "../userModule/index.js";

const router = e.Router();

router.use("/user", userRouter);

export { router };
