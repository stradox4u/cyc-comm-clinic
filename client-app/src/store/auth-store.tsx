import { create } from "zustand";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role_title?: string;
  // add more fields as needed
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  isInitialized: boolean;
  initializeUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isInitialized: false, // ✅ track init status
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    set({ user: null });
  },
  initializeUser: () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      set({ user: JSON.parse(storedUser), isInitialized: true });
    } else {
      set({ isInitialized: true });
    }
  },
}));
