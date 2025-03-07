"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Calendar,
  MapPin,
  HourglassIcon,
  CheckCircle,
  Clock,
  CalendarX,
  Mail,
  Phone,
  User,
  Building,
  Award,
  Info,
} from "lucide-react"
import { setLoading } from "../../../features/loadingSlice"
import { VolunteerDashboardData } from "../../../ApiEndPoints/ApiCalls"
import toast from "react-hot-toast"
import { motion } from "framer-motion"

interface EventCard {
  id: number
  task: string
  event: {
    event_id: number
    name: string
    description: string
    address: string
    city: string
    status: string
    lastDateToRegister: string
    eventDate: string
    host?: {
      id: number
      ngoName: string
      ngoAim: string
      ngoDescription: string
      email: string
      phoneNumber: string
      address: string
      numberOfMember: number
      city: string
      accountNumber: number
      owner: {
        id: number
        fullName: string
        ownerEmail: string
        ownerPhoneNumber: string
        age: number
        gender: string
        experience: string
      }
      approved: boolean
    }
  }
}

interface PendingEvent {
  event_id: number
  name: string
  description: string
  address: string
  city: string
  status: string
  lastDateToRegister: string
  eventDate: string
  host: {
    id: number
    ngoName: string
    ngoAim: string
    ngoDescription: string
    email: string
    phoneNumber: string
    address: string
    numberOfMember: number
    city: string
    accountNumber: number
    owner: {
      id: number
      fullName: string
      ownerEmail: string
      ownerPhoneNumber: string
      age: number
      gender: string
      experience: string
    }
    approved: boolean
  }
}

interface RootState {
  loading: {
    isLoading: boolean
  }
  loggedIn: {
    Token: string
  }
}

const VolunteerDashboard = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: RootState) => state.loading.isLoading)
  const Token = useSelector((state: RootState) => state.loggedIn.Token)
  const [volunteerData, setVolunteerData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "pending">("upcoming")
  const [selectedEvent, setSelectedEvent] = useState<EventCard | PendingEvent | null>(null)
  const [showEventDetails, setShowEventDetails] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      dispatch(setLoading(true))
      const response = await VolunteerDashboardData(JSON.parse(Token))
      if (response.statusCode >= 200 && response.statusCode < 300) {
        setVolunteerData(response.data)
        toast.success(response.message)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error("Failed to fetch dashboard data")
    } finally {
      dispatch(setLoading(false))
    }
  }

  const upcomingEvents = volunteerData?.events.filter((event: EventCard) => event.event.status === "UPCOMING") || []

  const completedEvents = volunteerData?.events.filter((event: EventCard) => event.event.status === "COMPLETED") || []

  const pendingRequests = volunteerData?.eventsRequestList || []

  const handleEventClick = (event: EventCard | PendingEvent) => {
    setSelectedEvent(event)
    setShowEventDetails(true)
  }

  const closeEventDetails = () => {
    setShowEventDetails(false)
    setSelectedEvent(null)
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[9999]">
        <span className="loader"></span>
      </div>
    )
  }

  if (!volunteerData) {
    return null
  }

  const EventCard = ({
    event,
    type,
  }: { event: EventCard | PendingEvent; type: "upcoming" | "completed" | "pending" }) => {
    const isPendingEvent = "event_id" in event
    const eventData = isPendingEvent ? event : event.event

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
        onClick={() => handleEventClick(event)}
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{isPendingEvent ? event.name : eventData.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {isPendingEvent ? event.description : eventData.description}
            </p>
          </div>

          {!isPendingEvent && "task" in event && (
            <div
              className={`rounded-lg p-4 ${
                type === "upcoming" ? "bg-blue-50" : type === "completed" ? "bg-green-50" : "bg-orange-50"
              }`}
            >
              <h4
                className={`font-semibold mb-2 ${
                  type === "upcoming" ? "text-blue-900" : type === "completed" ? "text-green-900" : "text-orange-900"
                }`}
              >
                Assigned Task
              </h4>
              <p
                className={`text-sm ${
                  type === "upcoming" ? "text-blue-800" : type === "completed" ? "text-green-800" : "text-orange-800"
                }`}
              >
                {event.task}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              {isPendingEvent ? `${event.address}, ${event.city}` : `${eventData.address}, ${eventData.city}`}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              {isPendingEvent ? event.eventDate : eventData.eventDate}
            </div>
            {isPendingEvent && event.host && (
              <div className="flex items-center text-gray-600 text-sm">
                <Building className="w-4 h-4 mr-2 text-gray-400" />
                {event.host.ngoName}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                type === "upcoming"
                  ? "bg-blue-100 text-blue-800"
                  : type === "completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-orange-100 text-orange-800"
              }`}
            >
              {type === "pending" ? "Pending Approval" : isPendingEvent ? event.status : eventData.status}
            </span>
          </div>
        </div>
      </motion.div>
    )
  }

  const EventDetailModal = () => {
    if (!selectedEvent) return null

    const isPendingEvent = "event_id" in selectedEvent
    const eventData = isPendingEvent ? selectedEvent : selectedEvent.event
    const host = isPendingEvent ? selectedEvent.host : eventData.host

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999] p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{isPendingEvent ? selectedEvent.name : eventData.name}</h2>
            <button onClick={closeEventDetails} className="text-gray-500 hover:text-gray-700 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Event Details</h3>
              <p className="text-gray-700 mb-4">{isPendingEvent ? selectedEvent.description : eventData.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Location</p>
                    <p className="text-gray-600">
                      {isPendingEvent ? selectedEvent.address : eventData.address},{" "}
                      {isPendingEvent ? selectedEvent.city : eventData.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-2 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Event Date</p>
                    <p className="text-gray-600">{isPendingEvent ? selectedEvent.eventDate : eventData.eventDate}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-5 h-5 mr-2 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Registration Deadline</p>
                    <p className="text-gray-600">
                      {isPendingEvent ? selectedEvent.lastDateToRegister : eventData.lastDateToRegister}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Info className="w-5 h-5 mr-2 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Status</p>
                    <p
                      className={`${
                        (isPendingEvent ? selectedEvent.status : eventData.status) === "UPCOMING"
                          ? "text-blue-600"
                          : (isPendingEvent ? selectedEvent.status : eventData.status) === "COMPLETED"
                            ? "text-green-600"
                            : "text-orange-600"
                      }`}
                    >
                      {isPendingEvent ? selectedEvent.status : eventData.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {!isPendingEvent && "task" in selectedEvent && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-blue-900">Your Assigned Task</h3>
                <p className="text-blue-800">{selectedEvent.task}</p>
              </div>
            )}

            {host && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Hosting Organization</h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Building className="w-5 h-5 mr-2 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-700">NGO Name</p>
                      <p className="text-gray-600">{host.ngoName}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Award className="w-5 h-5 mr-2 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-700">NGO Aim</p>
                      <p className="text-gray-600">{host.ngoAim}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Info className="w-5 h-5 mr-2 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-700">NGO Description</p>
                      <p className="text-gray-600">{host.ngoDescription}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 mr-2 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-700">Email</p>
                        <p className="text-gray-600">{host.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="w-5 h-5 mr-2 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-700">Phone</p>
                        <p className="text-gray-600">{host.phoneNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mr-2 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-700">Address</p>
                        <p className="text-gray-600">
                          {host.address}, {host.city}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <User className="w-5 h-5 mr-2 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-700">Members</p>
                        <p className="text-gray-600">{host.numberOfMember}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">NGO Owner</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <User className="w-5 h-5 mr-2 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-700">Name</p>
                          <p className="text-gray-600">{host.owner.fullName}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Mail className="w-5 h-5 mr-2 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-700">Email</p>
                          <p className="text-gray-600">{host.owner.ownerEmail}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Phone className="w-5 h-5 mr-2 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-700">Phone</p>
                          <p className="text-gray-600">{host.owner.ownerPhoneNumber}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Info className="w-5 h-5 mr-2 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-700">Age & Gender</p>
                          <p className="text-gray-600">
                            {host.owner.age} years, {host.owner.gender}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={closeEventDetails}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  const StatCard = ({
    icon: Icon,
    title,
    value,
    color,
  }: { icon: any; title: string; value: string | number; color: string }) => (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex items-center space-x-4">
        <div className={`rounded-full p-3 ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="h-24 w-24 rounded-2xl bg-blue-100 flex items-center justify-center shadow-inner">
              <span className="text-4xl font-bold text-blue-600">{volunteerData.fullName.charAt(0)}</span>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{volunteerData.fullName}</h1>
                <div className="flex flex-wrap gap-2 text-gray-600">
                  <p className="flex items-center">
                    <Mail className="w-4 h-4 mr-1 text-gray-400" />
                    {volunteerData.email}
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 mr-1 text-gray-400" />
                    {volunteerData.phoneNumber}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <p className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                  {volunteerData.address}
                </p>
                <p className="flex items-center text-gray-600">
                  <Building className="w-5 h-5 mr-2 text-indigo-500" />
                  {volunteerData.city}
                </p>
                <p className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2 text-green-500" />
                  {volunteerData.age} years old
                </p>
                <p className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-2 text-purple-500" />
                  {volunteerData.gender}
                </p>
              </div>

              {volunteerData.experience && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-1">Experience</h3>
                  <p className="text-gray-600">{volunteerData.experience}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard icon={Clock} title="Upcoming Events" value={upcomingEvents.length} color="bg-blue-500" />
          <StatCard icon={CheckCircle} title="Completed Events" value={completedEvents.length} color="bg-green-500" />
          <StatCard
            icon={HourglassIcon}
            title="Pending Requests"
            value={pendingRequests.length}
            color="bg-orange-500"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === "upcoming"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Upcoming Events ({upcomingEvents.length})</span>
              </div>
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === "completed"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Completed Events ({completedEvents.length})</span>
              </div>
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === "pending"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              <div className="flex items-center justify-center gap-2">
                <HourglassIcon className="w-5 h-5" />
                <span>Pending Requests ({pendingRequests.length})</span>
              </div>
            </button>
          </div>
        </div>

        {/* Events Section */}
        <div className="space-y-8">
          {activeTab === "upcoming" && (
            <div>
              {upcomingEvents.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl p-12"
                >
                  <CalendarX className="h-16 w-16 text-blue-500 mb-4" />
                  <p className="text-gray-700 text-lg font-medium text-center">
                    No upcoming events available at the moment.
                  </p>
                  <p className="text-gray-500 text-sm text-center mt-2">Check back later for updates!</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event: EventCard) => (
                    <EventCard key={event.id} event={event} type="upcoming" />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "completed" && (
            <div>
              {completedEvents.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl p-12"
                >
                  <CalendarX className="h-16 w-16 text-green-500 mb-4" />
                  <p className="text-gray-700 text-lg font-medium text-center">
                    No completed events available at the moment.
                  </p>
                  <p className="text-gray-500 text-sm text-center mt-2">Your completed events will appear here.</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedEvents.map((event: EventCard) => (
                    <EventCard key={event.id} event={event} type="completed" />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "pending" && (
            <div>
              {pendingRequests.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl p-12"
                >
                  <CalendarX className="h-16 w-16 text-orange-500 mb-4" />
                  <p className="text-gray-700 text-lg font-medium text-center">
                    No pending requests available at the moment.
                  </p>
                  <p className="text-gray-500 text-sm text-center mt-2">
                    Your pending event requests will appear here.
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingRequests.map((event: PendingEvent) => (
                    <EventCard key={event.event_id} event={event} type="pending" />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Event Detail Modal */}
      {showEventDetails && <EventDetailModal />}
    </div>
  )
}

export default VolunteerDashboard

