import Cookies from 'js-cookie';

const ACCESS_TOKEN = 'access_token';

export const CookieService = {
    getToken(): string | undefined {
        return Cookies.get(ACCESS_TOKEN);
    },

    setToken(access_token: string): void {
        Cookies.set(ACCESS_TOKEN, access_token, { expires: 7, sameSite: 'lax' });
    },

    clearToken(): void {
        Cookies.remove(ACCESS_TOKEN);
    },
};
