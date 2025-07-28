import React, { useState } from "react";
import useThemeStore from "../store/useThemeStore"; // Assuming theme comes from zustand

const dummyHistory = [
  {
    id: "HIST-001",
    service: "WhatsApp",
    number: "+1 223 445 6677",
    amount: "$0.45",
    date: "2024-06-29",
    sms: "123456 is your verification code",
  },
  {
    id: "HIST-002",
    service: "Telegram",
    number: "+44 7624 123456",
    amount: "$0.35",
    date: "2024-06-26",
    sms: "Use code 987654 to verify",
  },
  {
    id: "HIST-003",
    service: "Facebook",
    number: "+91 98765 43210",
    amount: "$0.50",
    date: "2024-06-24",
    sms: "Verification code: 741852",
  },
];

const NumbersHistory = () => {
  const { darkMode } = useThemeStore();
  const [search, setSearch] = useState("");

  const filtered = dummyHistory.filter((entry) =>
    Object.values(entry).some((val) =>
      val.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div
      className={`min-h-screen p-4 md:p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`rounded-md shadow-sm mx-auto p-6 overflow-x-auto ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
          <h2 className="text-lg font-semibold">Numbers History</h2>
          <input
            type="text"
            placeholder="Search..."
            className={`px-3 py-2 border rounded-md text-sm w-full md:w-64 ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                : "bg-white border-gray-300 text-black"
            }`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table className="min-w-full text-sm">
          <thead
            className={`uppercase font-semibold ${
              darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
            }`}
          >
            <tr>
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Service</th>
              <th className="text-left px-4 py-2">Number</th>
              <th className="text-left px-4 py-2">Amount</th>
              <th className="text-left px-4 py-2">Date</th>
              <th className="text-left px-4 py-2">Sms</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((entry) => (
                <tr
                  key={entry.id}
                  className={`border-b ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <td className="px-4 py-2 whitespace-nowrap">{entry.id}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{entry.service}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{entry.number}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{entry.amount}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{entry.date}</td>
                  <td className="px-4 py-2 whitespace-nowrap max-w-xs truncate">{entry.sms}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="p-4 text-center text-sm text-gray-500"
                >
                  No matching history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <p className="text-xs mt-4 text-gray-500">
          Showing {filtered.length} of {dummyHistory.length} entries
        </p>
      </div>
    </div>
  );
};

export default NumbersHistory;
