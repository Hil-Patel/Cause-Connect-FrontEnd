
import * as Yup from "yup";
const FILE_SIZE = 20 * 1024 * 1024;
const SUPPORTED_FORMATS = ["application/pdf"];
const SUPPORTED_FORMATS2 = [
  "image/jpeg", 
  "image/png", 
  "image/gif",
  "image/jpg"
];

export const SignUpNGOValidation2 = Yup.object({
  ngoName: Yup.string().required("NGO name is required"),
  ngoAim: Yup.string().required("NGO Aim is required"),
  ngoDescription: Yup.string().required("NGO Description is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?\d{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("Address is required"),
  numberOfMember: Yup.number()
    .required("Phone number is required"),
  transcript: Yup.mixed().required("Transcript is required").test("fileSize", "File size should be under 20mb", (value) => {
    return value ? value.size <= FILE_SIZE : true;
  })
    .test("fileType", "file format should be pdf", (value) => {
      return value ? SUPPORTED_FORMATS.includes(value.type) : true;
    }),
  profilePic: Yup.mixed().required("Profile Photo is required").test("fileSize", "File size should be under 20mb", (value) => {
    return value ? value.size <= FILE_SIZE : true;
  })
    .test("fileType", "file format should be image", (value) => {
      return value ? SUPPORTED_FORMATS2.includes(value.type) : true;
    }),
  bankStatement: Yup.mixed().required("Bank Statement is required").test("fileSize", "File size should be under 20mb", (value) => {
    return value ? value.size <= FILE_SIZE : true;
  })
    .test("fileType", "file format should be pdf", (value) => {
      return value ? SUPPORTED_FORMATS.includes(value.type) : true;
    }),
  accountNumber: Yup.string()
    .matches(/^\d+$/, "Account Number must be numeric")
    .min(8, "Account Number must be at least 8 digits")
    .required("Account Number is required"),
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