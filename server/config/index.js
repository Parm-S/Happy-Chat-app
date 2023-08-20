import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const HOST_URL = process.env.HOST_URL || `http://localhost:${PORT}`;
export const MONGO_DB_URI = process.env.MONGO_DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES = process.env.JWT_EXPIRES;
export const ENCRYPTION_SALT = process.env.ENCRYPTION_SALT;
export const NODE_ENV = process.env.NODE_ENV;
export const RETENTION_PERIOD = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds
export const CLEAN_UP_RUN = 24 * 60 * 60 * 1000;
