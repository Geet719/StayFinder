import express from 'express';
import { createBooking, getBooking, updateBookingStatus, getUserBookings, cancelBooking } from '../controllers/booking.controller.js';
import isAuth from '../middleware/isAuth.js';

const bookingRouter = express.Router();

// Create booking
bookingRouter.post('/', isAuth, createBooking);


// Get user's bookings
bookingRouter.get('/my-bookings', isAuth, getUserBookings);

// Get booking by ID
bookingRouter.get('/:id', isAuth, getBooking);



// Update booking status
bookingRouter.patch('/:id/status', isAuth, updateBookingStatus);
// Cancel a booking
bookingRouter.delete('/:id', isAuth, cancelBooking);


export default bookingRouter;