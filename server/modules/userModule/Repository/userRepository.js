import { User } from "../../../models/userModel.js";

const getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    console.log("Error :- unable to find user".error);
    throw new Error("Unable to Find User");
  }
};

const createUser = async (request) => {
  try {
    return await User.create({
      ...request,
    });
  } catch (error) {
    console.log("unable to create user".error);
    throw new Error("Unable to create User");
  }
};

export { getUserByEmail, createUser };
