import { useFormik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NGOloginValidationSchema } from "../LoginNGO/Schema/NGOLoginValidateSchema.js"
import { AdminVerify } from "../../ApiEndPoints/ApiCalls"
import { setLoading } from '../../features/loadingSlice.js';
import image from "../../assets/volunteer_login.svg"
import toast from 'react-hot-toast';
import { setLoggedIn } from '../../features/LoginDetailsSlice';
import { RootState } from '@reduxjs/toolkit/query';
const LoginAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.loading.isLoading)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: NGOloginValidationSchema,
        onSubmit: async (values) => {

            dispatch(setLoading(true))
            const res = await AdminVerify(values)
            dispatch(setLoading(false))

            if (res.statusCode >= 200 && res.statusCode < 300) {
                toast.success("Login Successful")
                dispatch(setLoggedIn({
                    IsLoggedin: "true",
                    Token: values,
                    UserType: "ADMIN"
                }))
                setTimeout(() => {
                    navigate("/Admin/dashboard")
                }, 1000)
            }
            else {
                toast.error(res.message)
            }
        },
    });
    return (
        <div className="flex justify-center items-center h-full bg-white my-20">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[9999]">
                    <span className="loader"></span>
                </div>
            )}
            <div className="bg-[#F5F5F5] shadow-sm shadow-[#53599A] rounded-lg p-10 flex flex-col md:flex-row items-center max-w-4xl w-full">
                <div className="hidden md:block w-1/2">
                    <img src={image} alt="Login Illustration" className="w-full" />
                </div>

                <div className="w-full md:w-1/2 px-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                        Welcome Back, <br /> ADMIN
                    </h2>

                    <form onSubmit={formik.handleSubmit} className="mt-6">

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Email address of Admin</label>
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

                        <button
                            type="submit"
                            className="w-full mt-4 py-2 text-white bg-[#08C2FF] rounded-full shadow-md hover:bg-[#9ABAE3] transition duration-300"
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginAdmin