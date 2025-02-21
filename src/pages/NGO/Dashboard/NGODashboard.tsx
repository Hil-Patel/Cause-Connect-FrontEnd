import { motion } from "framer-motion"
import {FileText,Mail,Phone,MapPin,Users,CreditCard} from "lucide-react"
import InfoItem from "./component/InfoItem"
import EventSection from "./component/EventSection"
import DocumentCard from "./component/DocumentCard"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "../../../features/loadingSlice"
import {NGODashboardData} from "../../../ApiEndPoints/ApiCalls.js"
import toast from "react-hot-toast"

const BaseUrl="http://localhost:8080"
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}
const NGODashboard = () => {
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true)
  const Token =useSelector((state: RootState)=>state.loggedIn.Token)
  const [ngoData,setNgoData] = useState({})
  
  const getNGODetails=async()=>{

    setLoading(true)
    const res = await NGODashboardData(JSON.parse(Token))
    console.log(res);
    
    
    if (res.statusCode >= 200 && res.statusCode < 300) {
      setNgoData(res.data)
    }
    else {
      toast.error(res.message)
    }
    setLoading(false)
  }

  useEffect(()=>{
    getNGODetails()
  },[])
  
  
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {loading ? (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[9999]">
                    <span className="loader"></span>
                </div>
            ):
    <motion.div initial="initial" animate="animate" variants={staggerChildren} className="space-y-12">

      <motion.div variants={fadeInUp} className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="md:flex ">
          <div className="md:w-1/3 bg-blue-500">
            <motion.img
              src={`${BaseUrl}${ngoData.profilePicUrl}`}
              alt={ngoData.ngoName}
              className="w-full h-full object-cover"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              />
          </div>
          <div className="md:w-2/3 p-8">
            <motion.h1 variants={fadeInUp} className="text-4xl font-bold mb-4 text-blue-600">
              {ngoData.ngoName}
            </motion.h1>
            <motion.div variants={fadeInUp} className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Aim</h2>
              <p className="text-gray-600">{ngoData.ngoAim}</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700">Description</h2>
              <p className="text-gray-600">{ngoData.ngoDescription}</p>
            </motion.div>
            <motion.hr variants={fadeInUp} className="my-6 border-t border-gray-300" />
            <motion.div variants={staggerChildren} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem icon={<Mail className="w-5 h-5" />} label="Email" value={ngoData.email} />
              <InfoItem icon={<Phone className="w-5 h-5" />} label="Phone" value={ngoData.phoneNumber} />
              <InfoItem icon={<MapPin className="w-5 h-5" />} label="Address" value={ngoData.address} />
              <InfoItem icon={<MapPin className="w-5 h-5" />} label="City" value={ngoData.city} />
              <InfoItem
                icon={<Users className="w-5 h-5" />}
                label="Members"
                value={ngoData.numberOfMember.toString()}
                />
              <InfoItem
                icon={<CreditCard className="w-5 h-5" />}
                label="Account Number"
                value={ngoData.accountNumber.toString()}
                />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Owner Details</h2>
        <div className="bg-white shadow-lg rounded-xl p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">{ngoData.owner.fullName}</h3>
              <p className="text-gray-600">
                {ngoData.owner.gender}, {ngoData.owner.age} years old
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <InfoItem icon={<Mail className="w-5 h-5" />} label="Email" value={ngoData.owner.ownerEmail} />
              <InfoItem icon={<Phone className="w-5 h-5" />} label="Phone" value={ngoData.owner.ownerPhoneNumber} />
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-700">Experience</h4>
            <p className="mt-2 text-gray-600">{ngoData.owner.experience}</p>
          </div>
        </div>
      </motion.div>

      <EventSection title="Upcoming Events" events={ngoData.pendingFutureEvents} highlight={true} />

      <EventSection title="Past Events" events={ngoData.completedEvents} highlight={false} />

      <motion.div variants={fadeInUp} className="bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DocumentCard
            title="Bank Statement"
            icon={<CreditCard className="w-8 h-8 text-blue-500" />}
            url={ngoData.fileSystemDto.bankStatementUrl}
            />
          <DocumentCard
            title="Transcript"
            icon={<FileText className="w-8 h-8 text-green-500" />}
            url={ngoData.fileSystemDto.transcriptUrl}
            />
        </div>
      </motion.div>
    </motion.div>
}
  </div>
)
}

export default NGODashboard