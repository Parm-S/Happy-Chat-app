import e from "express";
import { userRouter } from "../userModule/index.js";
import fileRouter from "../fileModule/index.js"

const router = e.Router();

router.use("/user", userRouter);
router.use("/file" , fileRouter)

export { router };
