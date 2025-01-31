import React from 'react'
import { loginValidationSchema } from "../Schema/LoginValidationSchema"
import image from "../../../assets/volunteer_login.svg"
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {VolunteerLogin} from "../../../ApiEndPoints/ApiCalls"
import toast from 'react-hot-toast';
import { setLoading } from '../../../features/loadingSlice';
import { setLoggedIn } from '../../../features/LoginDetailsSlice';
import { useDispatch } from 'react-redux';

export const LoginForm = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const HandleSignUpClick=()=>{
        navigate("/SignUp-Volunteer")
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginValidationSchema,
        onSubmit: async(values) => {
            dispatch(setLoading(true))
            const res = await VolunteerLogin(values);
            dispatch(setLoading(false))

            if(res.statusCode >=200 && res.statusCode <300){
                toast.success("Login Successful")
                dispatch(setLoggedIn({
                    IsLoggedin : "true",
                    Token : values,
                    UserType : "VOLUNTEER"
                }))
                setTimeout(()=>{
                    navigate("/Volunteer/dashboard")
                },1000)
            }else{
                toast.error(res.data.message);
            }
        },
    });
    return (

        <div className="flex justify-center items-center h-full bg-white my-20">
            <div className="bg-[#F5F5F5] shadow-sm shadow-[#53599A] rounded-lg p-10 flex flex-col md:flex-row items-center max-w-4xl w-full">

                <div className="hidden md:block w-1/2">
                    <img src={image} alt="Login Illustration" className="w-full" />
                </div>

                <div className="w-full md:w-1/2 px-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                        Welcome Back, <br /> Change Maker
                        Let’s Make an Impact!
                    </h2>

                    <form onSubmit={formik.handleSubmit} className="mt-6">

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Email address / User ID</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="yourname@email.com"
                                className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08C2FF] ${formik.touched.email && formik.errors.email ? "border-red-500" : ""
                                    }`}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Enter password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="********"
                                className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08C2FF] ${formik.touched.password && formik.errors.password ? "border-red-500" : ""
                                    }`}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                            )}
                        </div>

                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <span onClick={()=>HandleSignUpClick()} className="text-blue-500 hover:text-blue-700 cursor-pointer">
                                    Sign Up
                                </span>
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-4 py-2 text-white bg-[#08C2FF] rounded-full shadow-md 
                         hover:bg-[#9ABAE3] transition duration-300"
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
