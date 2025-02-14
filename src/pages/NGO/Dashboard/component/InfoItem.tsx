import { motion } from 'framer-motion'
import React from 'react'
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }
const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => {
  return (
    <motion.div variants={fadeInUp} className="flex items-center space-x-2 text-gray-700">
      {icon}
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </motion.div>
  )
}

export default InfoItem