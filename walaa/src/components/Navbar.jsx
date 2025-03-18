import React, { useState, useEffect } from "react";
import { useModal } from "../context/modalContext";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModal();
  const { authUser, checkAuth, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Fetch user authentication state once
  useEffect(() => {
    checkAuth();
  }, []);

  // ✅ Smooth Scroll Handling
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ✅ Navigation Handling (with Smooth Scroll)
  const handleNavClick = (path, sectionId) => {
    setIsOpen(false); // Close mobile menu
    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigate("/");
      setTimeout(() => scrollToSection(sectionId), 200);
    }
  };

  // ✅ Navigation Links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", section: "about-section" },
    { name: "Health Plans", path: "/plans" },
    { name: "Appointments", path: "/appointments" },
  ];

  return (
    <nav className="font-poppins flex items-center justify-between px-6 py-4 bg-white shadow-md relative">
      {/* ✅ Logo */}
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
        <span className="text-2xl font-bold text-black">Walaa Gad</span>
      </div>

      {/* ✅ Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* ✅ Navigation Links */}
      <ul
        className={`absolute top-16 left-0 right-0 bg-white shadow-md p-4 space-y-2 z-10 md:static md:flex md:items-center md:space-x-8 md:shadow-none md:p-0 md:space-y-0 ${
          isOpen ? "flex flex-col" : "hidden"
        }`}
      >
        {navLinks.map((link) => (
          <li key={link.name}>
            <button
              onClick={() => (link.section ? handleNavClick("/", link.section) : navigate(link.path))}
              className={`block px-4 py-2 rounded-lg transition-all ${
                location.pathname === link.path ? "text-blue-600 font-semibold bg-gray-100" : "hover:text-blue-600"
              }`}
            >
              {link.name}
            </button>
          </li>
        ))}
      </ul>

      {/* ✅ Right Section (Emergency Contact & Auth) */}
      <div className="hidden md:flex items-center space-x-6">
        {/* ✅ Emergency Contact */}
        <div className="flex flex-col items-end text-black">
          <span className="text-sm font-semibold">+012 4567 890</span>
          <span className="text-xs text-gray-500">Emergency Call</span>
        </div>

        {/* ✅ Auth Buttons */}
        {authUser ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Welcome, {authUser.fullName}!</span>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-all hover:bg-red-800"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => openModal("signUp")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-all hover:bg-gray-800"
            >
              Sign Up
            </button>
            <button
              onClick={() => openModal("signIn")}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm transition-all hover:bg-blue-600"
            >
              Log In
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
