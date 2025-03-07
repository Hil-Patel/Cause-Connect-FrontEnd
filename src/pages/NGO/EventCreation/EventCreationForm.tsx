import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { motion } from "framer-motion"
import {  MapPin, FileText, User } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { format, parseISO } from "date-fns"
import { setLoading } from "../../../features/loadingSlice"
import {NGOCreateEvent} from "../../../ApiEndPoints/ApiCalls.js"
import toast from "react-hot-toast"

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Event name is required"),
    description: Yup.string().required("Event description is required"),
    address: Yup.string().required("Event address is required"),
    city: Yup.string().required("City is required"),
    lastDateToRegister: Yup.date()
        .required("Registration end date is required")
        .min(new Date(Date.now() + 86400000), "Registration end date must be at least 24 hour from now"),
    eventDate: Yup.date()
        .required("Event date is required")
        .min(Yup.ref("lastDateToRegister"), "Event date must be after the registration end date"),
})

const initialValues = {
    name: "",
    description: "",
    address: "",
    city: "",
    lastDateToRegister: "",
    eventDate: "",
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
}

const inputClasses = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"

const EventCreationForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.loading.isLoading);
    const token = useSelector((state)=>state.loggedIn.Token)

    const handleSubmit = async(
        values: typeof initialValues,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
    ) => {
        const formattedLastDateToRegister = format(
            parseISO(values.lastDateToRegister), 
            "dd-MM-yyyy HH:mm" 
        );
        const formattedeventDate = format(
            parseISO(values.lastDateToRegister), 
            "dd-MM-yyyy HH:mm"
        );
        
    
        const payload = {
            ...values,
            lastDateToRegister: formattedLastDateToRegister, 
            eventDate:formattedeventDate,
        };
        console.log(payload);
        
        dispatch(setLoading(true))
        const res = await NGOCreateEvent(payload,JSON.parse(token));
        dispatch(setLoading(false))

        if(res.statusCode >=200 && res.statusCode <300){
            toast.success("Event created successfully")
            setSubmitting(false)
            navigate("/NGO/Profile")
        }else{
            toast.error(res.message);
        }
    }

    return (
        <div className="min-h-screen  flex items-center justify-center p-4 mb-10">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[9999]">
                    <span className="loader"></span>
                </div>
            )}
            <motion.div
                className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl w-full"
                initial="initial"
                animate="animate"
                variants={fadeInUp}
            >
                <div className="md:flex">
                    <div className="md:w-1/2 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-75 flex items-center justify-center">
                            <h1 className="text-4xl font-bold text-white text-center px-4">Create Your Event</h1>
                        </div>
                    </div>
                    <div className="md:w-1/2 p-8 bg-gray-50">
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                            {({ isSubmitting }) => (
                                <Form className="space-y-6">
                                    <motion.div variants={fadeInUp}>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Event Name
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <Field
                                                type="text"
                                                name="name"
                                                id="name"
                                                className={inputClasses}
                                                placeholder="Enter event name"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <FileText className="h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>
                                        <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
                                    </motion.div>

                                    <motion.div variants={fadeInUp}>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <div className="mt-1">
                                            <Field
                                                as="textarea"
                                                name="description"
                                                id="description"
                                                rows={3}
                                                className={`${inputClasses} resize-none`}
                                                placeholder="Describe your event"
                                            />
                                        </div>
                                        <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-600" />
                                    </motion.div>

                                    <motion.div variants={fadeInUp}>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                            Address
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <Field
                                                type="text"
                                                name="address"
                                                id="address"
                                                className={inputClasses}
                                                placeholder="Event address"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <MapPin className="h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>
                                        <ErrorMessage name="address" component="div" className="mt-1 text-sm text-red-600" />
                                    </motion.div>

                                    <motion.div variants={fadeInUp}>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                            City
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <Field type="text" name="city" id="city" className={inputClasses} placeholder="City" />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>
                                        <ErrorMessage name="city" component="div" className="mt-1 text-sm text-red-600" />
                                    </motion.div>

                                    <motion.div variants={fadeInUp}>
                                        <label htmlFor="lastDateToRegister" className="block text-sm font-medium text-gray-700">
                                            Last Date to Register
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <Field
                                                type="datetime-local"
                                                name="lastDateToRegister"
                                                id="lastDateToRegister"
                                                className={inputClasses}
                                            />
                                        </div>
                                        <ErrorMessage name="lastDateToRegister" component="div" className="mt-1 text-sm text-red-600" />
                                    </motion.div>

                                    <motion.div variants={fadeInUp}>
                                        <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
                                            Event Date
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <Field type="datetime-local" name="eventDate" id="eventDate" className={inputClasses} />
                                        </div>
                                        <ErrorMessage name="eventDate" component="div" className="mt-1 text-sm text-red-600" />
                                    </motion.div>

                                    <motion.div variants={fadeInUp}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            {isSubmitting ? "Submitting..." : "Create Event"}
                                        </motion.button>
                                    </motion.div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default EventCreationForm;