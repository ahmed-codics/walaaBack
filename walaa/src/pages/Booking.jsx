import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Booking = () => {
  const { name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state; // ✅ Extract doctor details

  // ✅ State Management
  const [userId, setUserId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // ✅ Fetch user ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/api/auth/check", { withCredentials: true });
        if (data && data._id) setUserId(data._id);
        else throw new Error("Invalid response from server");
      } catch (error) {
        toast.error("Authentication required! Please log in.");
        navigate("/login");
      }
    };

    fetchUserId();
  }, [navigate]);

  // ✅ Redirect if doctor data is missing
  if (!doctor) {
    return <h2 className="text-center text-red-600 font-bold">Doctor not found!</h2>;
  }

  // ✅ Handle Booking Submission
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!userId) return toast.error("User not authenticated!");
    if (!selectedDate || !selectedTime) return toast.error("Please select a date and time!");

    const bookingData = {
      doctorName: doctor.name,
      userId,
      date: selectedDate,
      time: selectedTime,
      consultationFee: 50, // ✅ Ensure fee is included
    };

    try {
      const response = await axios.post("http://localhost:5001/api/bookings/book", bookingData, { withCredentials: true });

      if (response.status === 201) {
        toast.success("Booking successful!");
        setTimeout(() => navigate("/"), 2000); // ✅ Redirect after 2 sec
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error booking appointment. Try again later.");
    }
  };

  return (
    <div className="font-poppins min-h-screen bg-gray-100 py-10">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Book an Appointment</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Complete the form below to schedule an appointment with <span className="font-semibold">{doctor.name}</span>.
        </p>

        {/* ✅ Booking Layout */}
        <div className="bg-white shadow-xl rounded-lg p-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-8 transition-all">
          
          {/* ✅ Left: Doctor Info */}
          <div className="w-full md:w-1/2">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-80 object-cover rounded-lg shadow-md transition-transform hover:scale-105"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.description}</p>
          </div>

          {/* ✅ Right: Booking Form */}
          <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-lg">
            <form className="space-y-4" onSubmit={handleBooking}>
              
              {/* Date Selection */}
              <label className="block font-medium text-gray-700">Choose Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />

              {/* Time Selection */}
              <label className="block font-medium text-gray-700">Select Time</label>
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Select a time</option>
                {["10:00 AM", "1:00 PM", "3:00 PM", "6:00 PM"].map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>

              {/* Consultation Fee */}
              <label className="block font-medium text-gray-700">Consultation Fee</label>
              <p className="font-semibold text-lg text-gray-800">$50</p>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 text-lg font-medium bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
              >
                Confirm Booking
              </button>
            </form>

            {/* ✅ Back Button */}
            <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 hover:underline">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
