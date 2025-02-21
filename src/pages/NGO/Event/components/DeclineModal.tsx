import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Volunteer } from '../types';

interface DeclineModalProps {
  volunteer: Volunteer;
  reason: string;
  error: string;
  onClose: () => void;
  onConfirm: () => void;
  onReasonChange: (value: string) => void;
}

export function DeclineModal({ volunteer, reason, error, onClose, onConfirm, onReasonChange }: DeclineModalProps) {
    useEffect(() => {
            document.body.style.overflow = 'hidden';
            return () => {
              document.body.style.overflow = 'unset';
            };
          }, []);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl transform transition-all">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Decline Volunteer Request</h3>
        <div className="space-y-6">
          <div className="bg-red-50 p-6 rounded-xl">
            <h4 className="text-lg font-semibold text-red-900 mb-4">Volunteer Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-red-800"><strong>Name:</strong> {volunteer.fullName}</p>
              <p className="text-red-800"><strong>Email:</strong> {volunteer.email}</p>
              <p className="text-red-800"><strong>Phone:</strong> {volunteer.phoneNumber}</p>
              <p className="text-red-800"><strong>Age:</strong> {volunteer.age} years</p>
            </div>
          </div>
          <div>
            <label htmlFor="reason" className="block text-lg font-semibold text-gray-900 mb-2">
              Reason for Declining <span className="text-red-500">*</span>
            </label>
            <textarea
              id="reason"
              rows={4}
              className={`mt-1 block w-full rounded-xl border ${
                error ? 'border-red-500' : 'border-gray-300'
              } shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 resize-none p-4`}
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              placeholder="Please provide a reason for declining..."
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
              className="px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
            >
              Confirm & Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}