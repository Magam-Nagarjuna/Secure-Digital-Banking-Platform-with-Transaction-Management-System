/**
 * Currency formatting shared by TransactionReport and
 * AdminTransactionReport (both previously defined an identical
 * local `formatAmount` function).
 */
export const formatAmount = (amount) => {

    return Number(amount || 0).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

};

/**
 * Prefixes a formatted amount with the rupee sign, e.g. "₹ 1,200.00".
 */
export const formatCurrency = (amount) => `₹ ${formatAmount(amount)}`;
