import { FILE_UPLOAD_URL } from "../config";
import createApiInstance from "./api";

const dynamicApiInstance = createApiInstance(FILE_UPLOAD_URL);

const uploadSingleImage = (formData, onUploadProgress) => {
  return dynamicApiInstance.post("/upload/single", formData, {
    onUploadProgress,
    headers: {
      "Content-Type": "multipart/form-data", // Important for file uploads
    },
  });
};

export { uploadSingleImage };
