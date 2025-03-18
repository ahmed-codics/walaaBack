import React, { useState, useEffect } from "react";
import ContactUs from "../components/ContactUs";
import UpcomingAppointments from "../components/UpcomingAppointments"; // ✅ Upcoming Appointments
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Appointments = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch User ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/api/auth/check", { withCredentials: true });
        if (data && data._id) setUserId(data._id);
      } catch (error) {
        toast.error("Authentication required!");
      } finally {
        setLoading(false); // ✅ Stop loading after request
      }
    };

    fetchUserId();
  }, []);

  // ✅ Doctors List
  const doctors = [
    {
      name: "Walaa Gad",
      description: "Expert in dermatology and skincare solutions. Providing personalized treatments for healthy skin.",
      image: "/images/black.jpg",
    },
    {
      name: "Khosanov Parker",
      description: "Specialist in cardiology with 10+ years of experience. Dedicated to ensuring your heart health.",
      image: "/images/white.jpg",
    },
    {
      name: "Sara Mohammed",
      description: "Leading nutritionist focused on balanced diets and weight management strategies for a healthier lifestyle.",
      image: "/images/sugar.jpg",
    },
  ];

  return (
    <div className="font-poppins min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        
        {/* ✅ Show Upcoming Appointments if User is Logged In */}
        {!loading && userId && <UpcomingAppointments userId={userId} />}

        {/* ✅ Page Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Book Your Appointment
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Choose from our highly experienced professionals for specialized consultations and treatments.
        </p>

        {/* ✅ Doctors List */}
        <div className="flex flex-wrap justify-center gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white w-96 shadow-xl border rounded-lg overflow-hidden h-full flex flex-col transform transition-transform duration-300 hover:scale-105"
            >
              {/* ✅ Image Section */}
              <figure className="w-full h-64 overflow-hidden">
                <img
                  src={doctor.image || "https://via.placeholder.com/400"}
                  alt={doctor.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </figure>

              {/* ✅ Content Section */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{doctor.name}</h2>
                <p className="text-gray-600 flex-grow">{doctor.description}</p>

                {/* ✅ Buttons Section */}
                <div className="mt-4 flex justify-between gap-3">
                  <button className="w-1/2 py-2 text-lg font-medium border-2 border-blue-600 text-blue-600 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition-all">
                    View Profile
                  </button>
                  <button
                    className="w-1/2 py-2 text-lg font-medium bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all"
                    onClick={() => navigate(`/booking/${doctor.name}`, { state: doctor })}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Appointments;
