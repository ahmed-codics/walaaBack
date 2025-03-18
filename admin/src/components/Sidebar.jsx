import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar Toggle Button */}
      <button
        className="p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white h-screen w-64 fixed top-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          Dr. WALAA GAD
        </div>
        <ul className="mt-4 space-y-4">
          <li>
            <Link to="/" className="flex items-center p-3 hover:bg-gray-700">
              <FaHome className="mr-2" /> Home
            </Link>
          </li>
          <li>
            <Link to="/client" className="flex items-center p-3 hover:bg-gray-700">
              <FaUser className="mr-2" /> Client Management
            </Link>
          </li>
          <li>
            <Link to="/doctors" className="flex items-center p-3 hover:bg-gray-700">
              <FaCog className="mr-2" /> Doctors Management
            </Link>
          </li>
          <li>
            <Link to="/appointments" className="flex items-center p-3 hover:bg-gray-700">
              <FaCog className="mr-2" /> Appointments
            </Link>
          </li>
          <li>
            <Link to="/messages" className="flex items-center p-3 hover:bg-gray-700">
              <FaCog className="mr-2" /> Messages
            </Link>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default Sidebar;