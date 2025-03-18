import { useState } from "react";
import { useModal } from "../context/modalContext";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, Lock, Mail, User, X } from "lucide-react";

export default function Modal() {
  const { modalType, closeModal, switchModal } = useModal();
  const { signup, isSigningUp, login, isLoggingIn } = useAuthStore();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });

  // ✅ Efficient Form Update
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Form Validation
  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  // ✅ Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    modalType === "signUp" ? signup(formData) : login(formData);
  };

  if (!modalType) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-poppins"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* ✅ Close Button */}
        <button onClick={closeModal} className="absolute top-3 right-3 text-gray-600 hover:text-black">
          <X className="size-6" />
        </button>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {modalType === "signUp" && (
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg text-black font-medium">Full Name</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 size-5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {/* ✅ Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg text-black font-medium">Email</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 size-5 text-gray-400" />
              <input
                type="email"
                name="email"
                className="input input-bordered w-full pl-10"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* ✅ Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg text-black font-medium">Password</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 size-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input input-bordered w-full pl-10 pr-10"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="size-5 text-gray-400" /> : <Eye className="size-5 text-gray-400" />}
              </button>
            </div>
          </div>

          {/* ✅ Submit Button */}
          <button
            type="submit"
            className="btn w-full bg-blue-600 text-white font-light rounded-md py-2 text-lg transition-all hover:bg-blue-700"
            disabled={modalType === "signUp" ? isSigningUp : isLoggingIn}
          >
            {modalType === "signUp"
              ? isSigningUp
                ? <Loader2 className="size-5 animate-spin" />
                : "Create Account"
              : isLoggingIn
              ? <Loader2 className="size-5 animate-spin" />
              : "Sign In"}
          </button>
        </form>

        {/* ✅ Toggle Between Sign In & Sign Up */}
        <div className="text-center mt-4">
          {modalType === "signUp" ? (
            <p className="text-gray-600">
              Already have an account?{" "}
              <button onClick={() => switchModal("signIn")} className="text-blue-600 font-semibold hover:underline">
                Sign in
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button onClick={() => switchModal("signUp")} className="text-blue-600 font-semibold hover:underline">
                Create one!
              </button>
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
