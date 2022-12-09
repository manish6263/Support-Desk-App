const express = require('express');
const { getTickets, createTicket, getTicket, deleteTicket, updateTicket } = require('../controller/ticketController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Re-route into note router
const noteRouter = require('./noteRoutes');
router.use('/:ticketId/notes', noteRouter);

router.route('/').get(protect, getTickets).post(protect, createTicket);

// router.get('/:id', protect, getTicket);
router.route('/:id')
    .get(protect, getTicket)
    .delete(protect, deleteTicket)
    .put(protect, updateTicket)

module.exports = router;