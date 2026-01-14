import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Ticket, TrendingUp, Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getAllEvents } from '../../api/event.api';
import { getMyRegistrations } from '../../api/event.api';

export const UserDashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch all events
        const eventsRes = await getAllEvents();
        setEvents(eventsRes.data.events);

        // Fetch user's registrations
        const registrationsRes = await getMyRegistrations();
        setRegistrations(registrationsRes.data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter upcoming events (events with date >= today)
  const upcomingEvents = events.filter(event => 
    new Date(event.date) >= new Date()
  );

  // Filter events happening this month
  const eventsThisMonth = upcomingEvents.filter(event => {
    const eventDate = new Date(event.date);
    const now = new Date();
    return eventDate.getMonth() === now.getMonth() && 
           eventDate.getFullYear() === now.getFullYear();
  });

  // Get user's upcoming registered events
  const upcomingRegistrations = registrations.filter(reg => 
    new Date(reg.event?.date) >= new Date()
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-600">Loading dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Available Events</p>
                <p className="text-3xl font-bold text-gray-900">{upcomingEvents.length}</p>
                <p className="text-xs text-gray-500 mt-1">Upcoming events to explore</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">My Registrations</p>
                <p className="text-3xl font-bold text-gray-900">{upcomingRegistrations.length}</p>
                <p className="text-xs text-gray-500 mt-1">Events you're attending</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Ticket className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Events This Month</p>
                <p className="text-3xl font-bold text-gray-900">{eventsThisMonth.length}</p>
                <p className="text-xs text-gray-500 mt-1">Happening in {new Date().toLocaleDateString('en-US', { month: 'long' })}</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions or Additional Info */}
        {upcomingRegistrations.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-800 font-medium mb-2">You haven't registered for any events yet!</p>
            <p className="text-blue-600 text-sm">Browse available events and register to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};