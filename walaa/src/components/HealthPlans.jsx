import { FaHeart, FaAmbulance } from "react-icons/fa";
import { LuPill, LuBone } from "react-icons/lu";

const services = [
  {
    icon: <LuBone className="text-4xl text-blue-600" />,
    title: "Bone Marrow Transplant",
    description: "Discover renewed hope through our advanced bone marrow transplant procedures.",
  },
  {
    icon: <FaAmbulance className="text-4xl text-red-600" />,
    title: "Emergency Care",
    description: "Rapid and reliable emergency care services to address your urgent health needs promptly and effectively.",
  },
  {
    icon: <FaHeart className="text-4xl text-pink-600" />,
    title: "Operation Theater",
    description: "Equipped with advanced technology, ensuring a safe and efficient environment for surgical procedures.",
  },
  {
    icon: <LuPill className="text-4xl text-green-600" />,
    title: "Pharmacy",
    description: "Pharmacy services offering a wide range of medications to support your health and wellness needs.",
  },
];

export default function HealthPlans() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 overflow-hidden">
      {/* Section Title */}
      <h3 className="flex items-center gap-2 text-black text-lg font-semibold">
        <span className="text-3xl">⚡</span> What We Do
      </h3>
      <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-12 text-black">
        Our Medical Services
      </h2>

      {/* Services Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center text-center bg-white shadow-lg p-6 rounded-lg border border-gray-200 transition hover:shadow-xl">
            <div className="mb-4">{service.icon}</div>
            <h4 className="text-lg font-semibold">{service.title}</h4>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="mt-12 flex justify-end">
        <button className="px-6 py-3 text-white bg-slate-900 rounded-full border-2 border-gray-900 hover:bg-white hover:text-gray-900 hover:font-bold transition-all">
          View Health Plans
        </button>
      </div>
    </section>
  );
}
