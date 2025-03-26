import express from "express";
import BookingModel from "../models/BookingModel.js"; 
import User from "../models/userModel.js"; 
import mongoose from "mongoose";

const router = express.Router();

// ✅ Create a new booking (POST request)
router.post("/book", async (req, res) => {
  try {
    console.log("Received booking request:", req.body); // Debugging Log
    let { doctorName, userId, date, time } = req.body;

    if (!doctorName || !userId || !date || !time) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid user ID:", userId);
      return res.status(400).json({ message: "Invalid user ID format!" });
    }

    userId = new mongoose.Types.ObjectId(userId);

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found!" });
    }

    // Create new booking
    const newBooking = new BookingModel({
      doctorName,
      userId,
      date,
      time,
    });

    await newBooking.save();

    // Push booking to user's array
    user.bookings.push(newBooking._id);
    await user.save();

    res.status(201).json({ message: "Appointment booked successfully!", booking: newBooking });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


// ✅ Fetch bookings for a specific user
router.get("/user/:userId", async (req, res) => {   
  try {     
    const { userId } = req.params;  

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {       
      return res.status(400).json({ message: "Invalid user ID format!" });     
    }  

    // Find user and populate their bookings
    const user = await User.findById(userId).populate("bookings");     
    if (!user) {       
      return res.status(404).json({ message: "User not found!" });     
    }  

    res.json(user.bookings);   
  } catch (error) {     
    console.error("Error fetching bookings:", error);     
    res.status(500).json({ message: "Server Error", error: error.message });   
  } 
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid appointment ID format!" });
    }

    const deletedBooking = await BookingModel.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Appointment not found!" });
    }

    res.json({ message: "Appointment deleted successfully!" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid appointment ID format!" });
    }

    const updatedBooking = await BookingModel.findByIdAndUpdate(
      id,
      { date, time },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Appointment not found!" });
    }

    res.json({ message: "Appointment updated successfully!", booking: updatedBooking });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


export default router;
