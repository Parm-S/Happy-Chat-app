import express from "express";
import {
  addMultipleFile,
  addSingleFile,
  getFile,
} from "../Controller/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("File Upload Module");
});

router.get("/public/:filename", getFile);

router.post("/upload/single", addSingleFile);

router.post("/upload/multiple", addMultipleFile);

export default router;
