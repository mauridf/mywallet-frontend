import { create } from "zustand";

type AuthState = {
  token: string | null;
  expiresAt: string | null;
  setAuth: (token: string, expiresAt: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("mywallet_token"),
  expiresAt: localStorage.getItem("mywallet_expires"),
  setAuth: (token, expiresAt) => {
    localStorage.setItem("mywallet_token", token);
    localStorage.setItem("mywallet_expires", expiresAt);
    set({ token, expiresAt });
  },
  logout: () => {
    localStorage.removeItem("mywallet_token");
    localStorage.removeItem("mywallet_expires");
    set({ token: null, expiresAt: null });
  },
}));
