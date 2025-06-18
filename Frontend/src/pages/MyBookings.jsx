import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelError, setCancelError] = useState(null);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${serverUrl}/api/bookings/my-bookings`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setBookings(response.data.bookings);
        setError(null);
      } else {
        setError(response.data.message || "Failed to fetch bookings");
      }
    } catch (err) {
      console.error("Fetch bookings error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      setCancelError(null);
      const res = await axios.delete(`${serverUrl}/api/bookings/${bookingId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        fetchBookings(); // refresh after cancel
      } else {
        setCancelError(res.data.message || "Cancellation failed");
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to cancel booking";
      console.error("Cancel booking error:", message);
      setCancelError(message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (loading) {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-gray-100 pt-[100px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-100 pt-[100px]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {cancelError && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              {cancelError}
            </div>
          )}

          {bookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-600 mb-2">
                No Bookings Found
              </h2>
              <p className="text-gray-500 mb-4">
                You haven't made any bookings yet.
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Browse Properties
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden ${
                    booking.status === "cancelled" ? "opacity-50" : ""
                  }`}
                >
                  {booking.listing?.images?.[0] && (
                    <img
                      src={booking.listing.images[0]}
                      alt={booking.listing.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {booking.listing?.title || "Property"}
                    </h2>
                    <div className="space-y-2 mb-4 text-sm">
                      <p>
                        <strong>Check-in:</strong>{" "}
                        {formatDate(booking.startDate)}
                      </p>
                      <p>
                        <strong>Check-out:</strong>{" "}
                        {formatDate(booking.endDate)}
                      </p>
                      <p>
                        <strong>Amount:</strong> ₹{booking.totalAmount}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>

                      <button
                        onClick={() =>
                          navigate(`/listing/${booking.listing?._id}`)
                        }
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        View Details
                      </button>
                    </div>

                    {booking.status !== "cancelled" && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="mt-4 w-full bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyBookings;
