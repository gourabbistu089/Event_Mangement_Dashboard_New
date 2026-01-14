export const DUMMY_EVENTS = [
  {
    id: 1,
    title: 'Tech Conference 2026',
    description: 'Annual technology conference featuring industry leaders and innovative startups. Join us for two days of inspiring talks, networking opportunities, and hands-on workshops.',
    date: '2026-03-15',
    time: '09:00 AM',
    location: 'San Francisco Convention Center',
    capacity: 500,
    registered: 342,
    organizerId: 1,
    status: 'active',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
  },
  {
    id: 2,
    title: 'Design Workshop',
    description: 'Hands-on workshop for UX/UI designers to learn the latest design trends and best practices. Limited seats available.',
    date: '2026-02-20',
    time: '02:00 PM',
    location: 'Creative Hub, New York',
    capacity: 50,
    registered: 48,
    organizerId: 1,
    status: 'active',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?w=800'
  },
  {
    id: 3,
    title: 'Startup Networking Mixer',
    description: 'Connect with fellow entrepreneurs and investors in a casual setting. Great opportunity to pitch your ideas and find potential collaborators.',
    date: '2026-02-05',
    time: '06:00 PM',
    location: 'The Foundry, Austin',
    capacity: 100,
    registered: 87,
    organizerId: 2,
    status: 'active',
    category: 'Networking',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800'
  },
  {
    id: 4,
    title: 'Digital Marketing Summit',
    description: 'Learn cutting-edge marketing strategies from industry experts. Topics include SEO, social media marketing, and content creation.',
    date: '2026-04-10',
    time: '10:00 AM',
    location: 'Virtual Event',
    capacity: 1000,
    registered: 234,
    organizerId: 1,
    status: 'active',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800'
  },
  {
    id: 5,
    title: 'Product Management Bootcamp',
    description: 'Intensive 3-day bootcamp covering product strategy, roadmapping, and stakeholder management.',
    date: '2026-05-12',
    time: '09:00 AM',
    location: 'Seattle Tech Campus',
    capacity: 75,
    registered: 62,
    organizerId: 2,
    status: 'active',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'
  },
  {
    id: 6,
    title: 'AI & Machine Learning Symposium',
    description: 'Explore the latest developments in artificial intelligence and machine learning with leading researchers.',
    date: '2026-06-08',
    time: '08:30 AM',
    location: 'MIT Campus, Boston',
    capacity: 300,
    registered: 145,
    organizerId: 1,
    status: 'active',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800'
  }
];

export const DUMMY_REGISTRATIONS = [
  { 
    id: 1, 
    eventId: 1, 
    userId: 1, 
    registeredAt: '2026-01-10',
    status: 'confirmed'
  },
  { 
    id: 2, 
    eventId: 3, 
    userId: 1, 
    registeredAt: '2026-01-12',
    status: 'confirmed'
  },
  { 
    id: 3, 
    eventId: 2, 
    userId: 1, 
    registeredAt: '2026-01-14',
    status: 'confirmed'
  }
];

export const DUMMY_NOTIFICATIONS = [
  { 
    id: 1, 
    message: 'New registration for Tech Conference 2026', 
    time: '2 hours ago', 
    read: false,
    type: 'registration'
  },
  { 
    id: 2, 
    message: 'Design Workshop is almost full (48/50)', 
    time: '5 hours ago', 
    read: false,
    type: 'alert'
  },
  { 
    id: 3, 
    message: 'Registration confirmed for Startup Networking Mixer', 
    time: '1 day ago', 
    read: true,
    type: 'confirmation'
  },
  { 
    id: 4, 
    message: 'Reminder: Tech Conference 2026 starts in 2 months', 
    time: '2 days ago', 
    read: true,
    type: 'reminder'
  }
];