import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { DUMMY_EVENTS, DUMMY_REGISTRATIONS } from '../../utils/dummyData';
import { Calendar, Clock, MapPin, Ticket, XCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const MyRegistrations = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState(DUMMY_REGISTRATIONS);

  // Get user's registered events
  const userRegistrations = registrations.filter(reg => reg.userId === user.id);
  const registeredEvents = DUMMY_EVENTS.filter(event =>
    userRegistrations.some(reg => reg.eventId === event.id)
  );

  // Separate upcoming and past events
  const now = new Date();
  const upcomingEvents = registeredEvents.filter(event => new Date(event.date) >= now);
  const pastEvents = registeredEvents.filter(event => new Date(event.date) < now);

  const handleCancelRegistration = (eventId) => {
    if (window.confirm('Are you sure you want to cancel this registration?')) {
      setRegistrations(prev => prev.filter(reg => !(reg.eventId === eventId && reg.userId === user.id)));
      alert('Registration cancelled successfully');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const EventCard = ({ event, isPast }) => {
    const registration = userRegistrations.find(reg => reg.eventId === event.id);
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row">
          {/* Event Image */}
          <div className="md:w-64 h-48 md:h-auto bg-gray-200">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800';
              }}
            />
          </div>

          {/* Event Details */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${
                  isPast ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-700'
                }`}>
                  {event.category}
                </span>
              </div>
              {!isPast && (
                <button
                  onClick={() => handleCancelRegistration(event.id)}
                  className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  title="Cancel Registration"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {event.description}
            </p>

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

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Ticket className="w-4 h-4" />
                <span>Registered on {new Date(registration.registeredAt).toLocaleDateString()}</span>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                isPast 
                  ? 'bg-gray-100 text-gray-600' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {isPast ? 'Completed' : 'Confirmed'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Registrations</h1>
          <p className="text-gray-600">View and manage your event registrations</p>
        </div>

        {registeredEvents.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No registrations yet</h3>
            <p className="text-gray-500">Browse events and register to see them here</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Upcoming Events ({upcomingEvents.length})
                </h2>
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <EventCard key={event.id} event={event} isPast={false} />
                  ))}
                </div>
              </div>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Past Events ({pastEvents.length})
                </h2>
                <div className="space-y-4">
                  {pastEvents.map(event => (
                    <EventCard key={event.id} event={event} isPast={true} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};