/**
 * Misc small helpers reused across list/report pages.
 */

// Used to render an avatar initial for a name (customer, user...).
// Matches the local `getInitial` helper previously duplicated in
// CustomerReport and similar list pages.
export const getInitial = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
};

// Builds a className string from a list of possibly-falsy values.
export const classNames = (...values) => values.filter(Boolean).join(" ");
