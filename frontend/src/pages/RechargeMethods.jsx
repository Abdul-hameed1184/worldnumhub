import React, { useState } from "react";
import { FaUniversity, FaArrowRight } from "react-icons/fa";
import useThemeStore from "../store/useThemeStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";

const RechargeMethods = () => {
  const { darkMode } = useThemeStore();
  const { user } = useAuthStore();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFundWallet = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/services/fund-wallet`, {
        userId: user._id,
        amount,
        email: user.email,
      });

      window.location.href = res.data.link; // Redirect to Flutterwave payment
    } catch (error) {
      console.error("❌ Payment Error:", error);
      toast.error("Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen p-4 md:p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className={`rounded-md px-4 py-3 mb-4 flex items-center justify-between border ${darkMode ? "bg-gray-800 border-yellow-700 text-yellow-300" : "bg-yellow-100 border-yellow-300 text-yellow-800"}`}>
        <p className="text-sm">🚨 If You Are Facing Any Problem Please Contact Us</p>
        <button className={`${darkMode ? "bg-yellow-800 text-white" : "bg-yellow-200 hover:bg-yellow-300 text-black"} px-3 py-1 rounded text-sm font-medium`}>
          Contact Us
        </button>
      </div>

      <div className={`rounded-md shadow-sm mx-auto p-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-center font-semibold text-sm mb-3">Recharge Wallet</h2>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`w-full mb-4 px-3 py-2 rounded border ${darkMode ? "bg-gray-900 text-white border-gray-600" : "bg-white border-gray-300 text-black"}`}
        />

        <div
          onClick={handleFundWallet}
          className={`flex items-center justify-between p-4 rounded-md border transition-all cursor-pointer hover:shadow-md ${darkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-200 hover:bg-gray-100"}`}
        >
          <div className="flex items-center gap-3">
            <FaUniversity className="text-2xl text-blue-500" />
            <div>
              <p className="font-semibold">Automatic Transfer Payment</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Payment Through Bank Transfer</p>
            </div>
          </div>
          <FaArrowRight className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default RechargeMethods;
