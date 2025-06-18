import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import userRouter from "./routes/user.route.js";
import paymentRoutes from "./routes/payment.route.js";
import bookingRouter from "./routes/booking.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS Configuration (allow production + local dev if needed)
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://stayfinder-i3fg.onrender.com',
      'http://localhost:5173',
      'http://localhost:3000'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// API Routes
app.use("/api/auth", router);
app.use("/api/listings", listingRouter);
app.use("/api/user", userRouter);
app.use("/api", paymentRoutes);
app.use("/api/bookings", bookingRouter);

// ✅ Serve frontend (React/Vite build output)
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// 3. Wildcard route for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});
