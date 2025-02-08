import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

interface Volunteer {
    name: string
    phone: string
    address: string
    city: string
    email: string
    age: number
    gender: string
    experience: string
}

const VolunteerCard :  React.FC<{ volunteer: Volunteer }> = ({ volunteer }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md p-6 mb-4"
      >
        <h2 className="text-2xl font-bold mb-2">{volunteer.name}</h2>
        <p className="text-gray-600 mb-2">Phone: {volunteer.phone}</p>
        <p className="text-gray-600 mb-2">Address: {volunteer.address}</p>
        <p className="text-gray-600 mb-2">City: {volunteer.city}</p>
        <p className="text-gray-600 mb-2">Email: {volunteer.email}</p>
        <p className="text-gray-600 mb-2">Age: {volunteer.age}</p>
        <p className="text-gray-600 mb-2">Gender: {volunteer.gender}</p>
        <p className="text-gray-600 mb-2">Experience: {volunteer.experience}</p>
  
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4">
          <button
            className="bg-blue-500 w-full text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 inline-block"
          >
            View Details
          </button>
        </motion.div>
      </motion.div>
    )
}

export default VolunteerCard