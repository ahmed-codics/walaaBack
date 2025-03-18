import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UpcomingAppointments = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5001/api/bookings/user/${userId}`, {
          withCredentials: true,
        });
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to fetch appointments.");
      }
    };

    fetchAppointments();
  }, [userId]);

  // ✅ Delete an appointment
  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/bookings/${id}`, { withCredentials: true });
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
      toast.success("Appointment deleted!");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      toast.error("Failed to delete appointment.");
    }
  };

  // ✅ Open Edit Modal
  const openEditModal = (appointment) => {
    setEditingAppointment(appointment);
    setNewDate(appointment.date);
    setNewTime(appointment.time);
  };

  // ✅ Close Edit Modal
  const closeEditModal = () => {
    setEditingAppointment(null);
    setNewDate("");
    setNewTime("");
  };

  // ✅ Handle Edit Submission
  const updateAppointment = async () => {
    if (!newDate || !newTime) return toast.error("Please select a valid date and time.");

    try {
      await axios.put(`http://localhost:5001/api/bookings/${editingAppointment._id}`, {
        date: newDate,
        time: newTime,
      });

      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === editingAppointment._id ? { ...appt, date: newDate, time: newTime } : appt
        )
      );

      toast.success("Appointment updated!");
      closeEditModal();
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment.");
    }
  };

  if (appointments.length === 0) return null;

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Appointments</h2>

      {appointments.map((appointment) => (
        <div key={appointment._id} className="p-4 border-b last:border-b-0 flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold text-gray-700">{appointment.doctorName}</p>
            <p className="text-gray-600">{appointment.date} at {appointment.time}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => openEditModal(appointment)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all"
            >
              Edit
            </button>
            <button
              onClick={() => deleteAppointment(appointment._id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* ✅ Edit Appointment Modal */}
      {editingAppointment && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          style={{ backdropFilter: "blur(5px)" }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-50 relative animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Appointment</h3>

            {/* Date Input */}
            <label className="block text-gray-700 font-medium">New Date:</label>
            <input
              type="date"
              className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              autoFocus
            />

            {/* Time Input */}
            <label className="block text-gray-700 font-medium">New Time:</label>
            <input
              type="time"
              className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={updateAppointment}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;
