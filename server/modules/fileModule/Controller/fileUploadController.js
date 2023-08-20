import path from "path";
import fs from "fs";
import { uploadSingle, uploadMultiple } from "../middleware/index.js";
import {
  ERROR_FILE_NOT_FOUND,
  ERROR_MISSING_FILE,
  ERROR_MISSING_FILES,
  ERROR_UPLOAD_FAILED,
  SUCCESS_FILES_DELETED,
  SUCCESS_FILES_UPLOAD,
  SUCCESS_FILE_DELETED,
  SUCCESS_FILE_UPLOAD,
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

    if (!req.file) {
      // Handle the case where the file field name is incorrect or missing
      return res
        .status(ERROR_MISSING_FILE.code)
        .json({ error: ERROR_MISSING_FILE.message });
    }
    // File upload successful
    const fileUrl = `${req.protocol}://${req.get("host")}/file/public/${
      req.file.filename
    }`;
    res
      .status(SUCCESS_FILE_UPLOAD.code)
      .json({ message: SUCCESS_FILE_UPLOAD.message, fileUrl });
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
    if (!req.files || req.files.length === 0) {
      // Handle the case where no files were uploaded
      return res
        .status(ERROR_MISSING_FILES.code)
        .json({ error: ERROR_MISSING_FILES.message });
    }
    // Files upload successful
    const fileUrls = req.files.map(
      (file) =>
        `${req.protocol}://${req.get("host")}/file/public/${file.filename}`
    );
    res
      .status(SUCCESS_FILES_UPLOAD.code)
      .json({ message: SUCCESS_FILES_UPLOAD.message, fileUrls });
  });
};

const deleteSingleFile = (req, res, next) => {
  const filePath = path.join(__dirname, "..", "uploads", req.params.filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      const error = new Error(ERROR_FILE_NOT_FOUND.message);
      error.status = ERROR_FILE_NOT_FOUND.code;
      return next(error);
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        const error = new Error(ERROR_INTERNAL_SERVER_ERROR.message);
        error.status = ERROR_INTERNAL_SERVER_ERROR.code;
        return next(error);
      }

      res
        .status(SUCCESS_FILE_DELETED.code)
        .json({ message: SUCCESS_FILE_DELETED.message });
    });
  });
};

const deleteMultipleFile = (req, res, next) => {
  const filenames = req.body.filenames; // Array of filenames to delete

  if (!filenames || !Array.isArray(filenames) || filenames.length === 0) {
    return res
      .status(ERROR_MISSING_FILES.code)
      .json({ error: ERROR_MISSING_FILES.message });
  }

  const deletionPromises = filenames.map((filename) => {
    const filePath = path.join(__dirname, "..", "uploads", filename);

    return new Promise((resolve, reject) => {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          return resolve(); // File not found, continue to next file
        }

        fs.unlink(filePath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  });

  Promise.all(deletionPromises)
    .then(() => {
      res
        .status(SUCCESS_FILES_DELETED.code)
        .json({ message: SUCCESS_FILES_DELETED.message });
    })
    .catch(() => {
      const error = new Error(ERROR_INTERNAL_SERVER_ERROR.message);
      error.status = ERROR_INTERNAL_SERVER_ERROR.code;
      next(error);
    });
};

export {
  getFile,
  addSingleFile,
  addMultipleFile,
  deleteSingleFile,
  deleteMultipleFile,
};
