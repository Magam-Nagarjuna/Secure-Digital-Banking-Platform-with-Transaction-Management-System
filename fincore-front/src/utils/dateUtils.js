/**
 * Date formatting shared by TransactionReport and
 * AdminTransactionReport (both previously defined an identical
 * local `formatDate` function).
 */
export const formatDate = (date) => {

    if (!date) return "-";

    const d = new Date(date);

    if (isNaN(d.getTime())) {
        return date;
    }

    return d.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

};
