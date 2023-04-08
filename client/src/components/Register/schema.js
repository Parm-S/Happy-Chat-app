import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  email: yup.string().email().required("This field is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Your password is too short."),
  confirmPassword: yup
    .string()
    .required("Please retype your password.")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
