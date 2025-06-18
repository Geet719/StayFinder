import express from 'express';
import { createOrder, verifyPayment } from '../controllers/payment.controller.js';
import isAuth from '../middleware/isAuth.js';

const paymentRouter = express.Router();

// Create Razorpay order
paymentRouter.post('/create-order', isAuth, createOrder);

// Verify payment
paymentRouter.post('/verify-payment', isAuth, verifyPayment);

export default paymentRouter;