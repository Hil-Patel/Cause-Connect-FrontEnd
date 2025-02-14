import {CalendarDays,User,ChevronRight} from "lucide-react"
import { motion } from 'framer-motion';
import InfoItem from './InfoItem';
import RegistrationCountdown from './RegistrationCountdown';

interface Event {
    id: number
    name: string
    Description: string
    address: string
    city: string
    Status: string
    lastDateToRegister: string
    EventDate: string
    volunteerRequestList: any[]
    eventVolunteer: EventVolunteer[]
  }
  
interface EventVolunteer {
    id: number
    task: string
    volunteer: any
    event: Event
  }

const EventCard = ({ event, highlight }: { event: Event; highlight: boolean }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white shadow-md rounded-xl overflow-hidden ${highlight ? "border-2 border-blue-500 transform rotate-1" : ""}`}
    >
      <div className={`p-6 h-full flex flex-col ${highlight ? "bg-gradient-to-br from-blue-50 to-white" : ""}`}>
        {highlight && (
          <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs font-bold uppercase rounded-bl">
            Upcoming
          </div>
        )}
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{event.name}</h3>
        <p className="text-gray-600 mb-4">{event.city}</p>
        <p className="mb-4 text-gray-700 flex-grow">{event.Description}</p>
        <InfoItem icon={<CalendarDays className="w-4 h-4" />} label="Event Date" value={event.EventDate} />
        <InfoItem
          icon={<User className="w-4 h-4" />}
          label="Volunteers"
          value={event.eventVolunteer.length.toString()}
        />
        {highlight && <RegistrationCountdown lastDate={event.lastDateToRegister} />}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`mt-4 ${
            highlight ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 hover:bg-gray-600"
          } text-white font-bold py-2 px-4 rounded-full inline-flex items-center justify-center transition-colors duration-300`}
        >
          View Details
          <ChevronRight className="ml-2 h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default EventCard