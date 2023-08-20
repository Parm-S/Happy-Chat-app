// fileUploadModule/util/logCleanup.js

import fs from "fs";
import path from "path";
import { CLEAN_UP_RUN, RETENTION_PERIOD } from "../config/index.js";

const logDirectory = path.join(__dirname, "..", "logs");
const retentionPeriod = RETENTION_PERIOD;

function deleteOldLogFiles() {
  const now = Date.now();
  fs.readdir(logDirectory, (err, files) => {
    if (err) {
      console.error("Error reading log directory:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(logDirectory, file);
      fs.stat(filePath, (statErr, stats) => {
        if (statErr) {
          console.error(`Error getting stats for ${file}:`, statErr);
          return;
        }

        const fileAge = now - stats.mtime.getTime();
        if (fileAge > retentionPeriod) {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error(`Error deleting ${file}:`, unlinkErr);
            } else {
              console.log(`Deleted ${file} (age: ${fileAge}ms)`);
            }
          });
        }
      });
    });
  });
}

// Run cleanup on startup and then every 24 hours
deleteOldLogFiles();
setInterval(deleteOldLogFiles, CLEAN_UP_RUN); // 24 hours in milliseconds
