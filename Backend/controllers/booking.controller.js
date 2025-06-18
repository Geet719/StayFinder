import Booking from "../models/booking.model.js";
import Listing from "../models/listing.model.js";

export const createBooking = async (req, res) => {
    try {
        const { listingId, startDate, endDate, totalAmount } = req.body;
        const userId = req.userId; // From auth middleware

        // Validate dates
        if (new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({ message: "End date must be after start date" });
        }

        // Check if listing exists
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // Check if dates are available
      const existingBooking = await Booking.findOne({
  listing: listingId,
  status: { $in: ['confirmed', 'pending'] }, // Block during pending and confirmed
  $or: [
    {
      startDate: { $lte: new Date(endDate) },
      endDate: { $gte: new Date(startDate) }
    }
  ]
});
        // Check for overlapping bookings
            


        if (existingBooking) {
            return res.status(400).json({ message: "These dates are not available" });
        }

        // Create booking
        const booking = await Booking.create({
            listing: listingId,
            user: userId,
            startDate,
            endDate,
            totalAmount,
            status: 'pending',
            paymentStatus: 'pending'
        });

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });
    } catch (error) {
        console.error("Create booking error:", error);
        res.status(500).json({ 
            message: "Error creating booking",
            error: error.message 
        });
    }
};

// Get booking by ID
export const getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('listing')
            .populate('user', 'name email');

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: "Error fetching booking" });
    }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
    try {
        const { status, paymentStatus, paymentId } = req.body;
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { 
                status, 
                paymentStatus,
                paymentId
            },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: "Error updating booking" });
    }
};

// Get user's bookings
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const bookings = await Booking.find({
      user: userId,
      status: { $ne: 'cancelled' }  // ✅ Exclude cancelled bookings
    })
      .populate({
        path: 'listing',
        select: 'title images rent',
        model: 'Listing'
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings
    });
  } catch (error) {
    console.error("Get user bookings error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: error.message
    });
  }
};

// Cancel booking (only by the user who booked it)
export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.userId;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Only the booking owner can cancel
    if (booking.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "You are not authorized to cancel this booking" });
    }

    // Prevent canceling already canceled bookings
    if (booking.status === "cancelled") {
      return res.status(400).json({ success: false, message: "Booking is already cancelled" });
    }

    // Prevent canceling past bookings
    const now = new Date();
    if (new Date(booking.endDate) < now) {
      return res.status(400).json({ success: false, message: "Cannot cancel a past booking" });
    }

    // Mark booking as cancelled
    booking.status = "cancelled";
    
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({
      success: false,
      message: "Error cancelling booking",
      error: error.message,
    });
  }
};
