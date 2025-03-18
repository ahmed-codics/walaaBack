import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { ModalProvider, useModal } from "./context/modalContext";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Appointments from "./pages/Appointments";
import HomePage from "./pages/HomePage";
import ContactUs from "./components/ContactUs";
import Booking from "./pages/Booking";

export default function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="bg-base min-h-screen scrollbar-custom">
      <Toaster position="top-right" reverseOrder={false} />
      <ModalProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/appointments" element={<ProtectedAppointments />} />
          <Route path="/booking/:name" element={<Booking />} />

        </Routes>
        <ContactUs />
      </ModalProvider>
    </div>
  );
}

function ProtectedAppointments() {
  const { authUser } = useAuthStore();
  const { openModal } = useModal();
  const navigate = useNavigate();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (!authUser && !redirected) {
      openModal("login"); // Open login/signup modal
      navigate("/"); // Redirect to home
      setRedirected(true);
    }
  }, [authUser, openModal, navigate, redirected]);

  if (!authUser) {
    return null; // Prevent rendering if not logged in
  }

  return <Appointments />;
}
