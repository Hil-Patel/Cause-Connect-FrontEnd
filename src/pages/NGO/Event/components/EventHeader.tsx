import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Event, TimeLeft } from '../types';

interface EventHeaderProps {
  event: Event;
  timeLeft: TimeLeft;
  registrationTimeLeft: TimeLeft;
  formatTimeLeft: (time: TimeLeft) => string;
}

export function EventHeader({ event, timeLeft, registrationTimeLeft, formatTimeLeft }: EventHeaderProps) {
  return (
    <div className="bg-white shadow-xl border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{event.name}</h1>
          <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-6 py-3 rounded-full shadow-md">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Event in: {formatTimeLeft(timeLeft)}</span>
          </div>
        </div>
        
        <p className="text-xl text-gray-600 mb-10">{event.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <MapPin className="w-8 h-8 text-red-500" />
            <div>
              <p className="font-semibold text-gray-900">Location</p>
              <p className="text-gray-600">{event.address}, {event.city}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <Calendar className="w-8 h-8 text-green-500" />
            <div>
              <p className="font-semibold text-gray-900">Event Date</p>
              <p className="text-gray-600">{event.eventDate}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <Clock className="w-8 h-8 text-orange-500" />
            <div>
              <p className="font-semibold text-gray-900">Registration Closes In</p>
              <p className="text-gray-600">{formatTimeLeft(registrationTimeLeft)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}