import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";

// @desc Add new listing
export const addListing = async (req, res) => {
  try {
    const host = req.userId; // Set by isAuth middleware
    const { title, description, rent, city, landmark, category } = req.body;

    // Validate required fields
    if (!title || !description || !rent || !city || !landmark || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate image uploads
    if (
      !req.files?.image1?.[0] ||
      !req.files?.image2?.[0] ||
      !req.files?.image3?.[0]
    ) {
      return res.status(400).json({ message: "All three images are required" });
    }

    // Upload images to Cloudinary
    const image1 = await uploadOnCloudinary(req.files.image1[0].path);
    const image2 = await uploadOnCloudinary(req.files.image2[0].path);
    const image3 = await uploadOnCloudinary(req.files.image3[0].path);

    if (!image1 || !image2 || !image3) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    // Create new listing
    const newListing = new Listing({
      title,
      description,
      rent,
      city,
      landmark,
      category,
      host,
      image1,
      image2,
      image3,
    });

    await newListing.save();

    // Update user's listings
    const user = await User.findByIdAndUpdate(
      host,
      { $push: { listings: newListing._id } },
      { new: true }
    );

    if (!user) {
      await Listing.findByIdAndDelete(newListing._id);
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({
      message: "Listing created successfully",
      listing: newListing,
    });
  } catch (error) {
    console.error("Add Listing error:", error);
    res.status(500).json({
      message: "Add Listing error",
      error: error.message,
    });
  }
};

// @desc Get all listings with filters
export const getListings = async (req, res) => {
  try {
    const { city, category, minRent, maxRent } = req.query;

    const query = {};

    if (city) {
      query.city = { $regex: city, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (minRent && maxRent) {
      query.rent = { $gte: Number(minRent), $lte: Number(maxRent) };
    } else if (minRent) {
      query.rent = { $gte: Number(minRent) };
    } else if (maxRent) {
      query.rent = { $lte: Number(maxRent) };
    }

    const listings = await Listing.find(query).sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ message: "Error fetching listings" });
  }
};

// @desc Get single listing by ID
export const getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.json(listing);
  } catch (error) {
    console.error("Error fetching listing:", error);
    res.status(500).json({ message: "Error fetching listing" });
  }
};

// @desc Update listing
export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.host.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to update this listing" });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedListing);
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ message: "Error updating listing" });
  }
};

// @desc Delete listing
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.host.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this listing" });
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ message: "Error deleting listing" });
  }
};
