const express = require('express');
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  getMyEvents
} = require('../controllers/event.controller');
const { protect, organizer } = require('../middlewares/auth.middleware');

router.get('/', getAllEvents);
router.get('/my-events', protect, organizer, getMyEvents);
router.get('/:id', getEvent);
router.post('/', protect, organizer, createEvent);
router.put('/:id', protect, organizer, updateEvent);
router.delete('/:id', protect, organizer, deleteEvent);

module.exports = router;