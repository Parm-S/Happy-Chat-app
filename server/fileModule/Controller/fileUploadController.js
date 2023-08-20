// fileUploadModule/fileUpload.js

import path from "path";
import fs from "fs";
import { uploadSingle, uploadMultiple } from "../middleware/index.js";
import {
  ERROR_FILE_NOT_FOUND,
  ERROR_MISSING_FILE,
  ERROR_MISSING_FILES,
  ERROR_UPLOAD_FAILED,
} from "../constant/index.js";

const getFile = (req, res, next) => {
  const filePath = path.join(__dirname, "..", "uploads", req.params.filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      const error = new Error(ERROR_FILE_NOT_FOUND.message);
      error.status = ERROR_FILE_NOT_FOUND.code;
      return next(error);
    }

    res.sendFile(filePath);
  });
};

const addSingleFile = (req, res, next) => {
  uploadSingle(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer-related errors
      return res
        .status(400)
        .json({ error: "Multer error", message: err.message });
    } else if (err === ERROR_MISSING_FILE) {
      return res
        .status(ERROR_MISSING_FILE.code)
        .json({ error: ERROR_MISSING_FILE.message });
    } else if (err) {
      // Other errors
      return res
        .status(ERROR_UPLOAD_FAILED.code)
        .json({ error: ERROR_UPLOAD_FAILED.message, message: err.message });
    }

    // File upload successful
    const fileUrl = `${req.protocol}://${req.get("host")}/file/public/${
      req.file.filename
    }`;
    res.status(200).json({ message: "File uploaded successfully", fileUrl });
  });
};

const addMultipleFile = (req, res, next) => {
  uploadMultiple(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer-related errors
      return res
        .status(400)
        .json({ error: "Multer error", message: err.message });
    } else if (err === ERROR_MISSING_FILES) {
      return res
        .status(ERROR_MISSING_FILES.code)
        .json({ error: ERROR_MISSING_FILES.message });
    } else if (err) {
      // Other errors
      return res
        .status(ERROR_UPLOAD_FAILED.code)
        .json({ error: ERROR_UPLOAD_FAILED.message, message: err.message });
    }

    // Files upload successful
    const fileUrls = req.files.map(
      (file) =>
        `${req.protocol}://${req.get("host")}/file/public/${file.filename}`
    );
    res.status(200).json({ message: "Files uploaded successfully", fileUrls });
  });
};

export { getFile, addSingleFile, addMultipleFile };
