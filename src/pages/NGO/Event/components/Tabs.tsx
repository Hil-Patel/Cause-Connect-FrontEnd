import React from 'react';
import { Users } from 'lucide-react';
import { Event } from '../types';
import { VolunteerCard } from './VolunteerCard';

interface TabsProps {
  activeTab: 'requests' | 'volunteers';
  event: Event;
  highlightedCard: number;
  onTabChange: (tab: 'requests' | 'volunteers') => void;
  onAccept: (volunteer: any) => void;
  onDecline: (volunteer: any) => void;
}

export function Tabs({ activeTab, event, highlightedCard, onTabChange, onAccept, onDecline }: TabsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-2 mb-8">
        <nav className="flex space-x-4">
          <button
            onClick={() => onTabChange('requests')}
            className={`${
              activeTab === 'requests'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            } flex-1 py-4 px-6 rounded-lg font-medium text-sm transition-all duration-200`}
          >
            Volunteer Requests ({event.volunteerRequestList.length})
          </button>
          <button
            onClick={() => onTabChange('volunteers')}
            className={`${
              activeTab === 'volunteers'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            } flex-1 py-4 px-6 rounded-lg font-medium text-sm transition-all duration-200`}
          >
            Event Volunteers ({event.eventVolunteer.length})
          </button>
        </nav>
      </div>

      <div className="space-y-8">
        {activeTab === 'requests' && (
          <div className="space-y-8">
            {event.volunteerRequestList.map((volunteer, index) => (
              <VolunteerCard
                key={volunteer.id}
                volunteer={volunteer}
                index={index}
                highlightedCard={highlightedCard}
                onAccept={onAccept}
                onDecline={onDecline}
              />
            ))}
          </div>
        )}

        {activeTab === 'volunteers' && (
          <div className="space-y-8">
            {event.eventVolunteer.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-xl border border-gray-100">
                <Users className="mx-auto h-20 w-20 text-gray-400" />
                <h3 className="mt-6 text-xl font-semibold text-gray-900">No volunteers yet</h3>
                <p className="mt-2 text-gray-500 max-w-sm mx-auto">No volunteers have been accepted for this event.</p>
              </div>
            ) : (
              event.eventVolunteer.map((volunteer) => (
                <VolunteerCard
                  key={volunteer.id}
                  volunteer={volunteer}
                  index={-1}
                  highlightedCard={-1}
                  onAccept={() => {}}
                  onDecline={() => {}}
                  isAcceptedVolunteer={true}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );

}