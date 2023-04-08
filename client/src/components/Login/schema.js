import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("This field is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Your password is too short."),
});
