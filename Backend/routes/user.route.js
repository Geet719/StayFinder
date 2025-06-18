import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { getCurrentUser, updateUserProfile } from '../controllers/user.controller.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

// Get current user
userRouter.get('/currentUser', isAuth, getCurrentUser);
userRouter.put('/update', isAuth, upload.single("profileImage"), updateUserProfile);

export default userRouter;
