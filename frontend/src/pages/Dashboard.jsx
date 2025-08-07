import React, { useEffect, useState } from "react";
import { Plus, Tag, Wallet } from "lucide-react";
import useThemeStore from "../store/useThemeStore";
import useAuthStore from "../store/useAuthStore";
import useTransactionStore from "../store/useTransactionStore";
import { useWalletStore } from "../store/useWalletStore";

const Dashboard = () => {
  const { darkMode } = useThemeStore();
  const { user } = useAuthStore();
  const {balance, fetchBalance} = useWalletStore()



  const {transactions, fetchTransactions}  = useTransactionStore()
  useEffect(() => {
    if (user?._id) {
      fetchTransactions(user._id);
      fetchBalance(user._id)
    }
  }, [user]);

  return (
    <div className={`min-h-screen p-6 space-y-6 ${darkMode ? "bg-[#0e0f23]" : "bg-gray-50"}`}>
      {/* Breadcrumb */}
      <div className="text-sm font-medium flex items-center space-x-2 text-gray-400">
        <span className="text-yellow-400">Dashboard</span>
        <span>/</span>
        <span>Main</span>
      </div>

      {/* Available Balance */}
      <div className={`w-full rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden ${darkMode ? "bg-orange-600" : "bg-orange-400"}`}>
        <div className="space-y-12">
          <p className="text-white font-medium text-lg">Available Balance :</p>
          <div className="flex space-x-3">
            <button className="w-10 h-10 rounded bg-opacity-20 flex items-center justify-center text-black text-xl border border-white hover:bg-white hover:text-black transition-colors">
              <Plus size={16} />
            </button>
            <button className="w-10 h-10 rounded bg-opacity-20 flex items-center justify-center text-black text-xl border border-white hover:bg-white hover:text-black transition-colors">
              <Wallet size={16} />
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center space-y-12">
          <p className="text-white font-bold text-xl">₦{balance}</p>
          <button className="px-4 py-2 bg-white text-orange-600 rounded text-sm font-semibold hover:bg-gray-100">
            Buy Number
          </button>
        </div>
        <div className="absolute -right-12 -top-12 w-60 h-60 bg-opacity-10 rounded-full"></div>
      </div>

      {/* Summary */}
      <div className={`rounded-lg p-6 space-y-6 ${darkMode ? "bg-[#16182f]" : "bg-white"}`}>
        <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
          Summary
        </h2>

        <div className="flex flex-col gap-6">
          {/* Recharge Summary */}
          <div className={`flex items-center p-5 rounded-lg ${darkMode ? "bg-[#2c3a5a]" : "bg-blue-200"}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? "bg-purple-500" : "bg-purple-600"} text-white text-lg font-bold`}>
              ₦
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                Recharge - Life Time
              </p>
              <p className={`${darkMode ? "text-white" : "text-gray-900"} text-xl font-bold`}>
                ₦ 10000 
              </p>
            </div>
          </div>

          {/* Numbers Purchased */}
          <div className={`flex items-center p-5 rounded-lg ${darkMode ? "bg-[#2c3a5a]" : "bg-blue-200"}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? "bg-sky-500" : "bg-sky-600"} text-white text-lg font-bold`}>
              <Tag size={20} />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                Number Purchased - Life Time
              </p>
              <p className={`${darkMode ? "text-white" : "text-gray-900"} text-xl font-bold`}>
                 300
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className={`rounded-lg p-6 ${darkMode ? "bg-[#16182f]" : "bg-white"}`}>
        <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
          Recent 15 Transactions
        </h2>

        {transactions.length === 0 ? (
          <div className={`text-center py-10 rounded ${darkMode ? "bg-[#223050] text-gray-300" : "bg-gray-100 text-gray-600"}`}>
            No transactions to display.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className={`${darkMode ? "bg-[#223050] text-gray-300" : "bg-gray-200 text-gray-700"}`}>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">DATE</th>
                  <th className="px-4 py-3">TYPE</th>
                  <th className="px-4 py-3">AMOUNT</th>
                  <th className="px-4 py-3">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((txn) => (
                  <tr key={txn._id} className={`${darkMode ? "border-b border-gray-700 text-gray-200" : "border-b border-gray-300 text-gray-800"}`}>
                    <td className="px-4 py-3">{txn._id}</td>
                    <td className="px-4 py-3">{new Date(txn.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{txn.type}</td>
                    <td className="px-4 py-3">₦{txn.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">{txn.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
