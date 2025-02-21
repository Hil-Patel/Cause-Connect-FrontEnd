import React, { useEffect, useState } from 'react';
import {VolunteerFetchEvents,VolunteerRequestToJoinEvents} from "../../../ApiEndPoints/ApiCalls"
import EventCard from './components/EventCard';
import EventDetailsModel from './components/EventDetailsModel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

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


const EventsToVolunteer = () => {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [requestToJoin,setRequestToJoin]=useState(false)
    const token = useSelector((state: RootState) => state.loggedIn.Token)
    const [events, setEvents] = useState([]);

    const HandleJoinRequest=async()=>{
        setRequestToJoin(true)
        const res=await VolunteerRequestToJoinEvents({eventId:selectedEvent?.event_id},JSON.parse(token))
        if (res.statusCode >= 200 && res.statusCode < 300) {
            setSelectedEvent(null)
            toast.success(res.message)
        }
        else {
            toast.error(res.message)
        }
        setRequestToJoin(false)

    }

    const FetchEvents = async () => {
        setLoading(true);
        const res=await VolunteerFetchEvents(JSON.parse(token))
        
        if (res.statusCode >= 200 && res.statusCode < 300) {
            setEvents(res.data)
            console.log(res.data);
            
        }
        else {
            toast.error(res.message)
        }
        setLoading(false);
    }
    useEffect(() => {
        FetchEvents();
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {requestToJoin && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[9999]">
                    <span className="loader"></span>
                </div>
            )}
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        [...Array(6)].map((_, index) => (
                            <motion.div key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <motion.div
                                            className="h-7 w-48 bg-gray-200 rounded-md"
                                            animate={{ opacity: [0.5, 0.8, 0.5] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                        <motion.div
                                            className="h-6 w-24 bg-blue-100 rounded-full"
                                            animate={{ opacity: [0.5, 0.8, 0.5] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        {[1, 2, 3].map((index) => (
                                            <motion.div
                                                key={index}
                                                className="flex items-center"
                                                animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    delay: index * 0.2
                                                }}
                                            >
                                                <div className="w-5 h-5 bg-gray-200 rounded-full mr-2" />
                                                <div className="h-4 w-32 bg-gray-200 rounded-md" />
                                            </motion.div>
                                        ))}
                                    </div>

                                    <motion.div
                                        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-4"
                                    >
                                        <div className="h-4 w-40 bg-gray-200 rounded-md mb-3" />
                                        <div className="flex justify-around">
                                            {[1, 2, 3].map((index) => (
                                                <motion.div
                                                    key={index}
                                                    className="text-center bg-white px-4 py-2 rounded-lg"
                                                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        delay: index * 0.2
                                                    }}
                                                >
                                                    <div className="h-8 w-12 bg-gray-200 rounded-md mb-1" />
                                                    <div className="h-3 w-10 bg-gray-200 rounded-md" />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="h-12 w-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-md"
                                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                </div>
                            </motion.div>
                        ))
                    ) :
                    events.length==0 ? 
                        <p>No events available</p>
                        :
                        events.map((event) => (
                            <EventCard
                                key={event.event_id}
                                event={event}
                                onApply={() => setSelectedEvent(event)}
                                />
                        ))
                    }
                </div>
            </div>

            {selectedEvent && (
                <EventDetailsModel
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    onApply={() => {
                        HandleJoinRequest()
                    }}
                />
            )}
        </div>
    );
}

export default EventsToVolunteer