const KEY = "docmind_token";

export const getToken = (): string | null =>
  typeof window === "undefined" ? null : localStorage.getItem(KEY);

export const setToken = (token: string): void => localStorage.setItem(KEY, token);

export const clearToken = (): void => localStorage.removeItem(KEY);