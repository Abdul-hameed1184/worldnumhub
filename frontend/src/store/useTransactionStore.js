import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./useAuthStore";

const useTransactionStore = create((set, get) => ({
  transactions: [],
  loading: false,
  error: null,

  fetchTransactions: async () => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) {
      set({ error: "User not logged in" });
      return;
    }

    set({ loading: true, error: null });

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/services/user/${userId}`
      );
      set({ transactions: res.data, loading: false });
    } catch (err) {
      console.error("Failed to load transactions", err);
      set({ error: "Failed to load transactions", loading: false });
    }
  },

  verifyTransactionStatus: async (tx_ref) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/transactions/verify/${tx_ref}`
      );

      // Always update the store with the returned status
      const updatedStatus = res.data.status; // e.g., "successful" or "failed"

      set((state) => ({
        transactions: state.transactions.map((t) =>
          t.tx_ref === tx_ref ? { ...t, status: updatedStatus } : t
        ),
      }));
    } catch (err) {
      console.error("Verification failed", err);
    }
  },
}));

export default useTransactionStore;
