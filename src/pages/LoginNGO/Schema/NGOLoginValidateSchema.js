import * as Yup from 'yup';

export const NGOloginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must have at least one uppercase letter')
    .matches(/[a-z]/, 'Password must have at least one lowercase letter')
    .matches(/[0-9]/, 'Password must have at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must have at least one special character')
    .required('Password is required'),
});
