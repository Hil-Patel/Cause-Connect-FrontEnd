import { useFormik, FormikHelpers } from "formik";
import image from "../../../assets/NGO-Owner_signup.svg";
import { SignUpNGOValidation } from "../schema/SignUpNGOValidation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Define the type for form values
interface FormValues {
  fullName: string;
  ownerEmail: string;
  ownerPhoneNumber: string;
  age: number;
  gender: string;
  experience: string;
}

const SignUpNGOForm1: React.FC = ({setFormOneSubmitted}) => {
  const navigate=useNavigate();
  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: "",
      ownerEmail: "",
      ownerPhoneNumber: "",
      age: "",
      gender: "",
      experience: "",
    },
    validationSchema: SignUpNGOValidation,
    onSubmit: (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
      localStorage.setItem("form1", JSON.stringify(values));
      setFormOneSubmitted(true);
      toast.success("Details Saved")
      setSubmitting(false);
    },
  });

  useEffect(() => {
    const temp = localStorage.getItem("form1");
    if (temp) {
      formik.setValues(JSON.parse(temp) as FormValues);
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white my-14">
      <div className="bg-[#F5F5F5] shadow-sm shadow-[#53599A] rounded-lg p-10 flex flex-col md:flex-row items-center max-w-5xl w-full">
        
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Join the Network That <br /> Turns Dreams into Action!
          </h2>
          <h3 className="text-lg font-medium text-gray-600 mt-2 text-center">
            NGO Owner Details
          </h3>

          <form onSubmit={formik.handleSubmit} className="mt-6">
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Full name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08C2FF] ${
                  formik.touched.fullName && formik.errors.fullName ? "border-red-500" : ""
                }`}
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.fullName}</p>
              )}
            </div>

            {/* ownerEmail */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">ownerEmail address</label>
              <input
                type="ownerEmail"
                name="ownerEmail"
                placeholder="yourname@ownerEmail.com"
                className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08C2FF] ${
                  formik.touched.ownerEmail && formik.errors.ownerEmail ? "border-red-500" : ""
                }`}
                value={formik.values.ownerEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.ownerEmail && formik.errors.ownerEmail && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.ownerEmail}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Phone number</label>
              <input
                type="tel"
                name="ownerPhoneNumber"
                placeholder="+91 800 2738 9700"
                className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08C2FF] ${
                  formik.touched.ownerPhoneNumber && formik.errors.ownerPhoneNumber ? "border-red-500" : ""
                }`}
                value={formik.values.ownerPhoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.ownerPhoneNumber && formik.errors.ownerPhoneNumber && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.ownerPhoneNumber}</p>
              )}
            </div>

            {/* age */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Age</label>
              <input
                type="number"
                name="age"
                className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08C2FF] ${
                  formik.touched.age && formik.errors.age ? "border-red-500" : ""
                }`}
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.age && formik.errors.age && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.age}</p>
              )}
            </div>

            {/* Gender */}
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

            {/* Experience */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Experience</label>
              <textarea
                name="experience"
                placeholder="Description..."
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08C2FF]"
                value={formik.values.experience}
                onChange={formik.handleChange}
              />
            </div>
            <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <span onClick={()=>{navigate("/Login-NGO")}} className="text-blue-500 hover:text-blue-700 cursor-pointer">
                                    Log In
                                </span>
                            </p>
                        </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 py-2 text-white bg-[#FF5A5F] rounded-full shadow-md 
                         hover:bg-[#FF7A7F] transition duration-300 flex justify-center items-center"
            >
             Save and Next <span className="ml-2">→</span>
            </button>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block w-1/2">
          <img src={image} alt="Signup Illustration" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default SignUpNGOForm1;
