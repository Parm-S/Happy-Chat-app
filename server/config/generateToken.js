import jwt from "jsonwebtoken";
import { JWT_EXPIRES, JWT_SECRET } from "./index.js";

const generateToken = (id, type) => {
  return jwt.sign({ id: id, userType: type }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES,
  });
};

export { generateToken };
