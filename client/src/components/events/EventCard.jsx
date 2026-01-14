import React from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle, TrendingUp } from 'lucide-react';

export const EventCard = ({ event, onRegister, isRegistered, showStats }) => {
  const registrationPercentage = (event.registerSeats / event.capacity) * 100;
  const isAlmostFull = registrationPercentage >= 90;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Event Image */}
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img
          src={event.eventImage}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800';
          }}
        />
      </div>

      <div className="p-5">
        {/* Title and Category */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {event.title}
            </h3>
            <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
              {event.category}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{formatDate(event.date)}</span>
            <Clock className="w-4 h-4 ml-2 flex-shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Registration Stats */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 flex items-center gap-1">
              <Users className="w-4 h-4" />
              {event.registerSeats} / {event.capacity} registered
            </span>
            <span className={`font-medium ${isAlmostFull ? 'text-orange-600' : 'text-gray-700'}`}>
              {registrationPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                isAlmostFull ? 'bg-orange-500' : 'bg-blue-600'
              }`}
              style={{ width: `${Math.min(registrationPercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Action Button or Stats */}
        {showStats ? (
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-lg font-semibold">{event.registered}</span>
              </div>
              <span className="text-xs text-gray-500">Registrations</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-lg font-semibold">{event.capacity - event.registerSeats}</span>
              </div>
              <span className="text-xs text-gray-500">Spots Left</span>
            </div>
          </div>
        ) : (
          <button
            onClick={() => onRegister(event._id)}
            disabled={isRegistered || event.registerSeats >= event.capacity}
            className={`w-full py-2.5 rounded-lg font-medium transition-colors ${
              isRegistered
                ? 'bg-green-50 text-green-700 cursor-default'
                : event.registerSeats >= event.capacity
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isRegistered ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Registered
              </span>
            ) : event.registerSeats >= event.capacity ? (
              'Event Full'
            ) : (
              'Register Now'
            )}
          </button>
        )}
      </div>
    </div>
  );
};