// fileUploadModule/middleware/fileUploadMiddleware.js

import express from "express";
import path from "path";
import multer from "multer";
import fs from "fs";
import { config } from "../config/index.js";
import {
  ERROR_FOLDER_CREATION_FAILED, // Add this import
} from "../constant/index.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const extname = path.extname(file.originalname).toLowerCase();

    let folder;
    if (config.imageFileExtensions.includes(extname)) {
      folder = "uploads/images";
    } else if (config.documentFileExtensions.includes(extname)) {
      const documentFolder = config.documentFolders[extname] || "other";
      folder = `uploads/documents/${documentFolder}`;
    } else {
      folder = "uploads/other";
    }

    // Ensure the destination folder exists
    ensureFolderExists(folder);

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${path.basename(file.originalname)}`;
    cb(null, fileName);
  },
});

const ensureFolderExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    try {
      fs.mkdirSync(folderPath, { recursive: true });
    } catch (error) {
      throw new Error(ERROR_FOLDER_CREATION_FAILED.message);
    }
  }
};

const uploadSingle = multer({
  storage: storage,
  limits: {
    fileSize: config.maxFileSize,
  },
}).single("file");

const uploadMultiple = multer({
  storage: storage,
  limits: {
    fileSize: config.maxFileSize,
  },
}).array("files", config.maxSize);

router.use("/public", express.static(path.join(__dirname, "../public")));

export { uploadSingle, uploadMultiple };
