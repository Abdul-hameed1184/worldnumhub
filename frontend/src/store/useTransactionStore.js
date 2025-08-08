import { create } from "zustand";
import axios from "axios";

const useTransactionStore = create((set) => ({
  transactions: [],
  loading: false,
  error: null,

  fetchTransactions: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/services/user/${userId}`);
      set({ transactions: res.data, loading: false });
    } catch (err) {
      set({ error: "Failed to load transactions", loading: false });
    }
  },

  verifyTransactionStatus: async (tx_ref) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/verify/${tx_ref}`);
      if (res.data.status === "success") {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.reference === tx_ref ? { ...t, status: res.data.transaction.status } : t
          )
        }));
      }
    } catch (err) {
      console.error("Verification failed", err);
    }
  }
}));

export default useTransactionStore;
