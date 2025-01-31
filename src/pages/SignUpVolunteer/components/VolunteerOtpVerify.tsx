import React, { useEffect, useRef, useState } from 'react'


interface OtpModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (otp: string) => void
}

const VolunteerOtpVerify = ({ isOpen, onClose, onSubmit }: OtpModalProps) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  
    useEffect(() => {
      let timer: NodeJS.Timeout
      if (isOpen && timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1)
        }, 1000)
      }
      return () => clearInterval(timer)
    }, [isOpen, timeLeft])
  
    const handleChange = (index: number, value: string) => {
      if (value.length <= 1 && /^\d*$/.test(value)) {
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
  
        if (value !== "" && index < 5) {
          inputRefs.current[index + 1]?.focus()
        }
      }
    }
  
    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(otp.join(""))
    }
  
    const handleResend = () => {
      setTimeLeft(300)
    }
  
    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
    }
  
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-9999">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="otp-1" className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <div className="flex justify-between">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      id={`otp-${index + 1}`}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength={1}
                      autoComplete="off"
                    />
                  ))}
                </div>
              </div>
              <div className="text-center">
                {timeLeft > 0 ? (
                  <p className="text-sm text-gray-600">Time remaining: {formatTime(timeLeft)}</p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-white text-black border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={otp.some((digit) => digit === "") || timeLeft === 0}
                  className="px-4 py-2 bg-[#FF5722] text-white rounded-md hover:bg-[#E64A19] focus:outline-none focus:ring-2 focus:ring-[#FF5722] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify & SignUp
                </button>
              </div>
            </form>
          </div>
        </div>
      )
}

export default VolunteerOtpVerify