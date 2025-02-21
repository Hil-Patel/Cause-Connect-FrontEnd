import React from 'react';
import { Check, X } from 'lucide-react';
import { Volunteer } from '../types';

interface VolunteerCardProps {
  volunteer: Volunteer;
  index: number;
  highlightedCard: number;
  onAccept: (volunteer: Volunteer) => void;
  onDecline: (volunteer: Volunteer) => void;
}

export function VolunteerCard({ volunteer, index, highlightedCard, onAccept, onDecline }: VolunteerCardProps) {
  return (
    <div 
      className={`bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-500 hover:shadow-2xl ${
        index === highlightedCard ? 'bg-gradient-to-r from-white via-blue-50 to-white bg-pos-0 animate-gradient' : ''
      }`}
    >
      <div className="space-y-8">
        <div className="flex items-center space-x-6">
          <div className={`h-20 w-20 rounded-2xl flex items-center justify-center shadow-inner ${
            index === highlightedCard 
              ? 'bg-blue-100 ring-4 ring-blue-50 transition-all duration-500' 
              : 'bg-gray-50'
          }`}>
            <span className="text-3xl font-bold text-blue-600">
              {volunteer.fullName.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{volunteer.fullName}</h3>
            <p className="text-lg text-gray-500 flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              {volunteer.age} years • {volunteer.gender}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-6 rounded-xl">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-gray-900">{volunteer.email}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="text-gray-900">{volunteer.phoneNumber}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="text-gray-900">{volunteer.address}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">City</p>
              <p className="text-gray-900">{volunteer.city}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Experience</h4>
          <p className="text-gray-700 leading-relaxed">{volunteer.experience}</p>
        </div>
        
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
          <button
            onClick={() => onAccept(volunteer)}
            className="inline-flex items-center px-8 py-4 rounded-xl text-white bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1"
          >
            <Check className="w-5 h-5 mr-2" />
            Accept Request
          </button>
          <button
            onClick={() => onDecline(volunteer)}
            className="inline-flex items-center px-8 py-4 rounded-xl text-white bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1"
          >
            <X className="w-5 h-5 mr-2" />
            Decline Request
          </button>
        </div>
      </div>
    </div>
  );
}