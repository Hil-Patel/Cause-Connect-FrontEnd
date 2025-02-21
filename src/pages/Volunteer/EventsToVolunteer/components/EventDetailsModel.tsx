import React, { useEffect } from 'react';
import { X, Calendar, MapPin, Clock, Users, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

interface EventDetailsModalProps {
    event: Event;
    onClose: () => void;
    onApply: () => void;
}

const EventDetailsModel = ({ event, onClose, onApply }: EventDetailsModalProps) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'unset';
        };
      }, []);
    return (
        <AnimatePresence>
      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 flex items-center justify-center bg-black/50  z-50"
  onClick={onClose}
>
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9, y: 20 }}
    transition={{ type: "spring", duration: 0.5 }}
    className="w-full max-w-4xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh]"
    onClick={e => e.stopPropagation()}
  >
          {/* Fixed Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gray-900"
            >
              {event.name}
            </motion.h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-6 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Event Details</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex col-span-2 items-center text-gray-600 bg-white p-3 rounded-lg"
                  >
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    <span>Location: {event.address}, {event.city}</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center text-gray-600 bg-white p-3 rounded-lg"
                  >
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    <span>Event Date: {event.eventDate}</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center text-gray-600 bg-white p-3 rounded-lg"
                  >
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    <span>Registration Deadline: {event.lastDateToRegister}</span>
                  </motion.div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Host Organization</h3>
                <div className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="font-medium text-gray-900 text-xl mb-2">{event.host.ngoName}</p>
                    <p className="text-gray-600">{event.host.ngoAim}</p>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center text-gray-600 bg-white p-3 rounded-lg"
                    >
                      <Users className="w-5 h-5 mr-2 text-blue-600" />
                      <span>{event.host.numberOfMember} Members</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center text-gray-600 bg-white p-3 rounded-lg"
                    >
                      <Mail className="w-5 h-5 mr-2 text-blue-600" />
                      <span>{event.host.email}</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center text-gray-600 bg-white p-3 rounded-lg"
                    >
                      <Phone className="w-5 h-5 mr-2 text-blue-600" />
                      <span>{event.host.phoneNumber}</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center text-gray-600 bg-white p-3 rounded-lg"
                    >
                      <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                      <span>{event.host.address}</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Fixed Footer */}
          <div className="p-6 border-t border-gray-100">
            <div className="flex justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onApply}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
              >
                Confirm Application
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
    );
}

export default EventDetailsModel