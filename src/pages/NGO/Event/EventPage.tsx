
import { useState, useEffect } from 'react';
import { EventHeader } from './components/EventHeader';
import { Tabs } from './components/Tabs';
import { AcceptModal } from './components/AcceptModal';
import { DeclineModal } from './components/DeclineModal';
import { Event, TimeLeft, Volunteer } from './types';
import { NGOFetchEventDetails } from "../../../ApiEndPoints/ApiCalls"
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setLoading } from '../../../features/loadingSlice';

const EventPage = () => {
  const [activeTab, setActiveTab] = useState<'requests' | 'volunteers'>('requests');
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [task, setTask] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [registrationTimeLeft, setRegistrationTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [errors, setErrors] = useState({ task: '', declineReason: '' });
  const [highlightedCard, setHighlightedCard] = useState(0);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.isLoading);
  const Token = useSelector((state: RootState) => state.loggedIn.Token)
  const { id } = useParams<{ id: string }>(); 
  const eventId = parseInt(id);
  
  

  const [event, setEvent] = useState<Event >({
    event_id: 1,
    name: "medical camp",
    description: "medical camp to treat the animals in need.",
    address: "DDU Nadiad,gujarat",
    city: "Nadiad",
    status: "UPCOMING",
    lastDateToRegister: "21-02-2025 21:27",
    eventDate: "21-02-2025 21:27",
    host: null,
    volunteerRequestList: [
      {
        id: 2,
        fullName: "Hil Patel",
        email: "hilrpatel5678@gmail.com",
        phoneNumber: "+919725713039",
        age: 20,
        gender: "Male",
        address: "B 204 Yogidarshan residency, zadeshwar",
        city: "Bharuch, Gujarat",
        experience: "I have attended many events as an volunteer in many different events in nadiad city.",
        events: []
      }
    ],
    eventVolunteer: []
  });

  const FetchEvent = async () => {
    dispatch(setLoading(true));
    const res = await NGOFetchEventDetails(eventId, JSON.parse(Token))
    
    if (res.statusCode >= 200 && res.statusCode < 300) {
      setEvent(res.data)
      toast.success(res.message)
    }
    else {
      toast.error(res.message)
    }
    dispatch(setLoading(false))
    
  }
  
  useEffect(() => {
    FetchEvent();
  },[]); 
  

  useEffect(() => {
    if (!event) return; // ✅ Prevents running effect when event is null

    const calculateTimeLeft = (targetDate?: string): TimeLeft => {
      if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      const dateTimeParts = targetDate.split(" ");
      const dateParts = dateTimeParts[0].split("-");

      const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${dateTimeParts[1]}:00`;
      const end = new Date(formattedDate);
      const difference = end.getTime() - new Date().getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(event?.eventDate));
      setRegistrationTimeLeft(calculateTimeLeft(event?.lastDateToRegister));
    }, 1000);

    const highlightTimer = setInterval(() => {
      setHighlightedCard((prev) => (prev + 1) % event.volunteerRequestList.length);
    }, 5000);

    return () => {
      clearInterval(timer)
      clearInterval(highlightTimer)
    }
  }, [event]); 

  const handleAccept = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsAcceptModalOpen(true);
    setErrors({ task: '', declineReason: '' });
  };

  const handleDecline = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsDeclineModalOpen(true);
    setErrors({ task: '', declineReason: '' });
  };

  const confirmAccept = () => {
    if (!task.trim()) {
      setErrors(prev => ({ ...prev, task: 'Please assign a task to the volunteer' }));
      return;
    }
    console.log('Accepted volunteer:', selectedVolunteer, 'with task:', task);
    setIsAcceptModalOpen(false);
    setTask('');
    setSelectedVolunteer(null);
    setErrors({ task: '', declineReason: '' });
  };

  const confirmDecline = () => {
    if (!declineReason.trim()) {
      setErrors(prev => ({ ...prev, declineReason: 'Please provide a reason for declining' }));
      return;
    }
    console.log('Declined volunteer:', selectedVolunteer, 'with reason:', declineReason);
    setIsDeclineModalOpen(false);
    setDeclineReason('');
    setSelectedVolunteer(null);
    setErrors({ task: '', declineReason: '' });
  };

  const formatTimeLeft = (time: TimeLeft) => {
    return `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`;
  };


  return (
    
    <div className="min-h-screen bg-gray-100">
      {loading?
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[9999]">
    <span className="loader"></span>
  </div>
  :  (<>
      <EventHeader
      event={event}
      timeLeft={timeLeft}
      registrationTimeLeft={registrationTimeLeft}
      formatTimeLeft={formatTimeLeft}
      />

      <Tabs
      activeTab={activeTab}
      event={event}
      highlightedCard={highlightedCard}
      onTabChange={setActiveTab}
      onAccept={handleAccept}
      onDecline={handleDecline}
      />

      {isAcceptModalOpen && selectedVolunteer && (
        <AcceptModal
        volunteer={selectedVolunteer}
        task={task}
        error={errors.task}
        onClose={() => {
          setIsAcceptModalOpen(false);
          setErrors({ task: '', declineReason: '' });
        }}
        onConfirm={confirmAccept}
        onTaskChange={(value) => {
          setTask(value);
          if (value.trim()) {
            setErrors(prev => ({ ...prev, task: '' }));
          }
        }}
        />
      )}

      {isDeclineModalOpen && selectedVolunteer && (
        <DeclineModal
        volunteer={selectedVolunteer}
        reason={declineReason}
        error={errors.declineReason}
        onClose={() => {
          setIsDeclineModalOpen(false);
          setErrors({ task: '', declineReason: '' });
        }}
        onConfirm={confirmDecline}
        onReasonChange={(value) => {
          setDeclineReason(value);
          if (value.trim()) {
            setErrors(prev => ({ ...prev, declineReason: '' }));
          }
        }}
        />
      )}
    </>)
    }
    </div>
  );
}

export default EventPage