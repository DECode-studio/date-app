import { create } from "zustand";
import { clearToken, saveToken } from "../lib/storage";

type User = { id: number; name: string; email: string } | null;

interface AuthState {
    user: User;
    token: string | null;
    setAuth: (token: string, user: User) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
    user: null,
    token: null,
    setAuth: async (token, user) => {
        await saveToken(token);
        set({ token, user });
    },
    logout: async () => {
        await clearToken();
        set({ token: null, user: null });
    },
}));
