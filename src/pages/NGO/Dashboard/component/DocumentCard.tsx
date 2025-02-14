import { motion } from 'framer-motion';
import { Download} from "lucide-react"
import React from 'react'
import { Eye } from "lucide-react"

const BaseUrl="http://localhost:8080"

const DocumentCard = ({ title, icon, url }: { title: string; icon: React.ReactNode; url: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="bg-gradient-to-tr from-blue-100 via-white to-gray-50 shadow-lg border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-between space-y-4 transition-transform duration-300"
    >
      {/* Icon and Title Section */}
      <div className="flex flex-col items-center">
        <div className="p-4 bg-blue-500/10 rounded-full shadow-md">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mt-4 text-gray-800 text-center">{title}</h3>
      </div>

      {/* Action Button Section */}
      <motion.a
        href={`${BaseUrl}${url}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-full inline-flex items-center shadow-lg transition-colors duration-300"
      >
        <Eye className="mr-2 h-5 w-5" />
        View Document
      </motion.a>
    </motion.div>
  )
}

export default DocumentCard
