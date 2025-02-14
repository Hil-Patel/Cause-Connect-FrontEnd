import React, { useEffect, useState } from 'react'
import {AlertCircle} from "lucide-react"

const RegistrationCountdown = ({ lastDate }: { lastDate: string }) => {
    const [timeLeft, setTimeLeft] = useState<string>("")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const end = new Date(lastDate)
      const diff = end.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft("Registration Closed")
        clearInterval(timer)
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        setTimeLeft(`${days}d ${hours}h ${minutes}m`)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [lastDate])
  return (
    <div className="mt-4 flex items-center text-blue-600 font-semibold">
      <AlertCircle className="w-5 h-5 mr-2" />
      <span>Registration closes in: {timeLeft}</span>
    </div>
  )
}

export default RegistrationCountdown