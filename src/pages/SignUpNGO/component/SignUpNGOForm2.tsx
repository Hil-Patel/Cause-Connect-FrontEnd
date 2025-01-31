import { useFormik } from "formik";
import image from "../../../assets/rb_2149820257.png";
import { SignUpNGOValidation2 } from "../schema/SignUpNGOValidation2.js"
import upload from "../../../assets/upload-file-svgrepo-com.svg"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {NGOSignUp,NgoOtpSend,NgoVerifyOtp} from "../../../ApiEndPoints/ApiCalls.js"
import toast from "react-hot-toast";
import { data, useNavigate } from "react-router-dom";
import NgoOtpVerify from "./NgoOtpVerify.js";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../features/loadingSlice.js";
type FormValues = {
  ngoName: string;
  ngoAim: string;
  ngoDescription: string;
  email: string;
  phoneNumber: string;
  address: string;
  transcript: null | File;
  profilePic: null | File;
  bankStatement: null | File;
  password: string;
  confirmPassword: string;
  accountNumber: string;
};

const SignUpNGOForm2 = ({ setFormOneSubmitted }) => {
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [otpId,setOtpId] =useState("");
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const inputRef = [useRef(null), useRef(null), useRef(null)];

  const formik = useFormik({
    initialValues: {
      ngoName: "",
      ngoAim: "",
      ngoDescription: "",
      email:"",
      phoneNumber: "",
      address: "",
      numberOfMember:"",
      city:"",
      transcript: null,
      profilePic: null,
      bankStatement: null,
      password: "",
      confirmPassword: "",
      accountNumber: ""
    },
    validationSchema: SignUpNGOValidation2,
    onSubmit: async(values) => {

      dispatch(setLoading(true))
      const res = await NgoOtpSend({"email":values.email});
      dispatch(setLoading(false))
      
      if(res.statusCode >=200 && res.statusCode <300){
          setOtpId(res.data);
          setShowOtpModal(true);
      }
      else{
        toast.error(res.message)
      }
    },
  });

  const handleOnClickFileInput = (index) => {
    inputRef[index].current.click();
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    formik.setFieldValue(fieldName, event.target.files[0]);
  };

  const handleOtpSubmit = async(otp: string) => {

    dispatch(setLoading(true))
    const verify=await NgoVerifyOtp({"id":otpId,"otp":otp})
    

    if(verify.statusCode >=200 && verify.statusCode <300){
      const formOneDetails=JSON.parse(localStorage.getItem("form1"))
      const values={...formik.values,...formOneDetails};

      const res=await NGOSignUp(values)
      dispatch(setLoading(false))

      if(res.statusCode >=200 && res.statusCode <300){
        localStorage.removeItem("form1");
        toast.success(res.message)
        navigate("/Login-NGO")
      }
      else{
        toast.error(res.message)
      }
      setShowOtpModal(false)
    }
    else{
      dispatch(setLoading(false))
      toast.error(verify.message)
    }
  }

  return (
    <div className="flex justify-center items-center m-10 bg-white">
      
      <div >
        <NgoOtpVerify isOpen={showOtpModal} onClose={() => setShowOtpModal(false)} onSubmit={handleOtpSubmit}/>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-[#FAFAFA] shadow-sm shadow-[#53599A] rounded-xl p-8 max-w-5xl w-full"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Join the Network That <br />
          Turns Dreams into Action!
        </h2>

        <div className="flex flex-col md:flex-row items-start">
          {/* Left Side - Form Fields */}
          <div className="w-full md:w-1/2 px-6 w-1/2">

            {/* NGO Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">NGO Name</label>
              <input
                type="text"
                name="ngoName"
                placeholder="NGO name"
                className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${formik.touched.ngoName && formik.errors.ngoName ? "border-red-500" : ""
                  }`}
                value={formik.values.ngoName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.ngoName && formik.errors.ngoName && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.ngoName}</p>
              )}
            </div>

            {/* NGO Aim */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">NGO Aim</label>
              <input
                type="text"
                name="ngoAim"
                placeholder="Aim"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formik.values.ngoAim}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.ngoAim && formik.errors.ngoAim && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.ngoAim}</p>
              )}
            </div>

            {/* NGO Description */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">NGO Description / About Us</label>
              <textarea
                name="ngoDescription"
                placeholder="Description..."
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formik.values.ngoDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.ngoDescription && formik.errors.ngoDescription && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.ngoDescription}</p>
              )}
            </div>

            {/* NGO Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">NGO Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="yourname@email.com"
                className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${formik.touched.email && formik.errors.email ? "border-red-500" : ""
                  }`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* NGO Phone Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">NGO Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="+91 800 2738 9700"
                className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${formik.touched.phoneNumber && formik.errors.phoneNumber ? "border-red-500" : ""
                  }`}
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</p>
              )}
            </div>

            {/* NGO Address */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">NGO Address</label>
              <input
                type="text"
                name="address"
                placeholder="Street / house no/ etc..."
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">City</label>
              <input
                type="text"
                name="city"
                placeholder="NGO's city"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.city && formik.errors.city && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.city}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Number Of Member</label>
              <input
                type="number"
                name="numberOfMember"
                placeholder="Members"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formik.values.numberOfMember}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.numberOfMember && formik.errors.numberOfMember && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.numberOfMember}</p>
              )}
            </div>
          </div>

          {/* Right Side - File Uploads */}
          <div className="w-full md:w-1/2 px-6">
            <div className="space-y-4">
              {["transcript", "profilePic", "bankStatement"].map((fieldName, index) => (
                <div key={index}>
                  <label className="block text-gray-700 font-medium capitalize">
                    {fieldName.replace(/([A-Z])/g, " $1")}
                  </label>
                  <div
                    className="bg-white shadow-md rounded-lg h-20 flex items-center justify-center cursor-pointer"
                    onClick={() => handleOnClickFileInput(index)}
                  >
                    <input
                      type="file"
                      name={fieldName}
                      ref={inputRef[index]}
                      onChange={(e) => {
                        handleFileUpload(e, fieldName)
                      }}
                      className="hidden"
                      onBlur={formik.handleBlur}
                    />
                    <span className="text-sm text-[#222222] text-center flex flex-col">
                      <img src={upload} alt="" className="h-5" />
                      {formik.values[fieldName] == null
                        ? "Click to upload"
                        : `${formik.values[fieldName]?.name}`}
                    </span>
                  </div>
                  {formik.touched[fieldName] && formik.errors[fieldName] && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors[fieldName]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                placeholder="Enter your account number"
                className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08C2FF] ${formik.touched.accountNumber && formik.errors.accountNumber ? "border-red-500" : ""
                  }`}
                value={formik.values.accountNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.accountNumber && formik.errors.accountNumber && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.accountNumber}</p>
              )}
            </div>

            {/* Password */}
            <div className="mt-4">
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

            {/* Confirm Password */}
            <div className="mt-4">
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
          </div>

        </div>
        {/* Submit Button */}
        <div className="w-full flex justify-center mt-6 gap-10">
          <button
            type="button"
            onClick={()=>{setFormOneSubmitted(false)}}
            className="w-1/3 px-10 py-1 text-white bg-[#FF5722] rounded-full shadow-lg hover:bg-[#FF7043] transition duration-300"
          >
            back
          </button>
          <button
            type="submit"
            className="w-1/3 px-10 py-1 text-white bg-[#FF5722] rounded-full shadow-lg hover:bg-[#FF7043] transition duration-300"
          >
            Verify Email
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpNGOForm2;
