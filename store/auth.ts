import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  picture: string | null;
  setPicture: (picture: string) => void;
  setToken: (token: string) => void;
  clearToken: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      picture: null,
      isAuthenticated: false,
      setToken: (token) => set({ token, isAuthenticated: true }),
      setPicture: (picture) => set({ picture }),
      clearToken: () => set({ token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);
