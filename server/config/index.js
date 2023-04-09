import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_DB_URI = process.env.MONGO_DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES = process.env.JWT_EXPIRES;
export const ENCRYPTION_SALT = process.env.ENCRYPTION_SALT;
