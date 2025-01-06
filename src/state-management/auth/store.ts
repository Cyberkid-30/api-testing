import { create } from "zustand";

interface AuthStore {
  user: string;
  login: (name: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: "",
  login: (name: string) => set(() => ({ user: name })),
  logout: () => set(() => ({ user: "" })),
}));

export default useAuthStore;
