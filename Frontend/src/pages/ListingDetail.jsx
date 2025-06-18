// Frontend/src/pages/ListingDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { authDataContext } from "../context/AuthContext";

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const { serverUrl } = useContext(authDataContext);

  useEffect(() => {
    fetchListingDetails();
  }, [id]);

  useEffect(() => {
   if (startDate && endDate && listing) {
  const timeDiff = endDate.getTime() - startDate.getTime();
  const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // convert ms to days
  const total = nights * listing.rent;
  setTotalAmount(total);
}

  }, [startDate, endDate, listing]);

  const fetchListingDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${serverUrl}/api/listings/${id}`);
      setListing(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch listing details");
      console.error("Error fetching listing:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    try {
      if (!startDate || !endDate) {
        alert("Please select both start and end dates");
        return;
      }

      const response = await axios.post(
        `${serverUrl}/api/bookings`,
        {
          listingId: id,
          startDate,
          endDate,
          totalAmount,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        // Redirect to payment page with booking details
        navigate("/payment", {
          state: {
            amount: totalAmount,
            bookingDetails: {
              bookingId: response.data.booking._id,
              startDate,
              endDate,
              listingId: id,
              listingTitle: listing.title
            }
          }
        });
      }
    } catch (err) {
      console.error("Booking error:", err);
      const errorMessage =
        err.response?.data?.message ||
        "Failed to create booking. Please try again.";
      alert(errorMessage);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-red-600">
          {error || "Listing not found"}
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <img
            src={listing.image1}
            alt={listing.title}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="grid grid-cols-2 gap-4">
            <img
              src={listing.image2}
              alt={listing.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <img
              src={listing.image3}
              alt={listing.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Details and Booking */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{listing.title}</h1>
          <p className="text-gray-600">{listing.description}</p>

          <div className="space-y-2">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>
                {listing.city}, {listing.landmark}
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span>{listing.category}</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              ₹{listing.rent}/night
            </div>
          </div>

          {/* Booking Section */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Book this property</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {totalAmount > 0 && (
                <div className="text-lg font-semibold">
                  Total Amount: ₹{totalAmount}
                </div>
              )}
              <button
                onClick={handleBooking}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
