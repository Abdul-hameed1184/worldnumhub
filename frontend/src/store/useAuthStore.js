import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_URL = 'https://worldnumhub-be.onrender.com/api/auth';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
          set({ user: res.data, loading: false });
          return true;
        } catch (err) {
          set({ error: err.response?.data?.message || 'Login failed', loading: false });
          return false;
        }
      },

      signup: async (username, email, password) => {
        set({ loading: true, error: null });
        try {
          await axios.post(`${API_URL}/signup`, { username, email, password }, { withCredentials: true });
          await get().login(email, password);
          set({ loading: false });
          return true;
        } catch (err) {
          set({ error: err.response?.data?.message || 'Signup failed', loading: false });
          return false;
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        try {
          await axios.get(`${API_URL}/logout`, { withCredentials: true });
          set({ user: null, loading: false });
        } catch (err) {
          set({ error: err.response?.data?.message || 'Logout failed', loading: false });
        }
      },

      checkAuth: async () => {
        set({ loading: true, error: null });
        try {
          const res = await axios.get(`${API_URL}/check`, { withCredentials: true });
          set({ user: res.data, loading: false });
          return true;
        } catch (err) {
          set({ user: null, error: null, loading: false });
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
      storage: {
        getItem: (name) => sessionStorage.getItem(name),
        setItem: (name, value) => sessionStorage.setItem(name, value),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);

export default useAuthStore;