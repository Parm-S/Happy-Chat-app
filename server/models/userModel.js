import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ENCRYPTION_SALT } from "../config/index.js";

const { Schema } = mongoose;

const userModel = new Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    dateOfBirth: { type: Date, required: true },
    phoneNumber: { type: String, required: true },
    pic: {
      type: String,
      trim: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    userType: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(Number(ENCRYPTION_SALT));
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userModel);

export { User };
