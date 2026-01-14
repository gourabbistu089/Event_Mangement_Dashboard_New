const Registration = require('../models/Registration.model');
const Event = require('../models/Event.model');
const Notification = require('../models/Notification.model');

// Register for event
exports.registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // check seat availability
    if (event.capacity - event.registerSeats <= 0) {
      return res.status(400).json({ message: 'No seats available' });
    }

    // check already registered
    if (event.registerUsers.includes(userId)) {
      return res.status(400).json({ message: 'Already registered' });
    }

    // create registration
    const registration = await Registration.create({
      event: eventId,
      user: userId
    });

    // 🔥 PUSH userId
    event.registerUsers.push(userId);
    event.registerSeats += 1;
    await event.save();

    // notification
    await Notification.create({
      user: userId,
      message: `You registered for ${event.title}`
    });

    res.status(201).json({
      success: true,
      data: registration
    });

  } catch (error) {
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

    // only same user can cancel
    if (registration.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const event = await Event.findById(registration.event);

    if (event) {
      // 🔥 REMOVE userId (POP equivalent)
      event.registerUsers = event.registerUsers.filter(
        id => id.toString() !== req.user.id
      );

      event.availableSeats += 1;
      await event.save();
    }

    await registration.deleteOne();

    res.json({
      success: true,
      message: 'Registration cancelled'
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get my registrations
exports.getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id })
      .populate('event');
    res.json({ success: true, data: registrations });
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