import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();


// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create order
export const createOrder = async (req, res) => {
    try {
        const { amount, bookingDetails } = req.body;

        if (!amount || !bookingDetails) {
            return res.status(400).json({
                success: false,
                message: 'Amount and booking details are required'
            });
        }

        // Create Razorpay order
        const order = await razorpay.orders.create({
            amount: amount, // Amount is already in paise from frontend
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
                bookingId: bookingDetails.bookingId,
                listingId: bookingDetails.listingId
            }
        });

        res.json({
            success: true,
            id: order.id,
            amount: order.amount,
            currency: order.currency
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ 
            success: false,
            message: error.message || 'Error creating order'
        });
    }
};

// Verify payment
export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Missing payment verification details'
            });
        }

        // Verify signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');
           
        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Update booking status
            // You can add your booking update logic here
            res.json({
                success: true,
                message: 'Payment verified successfully'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment verification failed'
            });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ 
            success: false,
            message: error.message || 'Error verifying payment'
        });
    }
};