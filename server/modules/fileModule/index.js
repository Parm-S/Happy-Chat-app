import express from "express";
import {
  addMultipleFile,
  addSingleFile,
  getFile,
  deleteSingleFile,
  deleteMultipleFile,
} from "./Controller/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("File Upload Module");
});

router.get("/public/:filename", getFile);

router.post("/upload/single", addSingleFile);

router.post("/upload/multiple", addMultipleFile);

router.delete("/delete/:filename", deleteSingleFile);

router.delete("/delete", deleteMultipleFile);

export default router;
