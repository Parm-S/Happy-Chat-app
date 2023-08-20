export const config = {
  imageFileExtensions: [".jpeg", ".jpg", ".gif", ".png"],
  documentFileExtensions: [".doc", ".docx", ".pdf", ".xlsx", ".xls"],
  documentFolders: {
    ".doc": "word",
    ".docx": "word",
    ".pdf": "pdf",
    ".xlsx": "spreadsheet",
    ".xls": "spreadsheet",
  },
  maxFileSize: 1024 * 1024 * 5, // 5MB file size limit
  maxSize: 5,
};
