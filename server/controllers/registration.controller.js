const Registration = require('../models/Registration.model');
const Event = require('../models/Event.model');
const Notification = require('../models/Notification.model');

// Register for event
exports.registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.availableSeats <= 0) {
      return res.status(400).json({ message: 'No seats available' });
    }

    const registration = await Registration.create({
      event: eventId,
      user: req.user.id
    });

    event.availableSeats -= 1;
    await event.save();

    await Notification.create({
      user: req.user.id,
      message: `You registered for ${event.title}`
    });

    res.status(201).json({ success: true, registration });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Already registered' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Cancel registration
exports.cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    if (registration.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    registration.status = 'cancelled';
    await registration.save();

    const event = await Event.findById(registration.event);
    if (event) {
      event.availableSeats += 1;
      await event.save();
    }

    res.json({ success: true, message: 'Registration cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get my registrations
exports.getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id })
      .populate('event');
    res.json({ success: true, registrations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get event registrations (organizer)
exports.getEventRegistrations = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const registrations = await Registration.find({ event: req.params.eventId })
      .populate('user', 'name email');

    res.json({ success: true, registrations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};