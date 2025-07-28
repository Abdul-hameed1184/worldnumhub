import React, { useState } from "react";
import { ArrowUp } from "lucide-react";
import useThemeStore from "../store/useThemeStore";

const Dashboard = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const {darkMode} = useThemeStore()
  return (
    <div
      className={`min-h-screen p-4 md:p-6 transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-[#FFF6F0] text-black"
      }`}
    >
      {/* Select Inputs */}
      <div className="max-w-xl mx-auto space-y-6 mb-6">
        <div>
          <label className="block mb-2 font-medium">Select Country</label>
          <select
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            <option value="usa">USA</option>
            <option value="nigeria">Nigeria</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Select Service</label>
          <select
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
          </select>
        </div>
      </div>

      {/* No Active Numbers Box */}
      <div
        className={`rounded-md shadow-sm p-8 text-center mx-auto max-w-4xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <img
          src="/no-active-numbers.svg" // Replace with actual image or emoji
          alt="No Active"
          className="mx-auto w-20 h-20 mb-4"
        />
        <p className="font-semibold text-lg">No Active Numbers</p>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 right-4 z-50 p-2 bg-white border rounded-full shadow-md hover:bg-gray-100 transition dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <ArrowUp size={20} className="text-blue-500" />
      </button>
    </div>
  );
};

export default Dashboard;
