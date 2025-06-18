import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RazorpayPayment from "../components/RazorpayPayment";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, bookingDetails } = location.state || {};

  useEffect(() => {
    if (!amount || !bookingDetails) {
      console.warn("Missing payment details:", { amount, bookingDetails });
      navigate("/");
    }
  }, [amount, bookingDetails, navigate]);

  if (!amount || !bookingDetails) {
    return (
      <>
        <Nav />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-[100px] px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Invalid Payment Details</h2>
            <p className="text-gray-600 mb-6">
              Oops! The booking or payment information is missing. Please try booking again.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition duration-200"
            >
              Go to Home
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-50 pt-[100px] px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Complete Your Booking</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Booking Summary */}
              <div className="border rounded-md p-5 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Booking Summary</h2>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Listing:</span> {bookingDetails.listingTitle}</p>
                  <p><span className="font-medium">Check-in:</span> {new Date(bookingDetails.startDate).toLocaleDateString()}</p>
                  <p><span className="font-medium">Check-out:</span> {new Date(bookingDetails.endDate).toLocaleDateString()}</p>
                  <p><span className="font-medium">Total Amount:</span> ₹{amount}</p>
                </div>
              </div>

              {/* Razorpay Payment Section */}
              <div className="border rounded-md p-5 bg-white shadow-sm">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Secure Payment</h2>
                <p className="text-sm text-gray-500 mb-2">We use Razorpay to securely process your payment.</p>
                <RazorpayPayment amount={amount} bookingDetails={bookingDetails} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
