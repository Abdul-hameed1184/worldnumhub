import React, { useState } from "react";
import useThemeStore from "../store/useThemeStore";

const dummyNumbers = [
  {
    id: "NUM-001",
    country: "USA",
    service: "WhatsApp",
    number: "+1 555 234 5678",
    status: "Active",
    date: "2024-06-25",
  },
  {
    id: "NUM-002",
    country: "UK",
    service: "Telegram",
    number: "+44 7780 112233",
    status: "Used",
    date: "2024-06-20",
  },
  {
    id: "NUM-003",
    country: "Nigeria",
    service: "Facebook",
    number: "+234 802 123 4567",
    status: "Expired",
    date: "2024-06-18",
  },
];

const Numbers = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const { darkMode } = useThemeStore();

  const filtered = dummyNumbers.filter((item) => {
    return (
      (!selectedCountry || item.country === selectedCountry) &&
      (!selectedService || item.service === selectedService)
    );
  });

  return (
    <div
      className={`min-h-screen p-4 md:p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-[#FFF6F0] text-black"
      }`}
    >
      <div className=" mx-auto space-y-6">
        {/* Select Inputs */}
        <div>
          <label className="block font-medium mb-2">Select Country</label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className={`w-full p-2 border rounded ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          >
            <option value="">All Countries</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Nigeria">Nigeria</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">Select Service</label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className={`w-full p-2 border rounded ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          >
            <option value="">All Services</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Telegram">Telegram</option>
            <option value="Facebook">Facebook</option>
          </select>
        </div>

        {/* Table */}
        <div
          className={`rounded-md shadow-sm overflow-x-auto ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {filtered.length > 0 ? (
            <table className="min-w-full text-sm">
              <thead
                className={`${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <tr>
                  <th className="text-left px-4 py-2">ID</th>
                  <th className="text-left px-4 py-2">Country</th>
                  <th className="text-left px-4 py-2">Service</th>
                  <th className="text-left px-4 py-2">Number</th>
                  <th className="text-left px-4 py-2">Status</th>
                  <th className="text-left px-4 py-2">Date</th>
                </tr>
              </thead>
              {dummyNumbers.length <= 0 && (
                <div
                  className={`rounded-md mt-6 mx-auto flex flex-col items-center justify-center p-10 ${
                    darkMode
                      ? "bg-gray-800 text-gray-400"
                      : "bg-white text-gray-600"
                  }`}
                >
                  <img
                    src="/no-active-numbers.svg"
                    alt="No Active Numbers"
                    className="w-20 h-20 mb-3"
                  />
                  <p className="font-medium text-center">No Active Numbers</p>
                </div>
              )}
              <tbody>
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.country}</td>
                    <td className="px-4 py-2">{item.service}</td>
                    <td className="px-4 py-2">{item.number}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : item.status === "Used"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center p-12">
              <img
                src="/no-active-numbers.svg"
                alt="No Active"
                className="w-20 h-20 mb-4"
              />
              <p className="text-sm font-medium text-center">
                No Active Numbers
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Numbers;
