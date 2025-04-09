import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"

const ApprovedNgoCards = ({ ngo }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const baseURL = "http://localhost:8080"

    const ChevronIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
    const FileIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    )

    return (
        <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div className="p-4 cursor-pointer flex items-center justify-between" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-center space-x-4">
                    <div className="relative ">
                        <img
                            src={`${baseURL}${ngo.profilePic}`}
                            alt="NGO Profile"
                            className="rounded object-cover w-full h-full"
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-green-700">{ngo.ngoName}</h2>
                        <p className="text-green-600 text-sm">{ngo.ngoDescription}</p>
                    </div>
                </div>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-gray-500">
                    <ChevronIcon />
                </motion.div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-4 pt-0">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-semibold text-green-700 mb-4">NGO Details</h3>
                                    <div className="space-y-2">
                                        <p>
                                            <span className="font-medium">Aim:</span> {ngo.ngoAim}
                                        </p>
                                        <p>
                                            <span className="font-medium">Email:</span> {ngo.email}
                                        </p>
                                        <p>
                                            <span className="font-medium">Phone:</span> {ngo.phoneNumber}
                                        </p>
                                        <p>
                                            <span className="font-medium">Address:</span> {ngo.address}
                                        </p>
                                        <p>
                                            <span className="font-medium">Members:</span> {ngo.numberOfMember}
                                        </p>
                                        <p>
                                            <span className="font-medium">City:</span> {ngo.city}
                                        </p>
                                        <p>
                                            <span className="font-medium">Account Number:</span> {ngo.accountNumber}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-green-700 mb-4">Owner Details</h3>
                                    <div className="space-y-2">
                                        <p>
                                            <span className="font-medium">Name:</span> {ngo.owner.fullName}
                                        </p>
                                        <p>
                                            <span className="font-medium">Email:</span> {ngo.owner.ownerEmail}
                                        </p>
                                        <p>
                                            <span className="font-medium">Phone:</span> {ngo.owner.ownerPhoneNumber}
                                        </p>
                                        <p>
                                            <span className="font-medium">Age:</span> {ngo.owner.age}
                                        </p>
                                        <p>
                                            <span className="font-medium">Gender:</span> {ngo.owner.gender}
                                        </p>
                                        <p>
                                            <span className="font-medium">Experience:</span> {ngo.owner.experience}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-xl font-semibold text-green-700 mb-4">Documents</h3>
                                <div className="flex flex-wrap gap-4">
                                    <a href={`${baseURL}${ngo.fileSystemDto.bankStatementUrl}`} target="_blank" rel="noopener noreferrer">
                                        <motion.div
                                            className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-100"
                                            whileHover={{ scale: 1.05, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            <FileIcon />
                                            Bank Statement
                                        </motion.div>
                                    </a>
                                    <a href={`${baseURL}${ngo.fileSystemDto.transcriptUrl}`} target="_blank" rel="noopener noreferrer">
                                        <motion.div
                                            className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-100"
                                            whileHover={{ scale: 1.05, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            <FileIcon />
                                            Transcript
                                        </motion.div>
                                    </a>
                                </div>
                            </div>
                            {/* <div className="mt-8 flex justify-end gap-4">
                                <button
                                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    View More
                                </button>
                            </div> */}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ApprovedNgoCards