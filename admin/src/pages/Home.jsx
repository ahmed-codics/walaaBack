import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the Admin Dashboard</h1>
        <p className="text-gray-700 mb-6">
          Manage clients, doctors, and appointments efficiently from one place.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/client" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Manage Clients
          </Link>
          <Link to="/doctors" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Manage Doctors
          </Link>
          <Link to="/appointments" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            View Appointments
          </Link>
          <Link to="/messages" className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            Messages
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;