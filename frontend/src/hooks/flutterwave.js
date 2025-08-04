// utils/payWithFlutterwave.js
import axios from "axios";
import { toast } from "react-hot-toast";
import useAuthStore from "../store/useAuthStore";

export const payWithFlutterwave = async (svc) => {
  const { user } = useAuthStore.getState();

  if (!user) {
    // alert("You must be logged in to proceed.");
    toast.error("You must be logged in to proceed.");
    return;
  }

  const raw = svc["New Price (₦)"];
  const amount = Number(String(raw).replace(/,/g, ""));

  if (!amount || isNaN(amount) || amount < 100) {
    // alert("Invalid amount—must be ≥₦100");
    toast.error("Invalid amount—must be ≥₦100");
    return;
  }

  if (typeof window === "undefined" || !window.FlutterwaveCheckout) {
    // alert("Flutterwave script not loaded");
    toast.error("Flutterwave script not loaded");
    return;
  }

  window.FlutterwaveCheckout({
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: `FLW_${Date.now()}`,
    amount,
    currency: "NGN",
    payment_options: "card, ussd, mobilemoney",

    customer: {
      email: user.email || "guest@example.com",
      name: `${user.firstName || ""} ${user.lastName || ""}`,
      phone_number: user.phoneNumber || "",
    },

    customizations: {
      title: svc.Service || "Service Purchase",
      description: `Buy ${svc.Service || "service"}`,
      logo: "/icon.png",
    },

    callback: async (response) => {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/transaction`,
          {
            service: svc.Service,
            amount,
            tx_ref: response.tx_ref,
            flw_ref: response.flw_ref,
          }
        );
      } catch (err) {
        console.error("Failed to save transaction:", err);
      }

      if (window.closePaymentModal) {
        window.closePaymentModal();
      }
    },

    onclose: () => {
      console.log("Payment modal closed");
    },
  });
};
