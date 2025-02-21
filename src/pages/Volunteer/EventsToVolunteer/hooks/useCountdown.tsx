import { useState, useEffect } from "react";

const useCountdown = (targetDate: string) => {
  const calculateTimeLeft = () => {
    try {
      const dateTimeParts = targetDate.split(" ");
      const dateParts = dateTimeParts[0].split("-");

      if (dateParts.length !== 3) {
        console.error("Invalid date format:", targetDate);
        return;
      }

      const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${dateTimeParts[1]}:00`;
      const target = new Date(formattedDate).getTime();
      const now = new Date().getTime();

      if (isNaN(target)) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const difference = target - now;

      if (difference <= 0) {
        return { days: -1, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } catch (error) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

export default useCountdown;
