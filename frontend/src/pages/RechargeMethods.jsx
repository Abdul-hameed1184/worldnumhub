import React from "react";
import { FaGift, FaUniversity, FaArrowRight } from "react-icons/fa";
import useThemeStore from "../store/useThemeStore";
import { useNavigate } from "react-router-dom";

const RechargeMethods = () => {
  const { darkMode } = useThemeStore();
  const navigate = useNavigate()

 const methods = [
  {
    title: "Automatic Transfer Payment",
    description: "Payment Through Bank Transfer",
    icon: <FaUniversity className="text-2xl text-blue-500" />,
    route: "/recharge/bank",
  },
  {
    title: "Promocode",
    description: "Giveaway",
    icon: <FaGift className="text-2xl text-red-500" />,
    route: "/recharge/promo",
  },
];

  return (
    <div
      className={`min-h-screen p-4 md:p-6 transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Alert */}
      <div
        className={`rounded-md px-4 py-3 mb-4 flex items-center justify-between border ${
          darkMode
            ? "bg-gray-800 border-yellow-700 text-yellow-300"
            : "bg-yellow-100 border-yellow-300 text-yellow-800"
        }`}
      >
        <p className="text-sm">
          🚨 If You Are Facing Any Problem Please Contact Us
        </p>
        <button
          className={`px-3 py-1 rounded text-sm font-medium ${
            darkMode
              ? "bg-yellow-800 text-white"
              : "bg-yellow-200 hover:bg-yellow-300 text-black"
          }`}
        >
          Contact Us
        </button>
      </div>

      {/* Recharge Methods Card */}
      <div
        className={`rounded-md shadow-sm mx-auto p-4 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-center font-semibold text-sm mb-3">
          Recharge Methods
        </h2>

       {methods.map((method, index) => (
  <div
    key={index}
    onClick={() => navigate(method.route)}
    className={`flex items-center justify-between p-4 rounded-md border mb-3 transition-all cursor-pointer hover:shadow-md ${
      darkMode
        ? "border-gray-700 hover:bg-gray-700"
        : "border-gray-200 hover:bg-gray-100"
    }`}
  >
    <div className="flex items-center gap-3">
      {method.icon}
      <div>
        <p className="font-semibold">{method.title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {method.description}
        </p>
      </div>
    </div>
    <FaArrowRight className="text-gray-400" />
  </div>
))}

      </div>
    </div>
  );
};

export default RechargeMethods;
