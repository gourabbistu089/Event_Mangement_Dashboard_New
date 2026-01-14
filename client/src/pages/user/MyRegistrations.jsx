import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Calendar, Clock, MapPin, Ticket, XCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getMyRegistrations } from '../../api/event.api';

export const MyRegistrations = () => {
  const { user } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user's registered events
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await getMyRegistrations();
        console.log("Res : ", res);
        setRegisteredEvents(res.data.data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  console.log("Registrationevents ", registeredEvents);

  // Separate upcoming and past events
  const now = new Date();
  const upcomingEvents = registeredEvents.filter(reg => new Date(reg.event?.date) >= now);
  const pastEvents = registeredEvents.filter(reg => new Date(reg.event?.date) < now);

  const handleCancelRegistration = (registrationId) => {
    if (window.confirm('Are you sure you want to cancel this registration?')) {
      setRegisteredEvents(prev => prev.filter(reg => reg._id !== registrationId));
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

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const EventCard = ({ registration, isPast }) => {
    const event = registration.event;
    if (!event) return null;

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row">
          {/* Event Image */}
          <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0">
            <img 
              src={event.eventImage} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Event Details */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{event.title}</h3>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  isPast ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'
                }`}>
                  {isPast ? 'Completed' : 'Upcoming'}
                </span>
              </div>
              {!isPast && (
                <button
                  onClick={() => handleCancelRegistration(registration._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Cancel
                </button>
              )}
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{formatTime(event.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Ticket className="w-4 h-4 text-gray-400" />
                <span>{event.registerSeats} / {event.capacity} seats filled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-600">Loading your registrations...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Registrations</h1>
          <p className="text-gray-600">View and manage your event registrations</p>
        </div>

        {registeredEvents.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No registrations yet</h3>
            <p className="text-gray-600">Start exploring events and register for the ones you're interested in!</p>
          </div>
        ) : (
          <>
            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Upcoming Events ({upcomingEvents.length})
                </h2>
                <div className="space-y-4">
                  {upcomingEvents.map(registration => (
                    <EventCard key={registration._id} registration={registration} isPast={false} />
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
                  {pastEvents.map(registration => (
                    <EventCard key={registration._id} registration={registration} isPast={true} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};