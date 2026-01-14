const express = require('express');
const router = express.Router();
const {
  registerForEvent,
  cancelRegistration,
  getMyRegistrations,
  getEventRegistrations
} = require('../controllers/registration.controller');
const { protect, organizer } = require('../middlewares/auth.middleware');

router.post('/', protect, registerForEvent);
router.get('/my-registrations', protect, getMyRegistrations);
router.put('/:id/cancel', protect, cancelRegistration);
router.get('/event/:eventId', protect, organizer, getEventRegistrations);

module.exports = router;