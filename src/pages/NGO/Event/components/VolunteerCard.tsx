import React from 'react';
import { Check, X, Clipboard } from 'lucide-react';
import { Volunteer } from '../types';

interface VolunteerCardProps {
  volunteer: Volunteer;
  index: number;
  highlightedCard: number;
  onAccept: (volunteer: Volunteer) => void;
  onDecline: (volunteer: Volunteer) => void;
}

export function VolunteerCard({ volunteer, index, highlightedCard, onAccept, onDecline, isAcceptedVolunteer = false }: VolunteerCardProps) {
  const volunteerData = isAcceptedVolunteer ? (volunteer as EventVolunteer).volunteer : volunteer as Volunteer;
  const task = isAcceptedVolunteer ? (volunteer as EventVolunteer).task : null;

  return (
    <div 
      className={`bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-500 hover:shadow-2xl hover:border-blue-100 ${
        !isAcceptedVolunteer && index === highlightedCard ? 'bg-gradient-to-r from-white via-blue-50 to-white bg-pos-0 animate-gradient scale-[1.02]' : ''
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className={`h-16 w-16 rounded-xl flex items-center justify-center shadow-inner transform transition-all duration-500 ${
            !isAcceptedVolunteer && index === highlightedCard 
              ? 'bg-blue-100 ring-4 ring-blue-50 rotate-3' 
              : 'bg-gray-50 hover:rotate-3 hover:bg-blue-50'
          }`}>
            <span className="text-2xl font-bold text-blue-600">
              {volunteerData.fullName.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{volunteerData.fullName}</h3>
            <p className="text-base text-gray-500 flex items-center">
              <span className={`inline-block w-2 h-2 rounded-full mr-2 transition-colors duration-500 ${
                isAcceptedVolunteer ? 'bg-green-500' : (
                  index === highlightedCard ? 'bg-blue-500 animate-pulse' : 'bg-blue-500'
                )
              }`}></span>
              {volunteerData.age} years • {volunteerData.gender}
            </p>
          </div>
        </div>
        
        {isAcceptedVolunteer && task && (
          <div className="bg-green-50 p-4 rounded-xl transform transition-all duration-500 hover:bg-green-50/70">
            <div className="flex items-start space-x-3">
              <Clipboard className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-base font-semibold text-green-900 mb-1">Assigned Task</h4>
                <p className="text-green-800 text-sm whitespace-pre-line">{task}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl transform transition-all duration-500 hover:bg-blue-50/30">
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500">Email</p>
              <p className="text-sm text-gray-900">{volunteerData.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500">Phone</p>
              <p className="text-sm text-gray-900">{volunteerData.phoneNumber}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500">Address</p>
              <p className="text-sm text-gray-900">{volunteerData.address}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500">City</p>
              <p className="text-sm text-gray-900">{volunteerData.city}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-xl transform transition-all duration-500 hover:bg-blue-50/30">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Experience</h4>
          <p className="text-sm text-gray-700 leading-relaxed">{volunteerData.experience}</p>
        </div>
        
        {!isAcceptedVolunteer && (
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => onAccept(volunteerData)}
              className="inline-flex items-center px-6 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 hover:scale-105"
            >
              <Check className="w-4 h-4 mr-2" />
              Accept Request
            </button>
            <button
              onClick={() => onDecline(volunteerData)}
              className="inline-flex items-center px-6 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 hover:scale-105"
            >
              <X className="w-4 h-4 mr-2" />
              Decline Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
}