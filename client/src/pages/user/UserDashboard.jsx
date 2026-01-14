import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { EventList } from '../../components/events/EventList';
import { DUMMY_EVENTS, DUMMY_REGISTRATIONS } from '../../utils/dummyData';
import { Ticket, TrendingUp } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const UserDashboard = () => {
  const { user } = useAuth();
  const [events] = useState(DUMMY_EVENTS);
  const [registrations, setRegistrations] = useState(DUMMY_REGISTRATIONS);

  const userRegisteredEventIds = registrations
    .filter(reg => reg.userId === user.id)
    .map(reg => reg.eventId);

  const upcomingEvents = events.filter(event => 
    new Date(event.date) >= new Date()
  );

  const handleRegister = (eventId) => {
    // Check if already registered
    if (userRegisteredEventIds.includes(eventId)) {
      return;
    }

    // Add new registration
    const newRegistration = {
      id: Date.now(),
      eventId,
      userId: user.id,
      registeredAt: new Date().toISOString(),
      status: 'confirmed'
    };

    setRegistrations(prev => [...prev, newRegistration]);

    // Show success message (you can implement a toast notification)
    alert('Successfully registered for the event!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">Discover and register for upcoming events</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Available Events</p>
                <p className="text-3xl font-bold text-gray-900">{upcomingEvents.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">My Registrations</p>
                <p className="text-3xl font-bold text-gray-900">{userRegisteredEventIds.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Ticket className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Events This Month</p>
                <p className="text-3xl font-bold text-gray-900">
                  {upcomingEvents.filter(e => {
                    const eventDate = new Date(e.date);
                    const now = new Date();
                    return eventDate.getMonth() === now.getMonth() && 
                           eventDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Browse Events</h2>
          <EventList 
            events={upcomingEvents}
            onRegister={handleRegister}
            registeredEvents={userRegisteredEventIds}
          />
        </div>
      </div>
    </div>
  );
};