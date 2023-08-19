import * as yup from "yup";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

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
  dateOfBirth: yup.date().required("Date of Birth is required"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(phoneRegExp, "Phone number is not valid"),
});
