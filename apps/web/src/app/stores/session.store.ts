import { create } from 'zustand';
import { CookieService } from '@/infrastructure/cookies/cookies.service';

interface SessionState {
    email: string | null;
    access_token: string | null;
    isAuthenticated: boolean;
    setEmail: (email: string) => void;
    setAccessToken: (access_token: string) => void;
    clear: () => void;
    initFromCookies: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
    email: null,
    access_token: null,
    isAuthenticated: false,

    setEmail: (email) => {
        set({ email });
    },

    setAccessToken: (access_token) => {
        CookieService.setToken(access_token);
        set({ access_token, isAuthenticated: true });
    },

    clear: () => {
        CookieService.clearToken();
        set({ access_token: null, isAuthenticated: false, email: null });
    },

    initFromCookies: () => {
        const access_token = CookieService.getToken();
        if (access_token) set({ access_token, isAuthenticated: true });
    },
}));
