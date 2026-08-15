/**
 * Small, generic validation helpers. Field-specific validation
 * flows (RegisterUser, CustomerEntry, TransactionEntry, ...) keep
 * their own step-by-step logic to avoid changing behavior, but
 * they can lean on these for the common checks.
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isRequired = (value) => Boolean(value && value.toString().trim());

export const isValidEmail = (value) => EMAIL_PATTERN.test(value);
