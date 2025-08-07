// stores/useWalletStore.js
import { create } from "zustand";
import axios from "axios";

export const useWalletStore = create((set) => ({
  balance: 0,
  transactionStatus: null,
  loading: false,
  error: null,

  fetchBalance: async (userId) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/services/${userId}/balance`);
      set({ balance: res.data.balance, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch balance", loading: false });
    }
  },

  verifyTransaction: async (reference) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/services/verify/${reference}`);
      set({ transactionStatus: res.data.status, loading: false });
    } catch (err) {
      set({ error: "Verification failed", loading: false });
    }
  },
}));
