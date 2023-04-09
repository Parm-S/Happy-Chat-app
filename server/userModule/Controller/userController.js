import asyncHandler from "express-async-handler";

import { getUserByEmail, createUser } from "../Repository/index.js";
import { generateToken } from "../../config/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, dateOfBirth, phoneNumber } = req.body;

    if (!name || !email || !password || !dateOfBirth || !phoneNumber) {
      return res.status(400).json({ message: "Please Enter all the Fields" });
    }

    const userExist = await getUserByEmail(email);

    if (userExist) {
      return res.status(400).json({ message: "User already Exist" });
    }

    const user = await createUser({
      ...req.body,
      email: email.toString().toLowerCase(),
    });

    if (user) {
      return res
        .status(201)
        .json({ ...user._doc, token: generateToken(user._id, user.userType) });
    } else {
      return res.status(400).json({ message: "Failed to Create User" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        dateOfBirth: user.dateOfBirth,
        phoneNumber: user.phoneNumber,
        userType: user.userType,
        token: generateToken(user._id, user.userType),
      });
    } else {
      return res.status(401).json({ message: "Invalid E-mail & password" });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

export { registerUser, loginUser };
