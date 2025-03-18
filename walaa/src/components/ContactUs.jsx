import { FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function ContactUs() {
  return (
    <section className="mx-auto bg-[#20243c] px-6 py-12 grid md:grid-cols-2 gap-14">
      {/* ✅ Left: Contact Form */}
      <div>
        <h2 className="text-4xl font-light mb-6 text-white font-montserrat">
          Contact Us
        </h2>

        <form className="space-y-6">
          {/* ✅ Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-montserrat text-white mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-white bg-black rounded-md px-4 py-2 text-white font-montserrat focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
              />
            </div>
            <div>
              <label className="block font-montserrat text-white mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="xyz@gmail.com"
                className="w-full border border-white bg-black rounded-md px-4 py-2 text-white font-montserrat focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
              />
            </div>
          </div>

          {/* ✅ Phone & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-montserrat text-white mb-1">
                Phone
              </label>
              <input
                type="tel"
                placeholder="+1 (xxx) xxx-xx-xx"
                className="w-full border border-white bg-black rounded-md px-4 py-2 text-white font-montserrat focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
              />
            </div>
            <div>
              <label className="block font-montserrat text-white mb-1">
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full border border-white bg-black rounded-md px-4 py-2 pr-10 text-white font-montserrat focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
                />
                <FaCalendarAlt className="absolute right-3 top-3 text-gray-500" />
              </div>
            </div>
          </div>

          {/* ✅ Message */}
          <div>
            <label className="block font-montserrat text-white mb-1">
              Message
            </label>
            <textarea
              placeholder="Enter message here..."
              className="w-full border border-white bg-black rounded-md px-4 py-2 h-28 text-white font-montserrat focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
            ></textarea>
          </div>

          {/* ✅ Submit Button */}
          <div className="flex justify-end">
            <button className="bg-slate-900 text-white font-semibold px-6 py-3 rounded-full border-2 border-gray-900 transition-all duration-300 hover:bg-white hover:text-gray-900">
              Send Now
            </button>
          </div>
        </form>
      </div>

      {/* ✅ Right: Get in Touch */}
      <div>
        <h2 className="text-4xl font-light mb-4 text-white font-montserrat">
          Get in Touch
        </h2>
        <p className="text-gray-400 text-lg mb-10">
          Have questions, inquiries, or looking to schedule an appointment? We're here to assist you.
        </p>

        {/* ✅ Address */}
        <div className="flex items-center gap-3 text-gray-400 mb-4">
          <FaMapMarkerAlt className="text-white" />
          <span>1750 Ranchero Rd, Kerrville, Texas 78028</span>
        </div>

        {/* ✅ Phone */}
        <div className="flex items-center gap-3 text-gray-400 mb-4">
          <FaPhoneAlt className="text-white" />
          <span>+1 (209) 225-01-47</span>
        </div>

        {/* ✅ Email */}
        <div className="flex items-center gap-3 text-gray-400">
          <FaEnvelope className="text-white" />
          <span>info.wellcare@gmail.com</span>
        </div>
      </div>
    </section>
  );
}
