import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Users, TrendingUp, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: 'Easy Event Creation',
      description: 'Create and manage events with our intuitive dashboard in minutes.'
    },
    {
      icon: Users,
      title: 'Seamless Registration',
      description: 'Attendees can browse and register for events with just a few clicks.'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Analytics',
      description: 'Track registrations and engagement with live statistics.'
    },
    {
      icon: CheckCircle,
      title: 'Instant Notifications',
      description: 'Stay updated with real-time notifications for all event activities.'
    }
  ];

  const stats = [
    { label: 'Active Events', value: '500+' },
    { label: 'Happy Users', value: '10K+' },
    { label: 'Total Registrations', value: '50K+' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-200 sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">EventHub</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/events"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Browse Events
              </Link>
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              The easiest way to manage events
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Create, Manage, and Grow Your Events
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Everything you need to plan successful events and engage with your audience. 
              Simple, powerful, and built for organizers and attendees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-blue-600 text-white px-8 py-3.5 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                Start for Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/events')}
                className="border border-gray-300 text-gray-700 px-8 py-3.5 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors"
              >
                Browse Events
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-gray-600">
              Powerful features to help you create and manage amazing events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of organizers already using EventHub
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-blue-600 px-8 py-3.5 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
          >
            Create Your Free Account
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Calendar className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">EventHub</span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2026 EventHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};