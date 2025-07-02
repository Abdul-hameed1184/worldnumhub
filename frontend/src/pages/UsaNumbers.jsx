import { useState } from "react";
import { ShoppingCart } from "lucide-react"; // Icon for buy button
import useThemeStore from "../store/useThemeStore";

const servers = ["Server 1", "Server 2", "Server 3"];
const services = ["WhatsApp", "Telegram", "Facebook"];

const BuyNumbers = () => {
const { darkMode } = useThemeStore();

  const [selectedServer, setSelectedServer] = useState("");
  const [selectedService, setSelectedService] = useState("");

  return (
    <div className={`min-h-screen p-4 md:p-6 transition-colors duration-300 ${
      darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
    }`}>
      <div className={`rounded-md shadow-sm mx-auto p-6 space-y-4 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}>
        {/* Section Title */}
        <h2 className="text-xl font-semibold mb-2">Buy Numbers</h2>

        {/* Custom Number Button */}
        <div className="text-center">
          <button
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded transition"
          >
            Custom Number
          </button>
        </div>

        {/* Select Server */}
        <div>
          <select
            value={selectedServer}
            onChange={(e) => setSelectedServer(e.target.value)}
            className={`w-full p-2 border rounded ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          >
            <option value="">Select Server</option>
            {servers.map((server, idx) => (
              <option key={idx} value={server}>
                {server}
              </option>
            ))}
          </select>
        </div>

        {/* Select Service */}
        <div>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className={`w-full p-2 border rounded ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          >
            <option value="">Select Service</option>
            {services.map((service, idx) => (
              <option key={idx} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Buy Button */}
        <button
          className="flex items-center justify-center w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded transition"
        >
          <ShoppingCart size={18} className="mr-2" />
          Buy Number
        </button>
      </div>

      {/* No Active Numbers Placeholder */}
      <div
        className={`rounded-md mt-6 mx-auto flex flex-col items-center justify-center p-10 ${
          darkMode ? "bg-gray-800 text-gray-400" : "bg-white text-gray-600"
        }`}
      >
        <img
          src="/no-active-numbers.svg"
          alt="No Active Numbers"
          className="w-20 h-20 mb-3"
        />
        <p className="font-medium text-center">No Active Numbers</p>
      </div>
    </div>
  );
};

export default BuyNumbers;
