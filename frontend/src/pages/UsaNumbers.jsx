import { useEffect, useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";
import useThemeStore from "../store/useThemeStore";
import axios from "axios";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { toast } from "react-hot-toast";

const UsaNumbers = () => {
  const { darkMode } = useThemeStore();
  const [tab, setTab] = useState("purchase");
  const [services, setServices] = useState([]);
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [smsMessages, setSmsMessages] = useState([]);

    // 1) Fetch data
  useEffect(() => {
    const endpoint =
      tab === "purchase"
        ? "http://localhost:5000/api/services"
        : "http://localhost:5000/api/transaction"; // ← fixed endpoint
    axios.get(endpoint).then((res) => {
      if (tab === "purchase") setServices(res.data);
      else setTxns(res.data);
    });
  }, [tab]);

  // 2) Create a minimal config for the hook
  const baseConfig = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
  };
  const handleFlutterwave = useFlutterwave(baseConfig);

  // 3) pay() builds the full config per-purchase
  const pay = (svc) => {
    // strip commas and coerce to number
    const raw = svc["New Price (₦)"];
    const amount = Number(String(raw).replace(/,/g, ""));
    if (!amount || isNaN(amount) || amount < 100) {
      return alert("Invalid amount—must be ≥₦100");
    }

    handleFlutterwave({
      ...baseConfig,
      tx_ref: `FLW_${Date.now()}`,     // must be string
      amount,                         // numeric, no commas
      currency: "NGN",
      payment_options: "card,ussd,mobilemoney",
      customer: {
        // optional, but recommended
        email: "user@example.com",
        phonenumber: "08012345678",
        name: "Your Customer",
      },
      customizations: {
        title: svc.Service,
        description: `Buy ${svc.Service}`,
      },
      callback: async (response) => {
        // record transaction on your server
        try {
          await axios.post("http://localhost:5000/api/transaction", {
            service: svc.Service,
            amount,
            tx_ref: response.tx_ref,
            flw_ref: response.flw_ref,
          });
        } catch (err) {
          console.error("Failed to save txn:", err);
        }
        closePaymentModal();
      },
      onClose: () => {
        console.log("Payment modal closed");
      },
    });
  };


  return (
    <div
      className={`min-h-screen p-4 md:p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT CARD */}
        <div
          className={`rounded-xl shadow-lg p-6 transition-colors duration-300 ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border`}
        >
          <a
            href="https://t.me/yourchannel"
            className={`block text-center mb-4 font-medium transition-colors duration-300 ${
              darkMode
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-500"
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join us on Telegram
          </a>

          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setTab("purchase")}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                tab === "purchase"
                  ? "bg-orange-500 text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Purchase Number
            </button>
            <button
              onClick={() => setTab("history")}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                tab === "history"
                  ? "bg-black text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Transaction History
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin h-8 w-8 text-orange-500" />
            </div>
          ) : tab === "purchase" ? (
            <>
              <p
                className={`text-center text-sm mb-4 transition-colors duration-300 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Buy a phone number for 7 minutes. Credits are only used if you
                receive the SMS code.
              </p>
              <div
                className={`overflow-auto max-h-[400px] rounded-lg border transition-colors duration-300 ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <table className="w-full text-left text-sm">
                  <thead
                    className={`transition-colors duration-300 ${
                      darkMode
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <tr>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Price (₦)</th>
                      <th className="py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((s, i) => (
                      <tr
                        key={i}
                        className={`border-b transition-colors duration-300 ${
                          darkMode
                            ? "border-gray-700 hover:bg-gray-700"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <td className="py-3 px-4">{s.Service}</td>
                        <td className="py-3 px-4">
                          {Number(s["New Price (₦)"]).toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => pay(s)}
                            className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-2 rounded transition-all"
                          >
                            <ShoppingCart size={14} /> Buy
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div
              className={`overflow-auto max-h-[400px] rounded-lg border transition-colors duration-300 ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <table className="w-full text-left text-sm">
                <thead
                  className={`transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <tr>
                    <th className="py-3 px-4">Tx Ref</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Amount (₦)</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {txns.map((t, i) => (
                    <tr
                      key={i}
                      className={`border-b transition-colors duration-300 ${
                        darkMode
                          ? "border-gray-700 hover:bg-gray-700"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <td className="py-3 px-4">{t.tx_ref}</td>
                      <td className="py-3 px-4">{t.service}</td>
                      <td className="py-3 px-4">
                        {Number(t.amount).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            t.status === "successful"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : t.status === "failed"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* RIGHT CARD */}
        <div
          className={`rounded-xl shadow-lg p-6 transition-colors duration-300 ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border`}
        >
          <h2 className="text-xl font-semibold mb-2">Received SMS Messages</h2>
          <p className="text-sm text-orange-500 mb-4">
            No need to refresh the page to get the code.
          </p>
          <div
            className={`overflow-auto max-h-[400px] rounded-lg border transition-colors duration-300 ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <table className="w-full text-left text-sm">
              <thead
                className={`transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Phone no</th>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Cost</th>
                  <th className="py-3 px-4">TTL</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {smsMessages.length > 0 ? (
                  smsMessages.map((sms, i) => (
                    <tr
                      key={i}
                      className={`border-b transition-colors duration-300 ${
                        darkMode
                          ? "border-gray-700 hover:bg-gray-700"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <td className="py-3 px-4">{sms.id}</td>
                      <td className="py-3 px-4">{sms.service}</td>
                      <td className="py-3 px-4">{sms.phone}</td>
                      <td className="py-3 px-4 font-mono">{sms.code}</td>
                      <td className="py-3 px-4">
                        {Number(sms.cost).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">{sms.ttl}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            sms.status === "received"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {sms.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-4 text-center text-gray-500">
                      No SMS messages received yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsaNumbers;
