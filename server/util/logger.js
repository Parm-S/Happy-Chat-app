// fileUploadModule/util/loggerConfig.js

import winston from "winston";
import path from "path";
import fs from "fs";
import { NODE_ENV } from "../config/index.js";

const __filename = import.meta.url.slice(7); // Remove 'file://' from the URL
const __dirname = path.dirname(__filename);
console.log(__dirname);
// Create log directory if it doesn't exist path.normalize(path.join(os.homedir(), "logs"));
const logDirectory = decodeURI(
  path.normalize(path.join(__dirname, "..", "logs"))
);
console.log(decodeURI(logDirectory));
async function createLogDirectory() {
  try {
    await fs.mkdirSync(decodeURI(logDirectory), { recursive: true });
    console.log("Log directory created:", logDirectory);
  } catch (error) {
    console.error("Error creating log directory:", error);
  }
}
createLogDirectory();
const logFormat = winston.format.combine(
  winston.format.label({ label: "FileUploadApp" }),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, label, message }) => {
    return `[${timestamp}] [${label}] ${level}: ${message}`;
  })
);

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(winston.format.colorize(), logFormat),
  level: "info", // Display info level and above in the console
});

const errorFileTransport = new winston.transports.File({
  filename: path.join(logDirectory, "error.log"),
  level: "error",
  format: winston.format.combine(winston.format.uncolorize(), logFormat),
  maxsize: 5 * 1024 * 1024, // 5MB
  maxFiles: 5, // Number of rotated files to keep
});

const infoFileTransport = new winston.transports.File({
  filename: path.join(logDirectory, "info.log"),
  level: "info",
  format: winston.format.combine(winston.format.uncolorize(), logFormat),
  maxsize: 5 * 1024 * 1024, // 5MB
  maxFiles: 5, // Number of rotated files to keep
});

const warnFileTransport = new winston.transports.File({
  filename: path.join(logDirectory, "warn.log"),
  level: "warn",
  format: winston.format.combine(winston.format.uncolorize(), logFormat),
  maxsize: 5 * 1024 * 1024, // 5MB
  maxFiles: 5, // Number of rotated files to keep
});

const combinedFileTransport = new winston.transports.File({
  filename: path.join(logDirectory, "combined.log"),
  format: logFormat,
  maxsize: 10 * 1024 * 1024, // 10MB
  maxFiles: 10, // Number of rotated files to keep
});

const logger = winston.createLogger({
  levels: winston.config.syslog.levels, // Predefined levels
  transports: [
    consoleTransport,
    errorFileTransport,
    infoFileTransport,
    warnFileTransport,
    combinedFileTransport,
  ],
  silent: NODE_ENV === "test", // Disable logging in test environment
});

export default logger;
