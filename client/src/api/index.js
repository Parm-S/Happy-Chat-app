import axios from "axios";
import { USER_URL } from "../config";

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

const registerUser = async (data) => {
  try {
    const res = await axios.post(USER_URL + "/register", data, config);
    return res;
  } catch (error) {
    console.log(error);
    throw new Error("unable to save user");
  }
};

export { registerUser };
