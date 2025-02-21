import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import useCountdown from '../hooks/useCountdown';

interface Event {
    event_id: number;
    name: string;
    description: string;
    address: string;
    city: string;
    status: string;
    lastDateToRegister: string;
    eventDate: string;
    host: {
        id: number;
        ngoName: string;
        ngoAim: string;
        ngoDescription: string;
        email: string;
        phoneNumber: string;
        address: string;
        numberOfMember: number;
        city: string;
        accountNumber: number;
        password: null;
        owner: null;
        approved: boolean;
    };
    volunteerRequestList: null;
    eventVolunteer: null;
}
interface EventCardProps {
    event: Event;
    onApply: () => void;
}

const EventCard = ({ event, onApply }: EventCardProps) => {
    const { days, hours, minutes } = useCountdown(event.lastDateToRegister);
    const isExpired = days < 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl font-semibold text-gray-900"
                    >
                        {event.name}
                    </motion.h2>
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800"
                    >
                        {event.status}
                    </motion.span>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-3 mb-6"
                >
                    <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                        <span>{event.description}</span>
                    </div>
                    <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span className="font-semibold">City:</span>
                        <span className="ml-2">{event.city}</span>
                    </div>
                    <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span className="font-semibold">Event Date:</span>
                        <span className="ml-2">{event.eventDate}</span>
                    </div>

                    <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                        <Clock className="w-5 h-5 mr-2" />
                        <span className="font-semibold">Last Date to Register:</span>
                        <span className="ml-2">{event.lastDateToRegister}</span>
                    </div>

                </motion.div>

                {!isExpired && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-4 border border-blue-100"
                    >
                        <p className="text-sm text-gray-600 mb-3 font-medium">Registration closes in:</p>
                        <div className="flex justify-around">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="text-center bg-white px-4 py-2 rounded-lg shadow-sm"
                            >
                                <span className="block text-2xl font-bold text-blue-600">{days.toString()}</span>
                                <span className="text-xs text-gray-500 uppercase tracking-wide">Days</span>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="text-center bg-white px-4 py-2 rounded-lg shadow-sm"
                            >
                                <span className="block text-2xl font-bold text-blue-600">{hours.toString()}</span>
                                <span className="text-xs text-gray-500 uppercase tracking-wide">Hours</span>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="text-center bg-white px-4 py-2 rounded-lg shadow-sm"
                            >
                                <span className="block text-2xl font-bold text-blue-600">{minutes.toString()}</span>
                                <span className="text-xs text-gray-500 uppercase tracking-wide">Minutes</span>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onApply}
                    disabled={isExpired}
                    className={`w-full py-3 px-4 rounded-md text-white font-medium transition-all duration-300
              ${isExpired
                            ? 'bg-gray-400 cursor-not-allowed opacity-70'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg'}`}
                >
                    {isExpired ? 'Registration Closed' : 'Apply Now'}
                </motion.button>
            </div>
        </motion.div>
    );
}

export default EventCard