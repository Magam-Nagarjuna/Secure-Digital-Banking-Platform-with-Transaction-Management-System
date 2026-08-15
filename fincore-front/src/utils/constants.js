/**
 * Small set of literal values that were repeated verbatim across
 * pages (status codes, minimum balance, storage keys).
 */
export const CUSTOMER_STATUS = {
    APPROVED: "A",
    PENDING: "P",
    REJECTED: "R",
};

export const ACCOUNT_STATUS = {
    ACTIVE: "A",
    PENDING: "P",
    REJECTED: "R",
};

export const MIN_ACCOUNT_BALANCE = 5000;

export const STORAGE_KEYS = {
    ROLE: "role",
    USERNAME: "username",
    PERSONAL_NAME: "personalName",
};

export const ROLES = {
    ADMIN: "Admin",
    CUSTOMER: "Customer",
};
