import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAccountNumbers } from "../../Services/AccountService";
import { getTransactionsByAccount } from "../../Services/TransactionService";
import BackButton from "../common/BackButton";
import Modal from "../common/Modal";
import { transactionStyles as ts } from "../../styles";
import "../../DisplayView.css";

const AdminTransactionReport = () => {

    const navigate = useNavigate();

    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);

    // Empty string means ALL ACCOUNTS
    const [selectedAccount, setSelectedAccount] = useState("");

    // ALL = all transaction types
    const [transactionType, setTransactionType] = useState("ALL");

    const [loadingAccounts, setLoadingAccounts] = useState(true);
    const [loadingTransactions, setLoadingTransactions] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [modal, setModal] = useState({
        open: false,
        title: "",
        message: "",
        type: "info",
    });

    useEffect(() => {
        loadAccounts();
    }, []);

    // Load all account numbers, normalizing whatever shape the backend returns.
    const loadAccounts = async () => {

        try {

            setLoadingAccounts(true);
            setErrorMessage("");

            console.log("====================================");
            console.log("ADMIN TRANSACTION REPORT");
            console.log("GETTING ALL ACCOUNTS");
            console.log("====================================");

            const response = await getAllAccountNumbers();

            console.log("getAllAccountNumbers response:", response);
            console.log("getAllAccountNumbers data:", response?.data);

            // Backend can return [8000001001, ...] OR [{ accountNumber: 8000001001 }, ...]
            let data = response?.data;

            if (!Array.isArray(data)) {
                data = [];
            }

            console.log("RAW ACCOUNT DATA:", data);

            // Normalize account numbers
            const validAccounts = [];

            data.forEach((item) => {

                // If backend returns plain number/string
                if (typeof item === "number" || typeof item === "string") {
                    if (String(item).trim() !== "") {
                        validAccounts.push(String(item));
                    }
                    return;
                }

                // If backend returns object
                if (item && typeof item === "object") {
                    const number =
                        item.accountNumber ??
                        item.accountNo ??
                        item.account_number ??
                        item.number ??
                        item.accountId;

                    if (number !== null && number !== undefined && String(number).trim() !== "") {
                        validAccounts.push(String(number));
                    }
                }
            });

            // Remove duplicates
            const uniqueAccountNumbers = [...new Set(validAccounts)];

            const normalizedAccounts = uniqueAccountNumbers.map((number) => ({
                accountNumber: number,
            }));

            console.log("NORMALIZED ACCOUNTS:", normalizedAccounts);

            setAccounts(normalizedAccounts);

            if (normalizedAccounts.length === 0) {
                setErrorMessage("No customer accounts were returned by the server.");
                setTransactions([]);
                return;
            }

            // Automatically load transactions from ALL accounts.
            await loadAllTransactions(normalizedAccounts);

        } catch (error) {

            console.error("ADMIN ACCOUNT LOAD ERROR:", error);
            console.error("ERROR RESPONSE:", error?.response);
            console.error("ERROR DATA:", error?.response?.data);

            setAccounts([]);
            setTransactions([]);

            setErrorMessage(error?.response?.data || "Unable to load customer accounts.");

            setModal({
                open: true,
                title: "Unable to Load Accounts",
                message: "The system could not load customer account numbers.",
                type: "error",
            });

        } finally {
            setLoadingAccounts(false);
        }
    };

    // Normalizes one account's transaction response into a flat array.
    const normalizeTransactionData = (data) => {
        if (Array.isArray(data)) {
            return data;
        }
        if (data && Array.isArray(data.content)) {
            return data.content;
        }
        if (data && Array.isArray(data.data)) {
            return data.data;
        }
        if (data && Array.isArray(data.transactions)) {
            return data.transactions;
        }
        return [];
    };

    // Load transactions from ALL accounts.
    const loadAllTransactions = async (accountList) => {

        try {

            setLoadingTransactions(true);
            setErrorMessage("");

            console.log("====================================");
            console.log("LOADING ALL ACCOUNT TRANSACTIONS");
            console.log("TOTAL ACCOUNTS:", accountList.length);
            console.log("====================================");

            // Create one API request for each account.
            const transactionRequests = accountList.map(async (account) => {

                const accountNumber = account.accountNumber;

                try {

                    console.log("Loading transactions for:", accountNumber);

                    const response = await getTransactionsByAccount(accountNumber);

                    console.log(`Transaction response for ${accountNumber}:`, response);

                    const data = normalizeTransactionData(response?.data);

                    // Make sure every transaction contains account number.
                    return data.map((transaction) => ({
                        ...transaction,
                        accountNumber:
                            transaction.accountNumber ??
                            transaction.accountNo ??
                            transaction.account_number ??
                            accountNumber,
                    }));

                } catch (error) {
                    // If one account has no transactions, don't stop the entire report.
                    console.warn(`No transactions found for account ${accountNumber}`, error);
                    return [];
                }
            });

            // Wait for ALL account requests.
            const results = await Promise.all(transactionRequests);

            // Combine all transaction arrays.
            const allTransactions = results.flat();

            console.log("====================================");
            console.log("ALL TRANSACTIONS:");
            console.log(allTransactions);
            console.log("TOTAL TRANSACTIONS:", allTransactions.length);
            console.log("====================================");

            setTransactions(allTransactions);

        } catch (error) {

            console.error("ALL TRANSACTIONS LOAD ERROR:", error);

            setTransactions([]);
            setErrorMessage("Unable to load transactions.");

        } finally {
            setLoadingTransactions(false);
        }
    };

    // Load transactions for one account.
    const loadTransactions = async (accountNumber) => {

        try {

            setLoadingTransactions(true);
            setErrorMessage("");

            console.log("====================================");
            console.log("GETTING TRANSACTIONS FOR ACCOUNT:", accountNumber);
            console.log("====================================");

            const response = await getTransactionsByAccount(accountNumber);

            console.log("TRANSACTION RESPONSE:", response);
            console.log("TRANSACTION DATA:", response?.data);

            const data = normalizeTransactionData(response?.data);

            // Add account number if backend doesn't return it.
            const normalizedTransactions = data.map((transaction) => ({
                ...transaction,
                accountNumber:
                    transaction.accountNumber ??
                    transaction.accountNo ??
                    transaction.account_number ??
                    accountNumber,
            }));

            console.log("NORMALIZED TRANSACTIONS:", normalizedTransactions);

            setTransactions(normalizedTransactions);

        } catch (error) {

            console.error("TRANSACTION LOAD ERROR:", error);
            console.error("TRANSACTION ERROR RESPONSE:", error?.response);

            setTransactions([]);

            setErrorMessage(
                error?.response?.data || "Unable to load transactions for this account."
            );

        } finally {
            setLoadingTransactions(false);
        }
    };

    const handleAccountChange = async (event) => {

        const accountNumber = event.target.value;

        console.log("ADMIN SELECTED ACCOUNT:", accountNumber);

        setSelectedAccount(accountNumber);
        setTransactionType("ALL");
        setErrorMessage("");

        // Empty account = ALL ACCOUNTS
        if (!accountNumber) {
            await loadAllTransactions(accounts);
            return;
        }

        // Specific account selected
        await loadTransactions(accountNumber);
    };

    const getTransactionTypeValue = (transaction) => {

        const value =
            transaction?.transactionType ??
            transaction?.type ??
            transaction?.transaction_type ??
            transaction?.transactionTypeCode ??
            "";

        const type = String(value).trim().toUpperCase();

        if (type === "D" || type === "DEPOSIT" || type === "DEPOSITED") {
            return "D";
        }

        if (type === "W" || type === "WITHDRAW" || type === "WITHDRAWAL" || type === "WITHDRAWN") {
            return "W";
        }

        return type;
    };

    const getTransactionAmount = (transaction) => {

        const amount =
            transaction?.transactionAmount ??
            transaction?.amount ??
            transaction?.transaction_amount ??
            transaction?.transactionValue ??
            transaction?.value ??
            0;

        const number = Number(amount);

        return Number.isNaN(number) ? 0 : number;
    };

    const filteredTransactions = useMemo(() => {
        if (transactionType === "ALL") {
            return transactions;
        }
        return transactions.filter(
            (transaction) => getTransactionTypeValue(transaction) === transactionType
        );
    }, [transactions, transactionType]);

    const totalDeposited = useMemo(() => {
        return filteredTransactions.reduce((total, transaction) => {
            return getTransactionTypeValue(transaction) === "D"
                ? total + getTransactionAmount(transaction)
                : total;
        }, 0);
    }, [filteredTransactions]);

    const totalWithdrawn = useMemo(() => {
        return filteredTransactions.reduce((total, transaction) => {
            return getTransactionTypeValue(transaction) === "W"
                ? total + getTransactionAmount(transaction)
                : total;
        }, 0);
    }, [filteredTransactions]);

    const formatAmount = (amount) => {
        return Number(amount || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const formatDate = (value) => {

        if (!value) return "-";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return String(value);
        }

        return date.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getTransactionType = (transaction) => {

        const type = getTransactionTypeValue(transaction);

        if (type === "D") {
            return { text: "Deposit", color: "#15803D", background: "#DCFCE7" };
        }

        if (type === "W") {
            return { text: "Withdraw", color: "#B45309", background: "#FEF3C7" };
        }

        return {
            text: transaction?.transactionType ?? transaction?.type ?? "Unknown",
            color: "#475569",
            background: "#F1F5F9",
        };
    };

    const resetReport = async () => {

        setSelectedAccount("");
        setTransactionType("ALL");
        setErrorMessage("");

        // Reload ALL account transactions.
        if (accounts.length > 0) {
            await loadAllTransactions(accounts);
        }
    };

    const returnBack = () => navigate("/admin-menu");

    return (
        <div className="page">

            {/* ================= HEADER ================= */}
            <div className="page-header" style={{ position: "relative" }}>
                <div>
                    <div style={ts.adminEyebrow}>FINCORE ADMIN</div>
                    <h1 className="page-title">Transaction Report</h1>
                    <p className="page-subtitle">
                        Monitor deposits and withdrawals across customer accounts.
                    </p>
                </div>

                <div style={{ position: "absolute", right: "0", top: "0" }}>
                    <BackButton onClick={returnBack} />
                </div>
            </div>

            {/* ================= SUMMARY CARDS ================= */}
            <div style={ts.adminStatsGrid}>

                <div className="fin-card" style={ts.adminStatCard()}>
                    <div style={ts.adminStatLabel("#64748B")}>Transactions</div>
                    <div style={ts.adminStatValue("#172033")}>{filteredTransactions.length}</div>
                </div>

                <div className="fin-card" style={ts.adminStatCard("#BBF7D0")}>
                    <div style={ts.adminStatLabel("#15803D")}>Total Deposited</div>
                    <div style={ts.adminStatValue("#15803D")}>₹ {formatAmount(totalDeposited)}</div>
                </div>

                <div className="fin-card" style={ts.adminStatCard("#FED7AA")}>
                    <div style={ts.adminStatLabel("#C2410C")}>Total Withdrawn</div>
                    <div style={ts.adminStatValue("#C2410C")}>₹ {formatAmount(totalWithdrawn)}</div>
                </div>

            </div>

            {/* ================= MAIN CARD ================= */}
            <div className="fin-card" style={{ padding: "28px" }}>

                <div style={ts.adminFiltersRow}>
                    <div>
                        <h2 style={ts.adminSectionTitle}>Account Transaction History</h2>
                        <p style={ts.adminSectionSubtitle}>
                            View transaction history across all customer accounts
                            or select a specific account.
                        </p>
                    </div>

                    <div style={ts.adminFilterControls}>

                        <select
                            className="fin-input"
                            value={selectedAccount}
                            onChange={handleAccountChange}
                            disabled={loadingAccounts}
                            style={{ minWidth: "230px", cursor: loadingAccounts ? "not-allowed" : "pointer" }}
                        >
                            <option value="">
                                {loadingAccounts
                                    ? "Loading accounts..."
                                    : accounts.length === 0
                                        ? "No accounts available"
                                        : "All Accounts"}
                            </option>
                            {accounts.map((account, index) => {
                                const number = account.accountNumber;
                                return (
                                    <option key={`${String(number)}-${index}`} value={String(number)}>
                                        {String(number)}
                                    </option>
                                );
                            })}
                        </select>

                        <select
                            className="fin-input"
                            value={transactionType}
                            onChange={(e) => setTransactionType(e.target.value)}
                            style={{ minWidth: "180px", cursor: "pointer" }}
                        >
                            <option value="ALL">All Transactions</option>
                            <option value="D">Deposits</option>
                            <option value="W">Withdrawals</option>
                        </select>

                        <button type="button" className="fin-btn" onClick={resetReport} style={ts.adminResetButton}>
                            Reset
                        </button>

                    </div>
                </div>

                <div style={ts.adminCountBar}>
                    <strong>{accounts.length}</strong> customer account{accounts.length !== 1 ? "s" : ""} available
                    {!selectedAccount && (
                        <span style={ts.adminCountHighlight}>• Showing all accounts</span>
                    )}
                    {selectedAccount && (
                        <span style={ts.adminCountHighlight}>• Account: {selectedAccount}</span>
                    )}
                </div>

                {errorMessage && <div style={ts.adminErrorBox}>{errorMessage}</div>}

                {loadingTransactions && (
                    <div style={ts.adminLoadingBox}>
                        <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>
                            Loading transaction history...
                        </div>
                        <div style={{ fontSize: "13px" }}>
                            Please wait while transactions from customer accounts are loaded.
                        </div>
                    </div>
                )}

                {!loadingTransactions && transactions.length === 0 && !errorMessage && (
                    <div style={ts.adminEmptyBox}>
                        <div style={{ fontSize: "38px", marginBottom: "10px" }}>📄</div>
                        <h3 style={{ margin: "0 0 8px", color: "#172033" }}>No transactions found.</h3>
                        <p style={{ margin: 0, color: "#64748B" }}>
                            There are currently no transactions to display.
                        </p>
                    </div>
                )}

                {!loadingTransactions && filteredTransactions.length > 0 && (
                    <div className="fc-table-scroll">
                        <table className="fin-table">
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Account Number</th>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredTransactions.map((transaction, index) => {

                                    const typeData = getTransactionType(transaction);

                                    const transactionId = transaction.transactionId ?? transaction.id ?? "-";

                                    const accountNumber =
                                        transaction.accountNumber ??
                                        transaction.accountNo ??
                                        transaction.account_number ??
                                        selectedAccount ??
                                        "-";

                                    const date =
                                        transaction.transactionDate ?? transaction.date ?? transaction.createdDate;

                                    const amount = getTransactionAmount(transaction);
                                    const isDeposit = getTransactionTypeValue(transaction) === "D";

                                    return (
                                        <tr key={transactionId !== "-" ? transactionId : `${accountNumber}-${index}`}>
                                            <td style={ts.adminIdCell}>{transactionId}</td>
                                            <td>{accountNumber}</td>
                                            <td>{formatDate(date)}</td>
                                            <td>
                                                <span style={ts.adminTypeBadge(typeData)}>{typeData.text}</span>
                                            </td>
                                            <td style={ts.adminAmountCell(isDeposit)}>
                                                {isDeposit ? "+" : "-"} ₹ {formatAmount(amount)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loadingTransactions && transactions.length > 0 && filteredTransactions.length === 0 && (
                    <div style={ts.adminFilteredEmptyBox}>
                        No transactions found for the selected transaction type.
                    </div>
                )}

            </div>

            <Modal
                open={modal.open}
                title={modal.title}
                message={modal.message}
                type={modal.type}
                onClose={() => setModal({ ...modal, open: false })}
            />

        </div>
    );
};

export default AdminTransactionReport;
