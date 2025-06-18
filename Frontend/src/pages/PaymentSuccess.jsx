import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { paymentId, orderId, signature } = location.state || {};
    const { serverUrl } = useContext(authDataContext);

    useEffect(() => {
        if (paymentId && orderId && signature) {
            // Verify payment on backend
            verifyPayment();
        }
    }, [paymentId, orderId, signature]);

    const verifyPayment = async () => {
        try {
            const response = await fetch(`${serverUrl}/api/verify-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    razorpay_payment_id: paymentId,
                    razorpay_order_id: orderId,
                    razorpay_signature: signature
                }),
            });

            const result = await response.json();
           
        } catch (error) {
            console.error('Verification error:', error);
        }
    };

    return (
        <>
            <Nav />
            <div className="min-h-screen bg-gray-100 pt-[100px]">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <svg
                            className="w-16 h-16 text-green-500 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
                        <p className="text-gray-600 mb-6">
                            Your booking has been confirmed. You will receive a confirmation email shortly.
                        </p>
                        <button
                            onClick={() => navigate('/my-bookings')}
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                        >
                            View My Bookings
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PaymentSuccess;