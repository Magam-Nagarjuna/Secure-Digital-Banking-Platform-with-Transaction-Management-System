import { STORAGE_KEYS } from "./constants";

/**
 * Thin wrapper around the localStorage session calls that were
 * duplicated across LoginPage, AdminMenu, CustomerMenu and
 * CustomerReport (set on login, read for greeting/back-nav,
 * cleared on logout).
 */
export const setSession = ({ role, username, personalName }) => {
    if (role !== undefined) localStorage.setItem(STORAGE_KEYS.ROLE, role);
    if (username !== undefined) localStorage.setItem(STORAGE_KEYS.USERNAME, username);
    if (personalName !== undefined) {
        localStorage.setItem(STORAGE_KEYS.PERSONAL_NAME, personalName);
    }
};

export const getRole = () => localStorage.getItem(STORAGE_KEYS.ROLE);

export const getDisplayName = () =>
    localStorage.getItem(STORAGE_KEYS.PERSONAL_NAME) ||
    localStorage.getItem(STORAGE_KEYS.USERNAME) ||
    "User";

export const clearSession = () => {
    localStorage.clear();
    sessionStorage.clear();
};
