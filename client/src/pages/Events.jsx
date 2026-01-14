import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Search } from 'lucide-react';
import { EventCard } from '../components/events/EventCard';
import { DUMMY_EVENTS } from '../utils/dummyData';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { getAllEvents, registerForEvent } from '../api/event.api';
import { Navbar } from '../components/common/Navbar';

export const Events = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [events,setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  useEffect(() => {
    // fetch events from server
    const fetchEvents = async () => {
      const res = await getAllEvents();
      setEvents(res.data.events);
    }
    fetchEvents();
  },[]);

  // Get unique categories
  const categories = ['all', ...new Set(events.map(e => e.category))];

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRegister = async (eventId) => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login');
    } else {
      await registerForEvent(eventId);
      alert('Registration successful!');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
   

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Events</h1>
          <p className="text-gray-600">Discover and register for upcoming events</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No events found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={handleRegister}
                isRegistered={event.registerUsers.includes(user?.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};