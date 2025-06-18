import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import paymentRoutes from "./routes/payment.route.js";
import bookingRouter from "./routes/booking.route.js";
import path from "path";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const port = process.env.PORT || 3000;
const app = express();
app.use(cookieParser());
const __dirname = path.resolve();
// Serve static files from the React app

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", router);
app.use("/api/listings", listingRouter);
app.use("/api/user", userRouter);
app.use("/api", paymentRoutes);
app.use("/api/bookings", bookingRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message
  });
});
app.use(express.static(path.join(__dirname, "../Frontend/dist"))); 
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});