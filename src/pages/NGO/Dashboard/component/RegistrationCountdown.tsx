import  { useEffect, useState } from 'react'
import {AlertCircle} from "lucide-react"

const RegistrationCountdown = ({ lastDate }: { lastDate: string }) => {
    const [timeLeft, setTimeLeft] = useState<string>("")

    useEffect(() => {
      // Split the input date string
      const dateTimeParts = lastDate.split(" ");
      const dateParts = dateTimeParts[0].split("-"); 
    
      if (dateParts.length !== 3) {
        console.error("Invalid date format:", lastDate);
        setTimeLeft("Invalid Date");
        return;
      }
      const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${dateTimeParts[1]}:00`;
      let end = new Date(formattedDate);
      if (isNaN(end.getTime())) {
        console.error("Invalid formatted date:", formattedDate);
        setTimeLeft("Invalid Date");
        return;
      }
      const timer = setInterval(() => {
        const now = new Date();
        const diff = end.getTime() - now.getTime();
        if (diff <= 0) {
          setTimeLeft("Registration Closed");
          clearInterval(timer);
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        }
      }, 1000);
    
      return () => clearInterval(timer);
    }, [lastDate]);
    
  return (
    <div className="mt-4 flex items-center text-blue-600 font-semibold">
      <AlertCircle className="w-5 h-5 mr-2" />
      <span>Registration closes in: {timeLeft}</span>
    </div>
  )
}

export default RegistrationCountdown