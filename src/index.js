import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectDB } from './lib/db.js';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from "./routes/bookingRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import doctorRoutes from "./routes/doctorRoutes.js"


dotenv.config();
const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Add middleware BEFORE routes
const allowedOrigins = ["http://localhost:5174", "https://walaa-y1uo.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Fix: Add `{ extended: true }`
app.use(cookieParser());

// ✅ Define routes AFTER middleware
app.use("/api/auth", authRoutes);
app.use("/api/bookings" , bookingRoutes);
app.use("/api/admin" , adminRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/uploads", express.static("uploads")); // Serve uploaded images

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
