import e from "express";
import { userRouter } from "../modules/userModule/index.js";
import fileRouter from "../modules/fileModule/index.js";

const router = e.Router();

router.use("/user", userRouter);
router.use("/file", fileRouter);

export { router };
