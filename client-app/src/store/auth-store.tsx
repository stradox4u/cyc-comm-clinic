import { create } from "zustand";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  allergies: [];
  blood_group: string;
  gender: string;
  date_of_birth: string | number | Date;
  emergency_contact_name: string;
  emergency_contact_phone: string;
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
    localStorage.removeItem("user");
    set({ user: null, isInitialized: true });
  },
  initializeUser: () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      set({ user: JSON.parse(storedUser), isInitialized: true });
    } else {
      set({ user: null, isInitialized: true });
    }
  },
}));
