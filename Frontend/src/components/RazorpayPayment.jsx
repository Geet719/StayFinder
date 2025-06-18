import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";

const RazorpayPayment = ({ amount, bookingDetails }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await initializeRazorpay();
      if (!res) {
        setError("Razorpay SDK failed to load");
        return;
      }

      // 1. Create Razorpay order from backend
      const orderResponse = await fetch(`${serverUrl}/api/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount: amount * 100,
          bookingDetails,
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.message || "Failed to create order");
      }

      const order = await orderResponse.json();

      // 2. Set up Razorpay payment
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "StayFinder",
        description: "Booking Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3. Update booking status on backend
            const bookingUpdate = await fetch(
              `${serverUrl}/api/bookings/${bookingDetails.bookingId}/status`,
              {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                  status: "confirmed",
                  paymentStatus: "completed",
                  paymentId: response.razorpay_payment_id,
                }),
              }
            );

            if (!bookingUpdate.ok) {
              throw new Error("Failed to update booking status");
            }

            // 4. Navigate to success page
            navigate("/payment-success", {
              state: {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              },
            });
          } catch (err) {
            console.error("Booking update error:", err);
            setError("Payment succeeded, but booking update failed.");
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#2563EB",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message || "Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>

      <div className="mb-6">
        <p className="text-gray-600 mb-2">Amount to pay: ₹{amount}</p>
        <p className="text-sm text-gray-500">
          You will be redirected to Razorpay's secure payment page.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <button
        onClick={makePayment}
        disabled={isLoading}
        className={`w-full py-2 rounded-md transition-colors duration-300 ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default RazorpayPayment;
