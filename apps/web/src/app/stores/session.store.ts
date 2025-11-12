import { create } from 'zustand';
import { CookieService } from '@/infrastructure/cookies/cookies.service';

interface SessionState {
    access_token: string | null;
    isAuthenticated: boolean;
    setAccessToken: (access_token: string) => void;
    clear: () => void;
    initFromCookies: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
    access_token: null,
    isAuthenticated: false,

    setAccessToken: (access_token) => {
        CookieService.setToken(access_token);
        set({ access_token, isAuthenticated: true });
    },

    clear: () => {
        CookieService.clearToken();
        set({ access_token: null, isAuthenticated: false });
    },

    initFromCookies: () => {
        const access_token = CookieService.getToken();
        if (access_token) set({ access_token, isAuthenticated: true });
    },
}));
