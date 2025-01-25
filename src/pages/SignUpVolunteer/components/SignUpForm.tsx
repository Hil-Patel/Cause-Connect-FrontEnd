import { useFormik } from 'formik';
import { signupValidationSchema } from '../Schema/signupValidationSchema'
import image from "../../../assets/volunteer_signup.svg"
import {VolunteerSignUp} from "../../../ApiEndPoints/ApiCalls"
import React from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignUpForm = () => {
    const navigate = useNavigate();

    const HandleLogInClick = () => {
        navigate("/Login-Volunteer")
    }

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            age: "",
            address: "",
            gender:"",
            experience: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: signupValidationSchema,
        onSubmit: async(values) => {
            console.log("Signup Form Submitted", values);
            const res = await VolunteerSignUp(values);
            if(res.data.statusCode  == 201){
                toast.success("Registered Successfully");
                navigate("/Login-Volunteer")
            }else{
                toast.error(res.data.message);
            }
        },
    });
    return (

        <div className="flex justify-center items-center h-full bg-white my-10">
            <div className="bg-[#F5F5F5] shadow-sm shadow-[#53599A] rounded-lg p-10 flex flex-col md:flex-row items-center max-w-5xl w-full">

                <div className="w-full md:w-1/2 px-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                        Lend a Hand, Change a Life <br />
                        Sign Up Today!
                    </h2>

                    <form onSubmit={formik.handleSubmit} className="mt-6">

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Full name</label>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="First Middle Last"
                                className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08C2FF] ${formik.touched.fullName && formik.errors.fullName ? "border-red-500" : ""
                                    }`}
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.fullName && formik.errors.fullName && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.fullName}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Email address</label>
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
                            <label className="block text-gray-700 font-medium">Phone number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="+91 80027389700"
                                className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08C2FF] ${formik.touched.phoneNumber && formik.errors.phoneNumber ? "border-red-500" : ""
                                    }`}
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">AGE</label>
                            <input
                                type="number"
                                name="age"
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08C2FF]"
                                value={formik.values.age}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} 
                            />
                            {formik.touched.age && formik.errors.age && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.age}</p>
                            )}
                        </div>
                        
                        <div className="mb-4">
              <label className="block text-gray-700 font-medium">Gender</label>
              <div className="flex items-center mt-2">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formik.values.gender === "Male"}
                    onChange={formik.handleChange}
                    className="mr-2"
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formik.values.gender === "Female"}
                    onChange={formik.handleChange}
                    className="mr-2"
                  />
                  Female
                </label>
              </div>
              {formik.touched.gender && formik.errors.gender && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.gender}</p>
              )}
            </div>


                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Address</label>
                            <input
                                type="text"
                                name="address"
                                placeholder=" house no / Street / ..."
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08C2FF]"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} 
                                />
                                {formik.touched.address && formik.errors.address && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
                                )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Experience</label>
                            <textarea
                                name="experience"
                                placeholder="Description..."
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08C2FF]"
                                value={formik.values.experience}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} 
                                />
                                {formik.touched.experience && formik.errors.experience && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.experience}</p>
                                )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Create password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="********"
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08C2FF]"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} 
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                                )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="********"
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08C2FF]"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
                                )}
                        </div>

                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <span onClick={() => HandleLogInClick()} className="text-blue-500 hover:text-blue-700 cursor-pointer">
                                    Log In
                                </span>
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-4 py-2 text-white bg-[#08C2FF] rounded-full shadow-md 
                         hover:bg-[#9ABAE3] transition duration-300"
                        >
                            Sign up
                        </button>
                    </form>
                </div>

                {/* Right Side - Image */}
                <div className="hidden md:block w-1/2">
                    <img src={image} alt="Signup Illustration" className="w-full" />
                </div>
            </div>
        </div>
    )
}

export default SignUpForm