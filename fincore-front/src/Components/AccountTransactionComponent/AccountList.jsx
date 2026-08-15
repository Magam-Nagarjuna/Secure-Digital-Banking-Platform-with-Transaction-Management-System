import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccountsByCustomerId } from "../../Services/AccountService";
import { getCustomerByUsername } from "../../Services/CustomerService";
import SearchBar from "../common/SearchBar";
import { accountStyles as as_ } from "../../styles";
import { formatAmount } from "../../utils/formatter";

const STATUS_MAP = {
    A: { text: "Active", background: "#ECFDF3", color: "#16834B", border: "#BBE8CF" },
    P: { text: "Pending", background: "#FFF8E7", color: "#B77908", border: "#F3D98A" },
    R: { text: "Rejected", background: "#FEF2F2", color: "#C62828", border: "#F3C3C3" },
};

const getStatus = (status) =>
    STATUS_MAP[status] || { text: status || "Unknown", background: "#F3F4F6", color: "#64748B", border: "#E2E8F0" };

const STATUS_FILTERS = [
    ["ALL", "All Accounts"],
    ["A", "Active"],
    ["P", "Pending"],
    ["R", "Rejected"],
];

const AccountList = () => {

    const [accounts, setAccounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [customer, setCustomer] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        loadAccounts();
    }, []);

    const loadAccounts = () => {
        getCustomerByUsername()
            .then((res) => {
                setCustomer(res.data);
                return getAccountsByCustomerId(res.data.customerId);
            })
            .then((response) => {
                setAccounts(Array.isArray(response.data) ? response.data : []);
            })
            .catch((error) => {
                console.error("Account Loading Error:", error);
                setAccounts([]);
            });
    };

    const filteredAccounts = useMemo(() => {
        const search = searchTerm.toLowerCase().trim();

        return accounts.filter((account) => {
            const matchesSearch =
                !search ||
                String(account.accountNumber || "").toLowerCase().includes(search) ||
                String(account.accountType || "").toLowerCase().includes(search);

            const matchesStatus = statusFilter === "ALL" || account.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [accounts, searchTerm, statusFilter]);

    const activeCount = accounts.filter((a) => a.status === "A").length;
    const pendingCount = accounts.filter((a) => a.status === "P").length;

    const totalBalance = accounts.reduce((total, a) => total + Number(a.balance || 0), 0);

    const returnBack = () => navigate("/customer-menu");

    const customerName = customer?.customerName || customer?.username || "Customer";
    const customerInitial = customerName.charAt(0).toUpperCase();

    return (
        <div style={as_.page}>

            {/* ================= PAGE HEADER ================= */}
            <header style={as_.header}>
                <div style={as_.headerInner}>
                    <div style={as_.headerRow}>

                        <div>
                            <div style={as_.eyebrow}>ACCOUNT MANAGEMENT</div>
                            <h1 style={as_.title}>My Accounts</h1>
                            <p style={as_.subtitle}>View and manage your FinCore bank accounts.</p>
                        </div>

                        <div style={as_.customerPill}>
                            <div style={as_.customerAvatar}>{customerInitial}</div>
                            <div>
                                <div style={as_.customerName}>{customerName}</div>
                                <div style={as_.customerId}>
                                    Customer ID: {customer?.customerId || "—"}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            {/* ================= MAIN ================= */}
            <main style={as_.main}>

                <div style={as_.backRow}>
                    <button type="button" onClick={returnBack} style={as_.backButton}>
                        <span style={{ fontSize: "20px", lineHeight: "1", marginTop: "-2px" }}>‹</span>
                        <span>Return Back</span>
                    </button>
                </div>

                {/* ================= SUMMARY CARDS ================= */}
                <div style={as_.statsGrid}>

                    <div style={as_.statCard}>
                        <div style={as_.statIcon("#EAF2FF")}>🏦</div>
                        <div>
                            <div style={as_.statLabel}>TOTAL ACCOUNTS</div>
                            <div style={as_.statValue}>{accounts.length}</div>
                        </div>
                    </div>

                    <div style={as_.statCard}>
                        <div style={as_.statIcon("#ECFDF3")}>✓</div>
                        <div>
                            <div style={as_.statLabel}>ACTIVE</div>
                            <div style={{ ...as_.statValue, color: "#16834B" }}>{activeCount}</div>
                        </div>
                    </div>

                    <div style={as_.statCard}>
                        <div style={as_.statIcon("#FFF8E7")}>⏳</div>
                        <div>
                            <div style={as_.statLabel}>PENDING</div>
                            <div style={{ ...as_.statValue, color: "#B77908" }}>{pendingCount}</div>
                        </div>
                    </div>

                    <div style={as_.statCard}>
                        <div style={as_.statIcon("#EEF2FF")}>₹</div>
                        <div>
                            <div style={as_.statLabel}>TOTAL BALANCE</div>
                            <div style={{ ...as_.statValue, fontSize: "19px", color: "#075fc2" }}>
                                ₹ {formatAmount(totalBalance)}
                            </div>
                        </div>
                    </div>

                </div>

                {/* ================= ACCOUNT PORTFOLIO ================= */}
                <div style={as_.portfolioCard}>

                    <div style={as_.portfolioHeader}>
                        <div style={as_.portfolioHeaderRow}>
                            <div>
                                <h2 style={as_.portfolioTitle}>Account Portfolio</h2>
                                <p style={as_.portfolioSubtitle}>
                                    {filteredAccounts.length} account{filteredAccounts.length !== 1 ? "s" : ""} displayed
                                </p>
                            </div>

                            <SearchBar
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search account number or type..."
                            />
                        </div>

                        <div style={as_.filterRow}>
                            {STATUS_FILTERS.map(([value, label]) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setStatusFilter(value)}
                                    style={as_.filterPill(statusFilter === value)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "850px" }}>
                            <thead>
                                <tr style={{ background: "#f8fafc" }}>
                                    <th style={as_.th}>Account</th>
                                    <th style={as_.th}>Account Type</th>
                                    <th style={as_.th}>Available Balance</th>
                                    <th style={{ ...as_.th, textAlign: "center" }}>Status</th>
                                    <th style={{ ...as_.th, textAlign: "center" }}>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredAccounts.length > 0 ? (
                                    filteredAccounts.map((account) => {

                                        const status = getStatus(account.status);

                                        return (
                                            <tr key={account.accountNumber} style={{ borderTop: "1px solid #edf1f5" }}>

                                                <td style={as_.td}>
                                                    <div style={as_.accountCell}>
                                                        <div style={as_.accountIcon}>₹</div>
                                                        <div>
                                                            <div style={as_.accountNumber}>{account.accountNumber}</div>
                                                            <div style={as_.accountTag}>FinCore Account</div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td style={as_.td}>
                                                    <span style={as_.typePill}>{account.accountType}</span>
                                                </td>

                                                <td style={as_.td}>
                                                    <div style={as_.balanceValue}>
                                                        ₹ {formatAmount(Number(account.balance || 0))}
                                                    </div>
                                                    <div style={as_.balanceCaption}>Current balance</div>
                                                </td>

                                                <td style={{ ...as_.td, textAlign: "center" }}>
                                                    <span style={as_.statusPill(status)}>
                                                        <span style={as_.statusDot(status.color)} />
                                                        {status.text}
                                                    </span>
                                                </td>

                                                <td style={{ ...as_.td, textAlign: "center" }}>
                                                    <button
                                                        type="button"
                                                        onClick={() => navigate(`/account-details/${account.accountNumber}`)}
                                                        style={as_.viewButton}
                                                    >
                                                        View Details →
                                                    </button>
                                                </td>

                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ padding: "65px 20px", textAlign: "center" }}>
                                            <div style={{ width: "58px", height: "58px", margin: "0 auto 15px", borderRadius: "16px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "25px" }}>
                                                🏦
                                            </div>
                                            <div style={{ fontWeight: "700", color: "#334155", fontSize: "15px" }}>
                                                No accounts found
                                            </div>
                                            <div style={{ color: "#94a3b8", fontSize: "13px", marginTop: "6px" }}>
                                                Try changing your search or account status filter.
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div style={as_.footer}>
                        Showing{" "}
                        <strong style={{ color: "#52627a" }}>{filteredAccounts.length}</strong>{" "}
                        of{" "}
                        <strong style={{ color: "#52627a" }}>{accounts.length}</strong>{" "}
                        accounts
                    </div>

                </div>

            </main>

        </div>
    );
};

export default AccountList;
