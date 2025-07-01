// src/store/useThemeStore.js
import { create } from 'zustand';

const useThemeStore = create((set) => ({
  darkMode: true,
  toggleTheme: () =>
    set((state) => ({ darkMode: !state.darkMode })),
  setDarkMode: (value) => set({ darkMode: value }),
}));

export default useThemeStore;
