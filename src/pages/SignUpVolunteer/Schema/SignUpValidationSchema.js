import * as Yup from "yup";

export const signupValidationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Must be at least 3 characters")
    .required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?\d{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  age: Yup.number()
  .required("Age of Birth is required"),
  address: Yup.string().required("Address is required"),
  address: Yup.string().required("City is required"),
  gender: Yup.string().required("Gender is required"),
  experience: Yup.string(),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/\d/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
