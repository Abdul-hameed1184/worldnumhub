import React, { useState } from "react";
import useThemeStore from "../store/useThemeStore";

const dummyTransactions = [
  { id: "TXN-001", type: "Purchase", amount: "$20.00", date: "2024-06-29", status: "Completed" },
  { id: "TXN-002", type: "Top-up", amount: "$50.00", date: "2024-06-25", status: "Pending" },
  { id: "TXN-003", type: "Withdrawal", amount: "$100.00", date: "2024-06-20", status: "Failed" },
];

const Transactions = () => {
  const [search, setSearch] = useState("");
  const {darkMode} = useThemeStore()

  const filtered = dummyTransactions.filter(txn =>
    Object.values(txn).some(val => val.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className={`min-h-screen p-4 md:p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div
        className={`rounded-md p-4 shadow-sm w-full overflow-x-auto ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
          <h2 className="text-lg font-semibold">Transactions</h2>
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

        <table className="min-w-full text-md">
          <thead
            className={`uppercase text-md font-semibold ${
              darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
            }`}
          >
            <tr>
              <th className="text-left px-6 py-3">ID</th>
              <th className="text-left px-6 py-3">Type</th>
              <th className="text-left px-6 py-3">Amount</th>
              <th className="text-left px-6 py-3">Date</th>
              <th className="text-left px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((txn) => (
                <tr key={txn.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-3">{txn.id}</td>
                  <td className="px-6 py-3">{txn.type}</td>
                  <td className="px-6 py-3">{txn.amount}</td>
                  <td className="px-6 py-3">{txn.date}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        txn.status === "Completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : txn.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No matching transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <p className="text-xs mt-4 text-gray-500">
          Showing {filtered.length} of {dummyTransactions.length} entries
        </p>
      </div>
    </div>
  );
};

export default Transactions;
