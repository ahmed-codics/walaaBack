import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import { connectDB } from './lib/db.js';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from "./routes/bookingRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import doctorRoutes from "./routes/doctorRoutes.js"
import messageRoute from './routes/messageRoutes.js'


dotenv.config();
const app = express();

// ✅ Connect to MongoDB
connectDB();

// Make sure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
};


// ✅ Add middleware BEFORE routes
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "https://walaa-y1uo.vercel.app"];

app.use(
  cors({
    origin: "https://walaa-y1uo.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Fix: Add `{ extended: true }`
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));


// ✅ Define routes AFTER middleware
app.use("/api/auth", authRoutes);
app.use("/api/bookings" , bookingRoutes);
app.use("/api/admin" , adminRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/messages" , messageRoute)
app.use("/uploads", express.static("uploads")); // Serve uploaded images

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
