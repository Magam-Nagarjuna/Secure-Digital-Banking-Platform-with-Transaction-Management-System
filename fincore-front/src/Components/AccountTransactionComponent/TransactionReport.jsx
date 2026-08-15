import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTransactionsByCustomer } from "../../Services/TransactionService";
import { getCustomerByUsername } from "../../Services/CustomerService";
import { transactionStyles as ts } from "../../styles";
import { formatAmount } from "../../utils/formatter";
import { formatDate } from "../../utils/dateUtils";
import "../../DisplayView.css";

const TransactionReport = () => {

    const navigate = useNavigate();

    const [customer, setCustomer] = useState({});
    const [transactions, setTransactions] = useState([]);

    const [typeFilter, setTypeFilter] = useState("ALL");
    const [accountFilter, setAccountFilter] = useState("ALL");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadReport();
    }, []);

    const loadReport = async () => {

        try {

            setLoading(true);
            setError("");

            const customerResponse = await getCustomerByUsername();
            const customerData = customerResponse.data;

            setCustomer(customerData);

            if (!customerData || !customerData.customerId) {
                setError("Customer information is not available.");
                setLoading(false);
                return;
            }

            const transactionResponse = await getTransactionsByCustomer(customerData.customerId);

            setTransactions(
                Array.isArray(transactionResponse.data) ? transactionResponse.data : []
            );

        } catch (err) {
            console.error("Transaction Report Error:", err);
            setError(err?.response?.data || "Unable to load transaction report.");
        } finally {
            setLoading(false);
        }
    };

    const accountNumbers = useMemo(() => {
        const accounts = transactions
            .map((t) => t.accountNumber)
            .filter((account) => account !== null && account !== undefined)
            .map((account) => String(account));
        return [...new Set(accounts)];
    }, [transactions]);

    const filteredTransactions = useMemo(() => {
        return transactions.filter((transaction) => {
            const transactionType = String(transaction.transactionType || "").toLowerCase();
            const transactionAccount = String(transaction.accountNumber || "");

            const typeMatches = typeFilter === "ALL" || transactionType === typeFilter.toLowerCase();
            const accountMatches = accountFilter === "ALL" || transactionAccount === accountFilter;

            return typeMatches && accountMatches;
        });
    }, [transactions, typeFilter, accountFilter]);

    const totalDeposits = useMemo(() => {
        return filteredTransactions
            .filter((t) => String(t.transactionType || "").toLowerCase() === "deposit")
            .reduce((sum, t) => sum + Number(t.transactionAmount || 0), 0);
    }, [filteredTransactions]);

    const totalWithdrawals = useMemo(() => {
        return filteredTransactions
            .filter((t) => String(t.transactionType || "").toLowerCase() === "withdraw")
            .reduce((sum, t) => sum + Number(t.transactionAmount || 0), 0);
    }, [filteredTransactions]);

    const resetFilters = () => {
        setTypeFilter("ALL");
        setAccountFilter("ALL");
    };

    return (
        <div style={ts.page}>

            {/* HEADER */}
            <div style={ts.headerRow}>
                <div>
                    <div style={ts.eyebrow}>FINCORE BANKING</div>
                    <h1 style={ts.heading}>Transaction Report</h1>
                    <p style={ts.subheading}>
                        View and filter all deposits and withdrawals
                        {customer.customerName ? ` for ${customer.customerName}.` : "."}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/customer-menu")}
                    style={ts.backButton}
                >
                    ← Return Back
                </button>
            </div>

            {/* SUMMARY CARDS */}
            <div style={ts.statsGrid}>
                <div style={ts.statCard("#e2e8f0")}>
                    <div style={ts.statLabel("#64748b")}>Transactions</div>
                    <div style={ts.statValue("#172033")}>{filteredTransactions.length}</div>
                </div>

                <div style={ts.statCard("#d9f1e1")}>
                    <div style={ts.statLabel("#15803d")}>Total Deposited</div>
                    <div style={ts.statValue("#15803d")}>₹ {formatAmount(totalDeposits)}</div>
                </div>

                <div style={ts.statCard("#f4dfb7")}>
                    <div style={ts.statLabel("#b45309")}>Total Withdrawn</div>
                    <div style={ts.statValue("#b45309")}>₹ {formatAmount(totalWithdrawals)}</div>
                </div>
            </div>

            {/* MAIN REPORT CARD */}
            <div style={ts.reportCard}>

                <div style={ts.filterHeader}>
                    <div>
                        <h2 style={ts.filterTitle}>Transaction History</h2>
                        <p style={ts.filterSubtitle}>
                            Filter transactions by type or account number.
                        </p>
                    </div>

                    <div style={ts.filterControls}>
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            style={{ ...ts.filterSelect, minWidth: "170px" }}
                        >
                            <option value="ALL">All Transactions</option>
                            <option value="Deposit">Deposited</option>
                            <option value="Withdraw">Withdrawals</option>
                        </select>

                        <select
                            value={accountFilter}
                            onChange={(e) => setAccountFilter(e.target.value)}
                            style={{ ...ts.filterSelect, minWidth: "190px" }}
                        >
                            <option value="ALL">All Accounts</option>
                            {accountNumbers.map((account) => (
                                <option key={account} value={account}>
                                    {account}
                                </option>
                            ))}
                        </select>

                        <button type="button" onClick={resetFilters} style={ts.resetButton}>
                            Reset
                        </button>
                    </div>
                </div>

                <div style={ts.activeFilters}>
                    <span style={ts.activeFiltersLabel}>Showing:</span>

                    <span style={ts.filterPill("#edf5ff", "#1261c9")}>
                        {typeFilter === "ALL"
                            ? "All Types"
                            : typeFilter === "Deposit"
                                ? "Deposits"
                                : "Withdrawals"}
                    </span>

                    <span style={ts.filterPill("#f3f4f6", "#475569")}>
                        {accountFilter === "ALL" ? "All Accounts" : `Account ${accountFilter}`}
                    </span>
                </div>

                {loading && <div style={ts.stateBlock}>Loading transaction report...</div>}

                {!loading && error && <div style={ts.errorBlock}>{error}</div>}

                {!loading && !error && (
                    <div style={ts.tableWrapper}>
                        <table style={ts.table}>
                            <thead>
                                <tr style={ts.theadRow}>
                                    <th style={ts.th}>TRANSACTION ID</th>
                                    <th style={ts.th}>ACCOUNT NUMBER</th>
                                    <th style={ts.th}>TYPE</th>
                                    <th style={ts.th}>AMOUNT</th>
                                    <th style={ts.th}>DATE</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredTransactions.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: "center", padding: "60px 20px", color: "#8793a5" }}>
                                            <div style={{ fontSize: "35px", marginBottom: "10px" }}>📄</div>
                                            <div style={{ fontWeight: "700", color: "#475569" }}>
                                                No transactions found
                                            </div>
                                            <div style={{ fontSize: "13px", marginTop: "5px" }}>
                                                Try changing the selected filters.
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredTransactions.map((transaction, index) => {

                                        const type = String(transaction.transactionType || "").toLowerCase();
                                        const isDeposit = type === "deposit";

                                        return (
                                            <tr key={transaction.transactionId || index} style={ts.row}>
                                                <td style={ts.td}>
                                                    <span style={{ fontWeight: "700", color: "#26354d" }}>
                                                        {transaction.transactionId}
                                                    </span>
                                                </td>

                                                <td style={ts.td}>{transaction.accountNumber}</td>

                                                <td style={ts.td}>
                                                    <span style={ts.typeBadge(isDeposit)}>
                                                        {isDeposit ? "Deposit" : "Withdraw"}
                                                    </span>
                                                </td>

                                                <td style={ts.td}>
                                                    <span style={ts.amountText(isDeposit)}>
                                                        {isDeposit ? "+" : "-"} ₹{" "}
                                                        {formatAmount(transaction.transactionAmount)}
                                                    </span>
                                                </td>

                                                <td style={{ ...ts.td, color: "#64748b" }}>
                                                    {formatDate(transaction.transactionDate)}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && !error && filteredTransactions.length > 0 && (
                    <div style={ts.tableFooter}>
                        <span>
                            Showing{" "}
                            <strong style={{ color: "#334155" }}>
                                {filteredTransactions.length}
                            </strong>{" "}
                            transaction{filteredTransactions.length !== 1 ? "s" : ""}
                        </span>

                        <span>
                            Customer ID:{" "}
                            <strong style={{ color: "#334155" }}>
                                {customer.customerId || "-"}
                            </strong>
                        </span>
                    </div>
                )}

            </div>

        </div>
    );
};

export default TransactionReport;
