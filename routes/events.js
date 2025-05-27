const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  deleteArchivedEvents,
} = require('../controllers/eventsController');

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', authMiddleware, createEvent);
router.put('/', authMiddleware, updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);
router.delete('/archive/delete', authMiddleware, deleteArchivedEvents);

module.exports = router;
