import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Volunteer } from '../types';

interface AcceptModalProps {
  volunteer: Volunteer;
  task: string;
  error: string;
  onClose: () => void;
  onConfirm: () => void;
  onTaskChange: (value: string) => void;
}

export function AcceptModal({ volunteer, task, error, onClose, onConfirm, onTaskChange }: AcceptModalProps) {
    useEffect(() => {
            document.body.style.overflow = 'hidden';
            return () => {
              document.body.style.overflow = 'unset';
            };
          }, []);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl transform transition-all">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Accept Volunteer Request</h3>
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl">
            <h4 className="text-lg font-semibold text-blue-900 mb-4">Volunteer Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-blue-800"><strong>Name:</strong> {volunteer.fullName}</p>
              <p className="text-blue-800"><strong>Email:</strong> {volunteer.email}</p>
              <p className="text-blue-800"><strong>Phone:</strong> {volunteer.phoneNumber}</p>
              <p className="text-blue-800"><strong>Age:</strong> {volunteer.age} years</p>
            </div>
          </div>
          <div>
            <label htmlFor="task" className="block text-lg font-semibold text-gray-900 mb-2">
              Assign Task <span className="text-red-500">*</span>
            </label>
            <textarea
              id="task"
              rows={4}
              className={`mt-1 block w-full rounded-xl border ${
                error ? 'border-red-500' : 'border-gray-300'
              } shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none p-4`}
              value={task}
              onChange={(e) => onTaskChange(e.target.value)}
              placeholder="Describe the task in detail..."
            />
            {error && (
              <p className="mt-2 text-red-500 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {error}
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-4 pt-6">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              Confirm & Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}