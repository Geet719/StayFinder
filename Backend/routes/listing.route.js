import express from 'express';
import isAuth from '../middleware/isAuth.js';
import upload from '../middleware/multer.js';
import { 
    getListings, 
    getListing, 
    addListing, 
    updateListing, 
    deleteListing 
} from '../controllers/listing.controller.js';
import Listing from '../models/listing.model.js';

const listingRouter = express.Router();

// Get all listings
listingRouter.get('/', getListings);

// Get single listing
listingRouter.get('/:id', getListing);

// Add new listing
listingRouter.post(
    "/add",
    isAuth,
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 }
    ]),
    addListing
);

// Update listing
listingRouter.put('/:id', isAuth, updateListing);

// Delete listing
listingRouter.delete('/:id', isAuth, deleteListing);

export default listingRouter;