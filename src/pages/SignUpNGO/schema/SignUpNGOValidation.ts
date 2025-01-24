
import * as Yup from "yup"; // For validation

export const SignUpNGOValidation= Yup.object({
    fullName: Yup.string().required("Full name is required"),
    ownerEmail: Yup.string()
      .email("Invalid ownerEmail address")
      .required("ownerEmail is required"),
    ownerPhoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
    age: Yup.number()
      .required("Age of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    experience: Yup.string(),
  })

  export type SignUpNGOFormData = Yup.InferType<typeof SignUpNGOValidation>;
