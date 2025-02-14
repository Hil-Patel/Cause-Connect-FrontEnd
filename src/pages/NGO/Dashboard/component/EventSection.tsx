import { motion } from 'framer-motion';
import EventCard from './EventCard';
import { CalendarX } from "lucide-react"

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

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

const EventSection = ({ title, events, highlight }: { title: string; events: Event[]; highlight: boolean }) => {
  return (
    <motion.div variants={fadeInUp}>
      <h2 className="text-3xl font-bold mb-6 text-blue-600">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="col-span-full flex flex-col items-center justify-center bg-gray-100 border border-gray-300 rounded-xl p-8"
          >
           <CalendarX className="h-16 w-16 text-blue-500 mb-4" />
            <p className="text-gray-700 text-lg font-medium text-center">
              No {title.toLowerCase()} available at the moment.
            </p>
            <p className="text-gray-500 text-sm text-center mt-2">
              Check back later for updates!
            </p>
          </motion.div>
        )}
        {events.map((event) => (
          <EventCard key={event.id} event={event} highlight={highlight} />
        ))}
      </div>
    </motion.div>
  )
}

export default EventSection