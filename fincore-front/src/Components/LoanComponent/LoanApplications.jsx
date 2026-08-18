import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import { getCustomerByUsername } from "../../Services/CustomerService";
import {
    getLoanApplications,
    getLoanApplicationsByCustomer,
    getLoanRepayments
} from "../../Services/LoanService";

import { commonStyles, layoutStyles } from "../../styles";
import loanStyles from "../../styles/loanStyles";
import logo from "../../assets/logo.png";

const money = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
        maximumFractionDigits: 2
    })}`;

const pillStyle = (status) =>
    status === "APPROVED"
        ? { background: "#ECFDF5", color: "#047857" }
        : status === "PENDING"
            ? { background: "#FFF7ED", color: "#C2410C" }
            : status === "REJECTED"
                ? { background: "#FEF2F2", color: "#B91C1C" }
                : status === "CLOSED"
                    ? { background: "#EEF2FF", color: "#4338CA" }
                    : { background: "#F1F5F9", color: "#475569" };

const detailRow = (label, value) => (
    <div style={loanStyles.detailView.row} key={label}>
        <strong style={loanStyles.detailView.label}>{label}</strong>
        <span style={loanStyles.detailView.value}>
            {value ?? "—"}
        </span>
    </div>
);

const formatDate = (value) => {
    if (!value) return "—";

    if (typeof value === "string") {
        return value.includes(" ")
            ? value.split(" ")[0]
            : value;
    }

    return value;
};

const LoanApplications = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isAdmin =
        location.pathname === "/customer-loans";

    const [customer, setCustomer] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selected, setSelected] = useState(null);

    const load = async () => {
        try {
            setLoading(true);
            setError("");
            if (isAdmin) {
                const response = await getLoanApplications();

                const apps = Array.isArray(response.data)
                    ? response.data
                    : [];

                const updatedApps = await Promise.all(
                    apps.map(async (app) => {

                        if (app.applicationStatus !== "CLOSED") {
                            return app;
                        }

                        try {
                            const repaymentResponse =
                                await getLoanRepayments(
                                    app.applicationId
                                );

                            const repayments =
                                Array.isArray(repaymentResponse.data)
                                    ? repaymentResponse.data
                                    : [];

                            const totalTenure =
                                Number(app.totalTenure || 0);
                            const paidTenure = Math.min(
                                repayments.length,
                                totalTenure
                            );
                            const sortedRepayments = [
                                ...repayments
                            ].sort((a, b) => {

                                const dateA =
                                    new Date(
                                        a.paymentDate ||
                                        a.payment_date ||
                                        0
                                    ).getTime();

                                const dateB =
                                    new Date(
                                        b.paymentDate ||
                                        b.payment_date ||
                                        0
                                    ).getTime();

                                return dateA - dateB;
                            });

                            const latestRepayment =
                                sortedRepayments.length > 0
                                    ? sortedRepayments[
                                        sortedRepayments.length - 1
                                    ]
                                    : null;

                            return {
                                ...app,

                                paidTenure,

                                closedDate:
                                    latestRepayment?.paymentDate ||
                                    latestRepayment?.payment_date ||
                                    app.closedDate ||
                                    null
                            };

                        } catch (err) {

                            console.error(
                                `Unable to load repayments for ${app.applicationId}`,
                                err
                            );

                            return {
                                ...app,

                                paidTenure: Math.min(
                                    Number(app.paidTenure || 0),
                                    Number(app.totalTenure || 0)
                                )
                            };
                        }
                    })
                );

                setApplications(updatedApps);

                return;
            }

            const c = await getCustomerByUsername();

            if (!c?.data?.customerId) {
                throw new Error(
                    "Customer information is not available. Please login again."
                );
            }

            setCustomer(c.data);

            const response =
                await getLoanApplicationsByCustomer(
                    c.data.customerId
                );

            setApplications(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (e) {

            console.error(
                "Loan applications loading error:",
                e
            );

            setError(
                e.response?.data?.message ||
                e.message ||
                (
                    isAdmin
                        ? "Unable to load customer loans."
                        : "Unable to load your applications."
                )
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, [isAdmin]);


    if (isAdmin) {
        return (
            <div style={loanStyles.page}>

                <div style={layoutStyles.dashboardHeader}>
                    <Container>
                        <div style={layoutStyles.dashboardHeaderRow}>

                            <div style={layoutStyles.dashboardBrandRow}>

                                <img
                                    src={logo}
                                    alt="FinCore Bank"
                                    style={layoutStyles.dashboardLogo}
                                />

                                <div>
                                    <h2
                                        style={
                                            layoutStyles.dashboardBrandTitle
                                        }
                                    >
                                        FinCore Bank
                                    </h2>

                                    <small
                                        style={
                                            layoutStyles.dashboardBrandSubtitle
                                        }
                                    >
                                        Admin • Customer Loans
                                    </small>
                                </div>

                            </div>

                        </div>
                    </Container>
                </div>

                <Container style={{ paddingTop: "28px" }}>

                    <div style={loanStyles.backRow}>
                        <button
                            type="button"
                            style={loanStyles.backButton}
                            onClick={() =>
                                navigate("/admin-menu")
                            }
                        >
                            ‹ <span>Return Back</span>
                        </button>
                    </div>

                    <div
                        style={{
                            ...loanStyles.header,
                            marginTop: "20px"
                        }}
                    >
                        <div>

                            <div style={commonStyles.eyebrow}>
                                ADMIN PORTAL • LOANS
                            </div>

                            <h1 style={loanStyles.title}>
                                Customer Loans
                            </h1>

                            <p style={loanStyles.subtitle}>
                                View all customer loans and
                                repayment status.
                            </p>

                        </div>
                    </div>

                    {error && (
                        <div
                            style={{
                                ...loanStyles.alert,
                                background: "#FEF2F2",
                                color: "#B91C1C",
                                border: "1px solid #FECACA"
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <div style={loanStyles.card}>

                        {loading ? (
                            <div>
                                Loading customer loans...
                            </div>
                        ) : applications.length === 0 ? (
                            <div>
                                No customer loans found.
                            </div>
                        ) : (
                            <div
                                style={{
                                    ...loanStyles.tableWrap,
                                    overflowX: "auto"
                                }}
                            >

                                <table
                                    style={{
                                        ...loanStyles.table,
                                        minWidth: "1200px"
                                    }}
                                >

                                    <thead>
                                        <tr>

                                            <th style={loanStyles.th}>
                                                Application
                                            </th>

                                            <th style={loanStyles.th}>
                                                Customer
                                            </th>

                                            <th style={loanStyles.th}>
                                                Loan ID
                                            </th>

                                            <th style={loanStyles.th}>
                                                Amount
                                            </th>

                                            <th style={loanStyles.th}>
                                                Outstanding
                                            </th>

                                            <th style={loanStyles.th}>
                                                Tenure
                                            </th>

                                            <th style={loanStyles.th}>
                                                Paid Tenure
                                            </th>

                                            <th style={loanStyles.th}>
                                                Loan Account
                                            </th>

                                            <th style={loanStyles.th}>
                                                Loan Open Date
                                            </th>

                                            <th style={loanStyles.th}>
                                                Closed Date
                                            </th>

                                        </tr>
                                    </thead>

                                    <tbody>

                                        {applications.map((a) => (

                                            <tr key={a.applicationId}>

                                                <td style={loanStyles.td}>
                                                    <strong>
                                                        {a.applicationId}
                                                    </strong>
                                                </td>

                                                <td style={loanStyles.td}>
                                                    {a.customerId || "—"}
                                                </td>

                                                <td style={loanStyles.td}>
                                                    {a.loanId || "—"}
                                                </td>

                                                <td style={loanStyles.td}>
                                                    {money(
                                                        a.loanAmount
                                                    )}
                                                </td>

                                                <td style={loanStyles.td}>
                                                    <strong>
                                                        {money(
                                                            a.outstandingAmount
                                                        )}
                                                    </strong>
                                                </td>

                                                <td style={loanStyles.td}>
                                                    {a.totalTenure ?? "—"}
                                                </td>

                                                <td style={loanStyles.td}>
                                                    {Math.min(
                                                        Number(
                                                            a.paidTenure || 0
                                                        ),
                                                        Number(
                                                            a.totalTenure || 0
                                                        )
                                                    )}
                                                </td>

                                                <td style={loanStyles.td}>

                                                    {a.applicationStatus ===
                                                        "APPROVED" ||
                                                    a.applicationStatus ===
                                                        "CLOSED"
                                                        ? (
                                                            a.paymentAccountNumber ||
                                                            a.accountNumber ||
                                                            "—"
                                                        )
                                                        : "—"}

                                                </td>

                                                <td style={loanStyles.td}>

                                                    {a.applicationStatus ===
                                                        "APPROVED" ||
                                                    a.applicationStatus ===
                                                        "CLOSED"
                                                        ? formatDate(
                                                            a.reviewedDate
                                                        )
                                                        : "—"}

                                                </td>

                                                <td style={loanStyles.td}>

                                                    {a.applicationStatus ===
                                                        "CLOSED"
                                                        ? formatDate(
                                                            a.closedDate
                                                        )
                                                        : "—"}

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>
                        )}

                    </div>

                </Container>

            </div>
        );
    }

    return (
        <div style={loanStyles.page}>

            <div style={layoutStyles.dashboardHeader}>
                <Container>

                    <div style={layoutStyles.dashboardHeaderRow}>

                        <div style={layoutStyles.dashboardBrandRow}>

                            <img
                                src={logo}
                                alt="FinCore Bank"
                                style={layoutStyles.dashboardLogo}
                            />

                            <div>

                                <h2
                                    style={
                                        layoutStyles.dashboardBrandTitle
                                    }
                                >
                                    FinCore Bank
                                </h2>

                                <small
                                    style={
                                        layoutStyles.dashboardBrandSubtitle
                                    }
                                >
                                    Customer • My Loans
                                </small>

                            </div>

                        </div>

                    </div>

                </Container>
            </div>

            <Container style={{ paddingTop: "28px" }}>

                <div style={loanStyles.backRow}>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/customer-menu")
                        }
                        style={loanStyles.backButton}
                    >

                        <span
                            style={{
                                fontSize: "20px",
                                lineHeight: "1",
                                marginTop: "-2px"
                            }}
                        >
                            ‹
                        </span>

                        <span>
                            Return Back
                        </span>

                    </button>

                </div>

                <div
                    style={{
                        ...loanStyles.header,
                        marginTop: "20px"
                    }}
                >

                    <div>

                        <div style={commonStyles.eyebrow}>
                            CUSTOMER PORTAL • LOANS
                        </div>

                        <h1 style={loanStyles.title}>
                            My Loan Applications
                        </h1>

                        <p style={loanStyles.subtitle}>
                            {customer
                                ? `${customer.customerName} • Track applications, approved loans, repayments and outstanding balances.`
                                : "Track applications, approved loans, repayments and outstanding balances."}
                        </p>

                    </div>

                    <button
                        style={loanStyles.primaryButton}
                        onClick={() =>
                            navigate("/loan-list")
                        }
                    >
                        Browse Loans
                    </button>

                </div>

                {error && (
                    <div
                        style={{
                            ...loanStyles.alert,
                            background: "#FEF2F2",
                            color: "#B91C1C",
                            border: "1px solid #FECACA"
                        }}
                    >
                        {error}
                    </div>
                )}

                <div style={loanStyles.card}>

                    {loading ? (
                        <div>
                            Loading...
                        </div>
                    ) : applications.length === 0 ? (
                        <div>
                            No loan applications yet.
                            Browse available loans to get started.
                        </div>
                    ) : (
                        <div style={loanStyles.tableWrap}>

                            <table style={loanStyles.table}>

                                <thead>

                                    <tr>

                                        <th style={loanStyles.th}>
                                            Application ID
                                        </th>

                                        <th style={loanStyles.th}>
                                            Loan Scheme
                                        </th>

                                        <th style={loanStyles.th}>
                                            Loan Amount
                                        </th>

                                        <th style={loanStyles.th}>
                                            EMI
                                        </th>

                                        <th style={loanStyles.th}>
                                            Paid Amount
                                        </th>

                                        <th style={loanStyles.th}>
                                            Outstanding
                                        </th>

                                        <th style={loanStyles.th}>
                                            Application Status
                                        </th>

                                        <th style={loanStyles.th}>
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {applications.map((a) => (

                                        <tr key={a.applicationId}>

                                            <td style={loanStyles.td}>
                                                <strong>
                                                    {a.applicationId}
                                                </strong>
                                            </td>

                                            <td style={loanStyles.td}>
                                                {a.loanId}
                                            </td>

                                            <td style={loanStyles.td}>
                                                {money(
                                                    a.loanAmount
                                                )}
                                            </td>

                                            <td style={loanStyles.td}>
                                                {money(
                                                    a.emiPayable
                                                )}
                                            </td>

                                            <td style={loanStyles.td}>
                                                {money(
                                                    a.paidAmount
                                                )}
                                            </td>

                                            <td style={loanStyles.td}>
                                                <strong>
                                                    {money(
                                                        a.outstandingAmount
                                                    )}
                                                </strong>
                                            </td>

                                            <td style={loanStyles.td}>

                                                <span
                                                    style={{
                                                        ...loanStyles.status,
                                                        ...pillStyle(
                                                            a.applicationStatus
                                                        )
                                                    }}
                                                >
                                                    {a.applicationStatus}
                                                </span>

                                            </td>

                                            <td style={loanStyles.td}>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: "8px",
                                                        flexWrap: "wrap"
                                                    }}
                                                >

                                                    <button
                                                        style={
                                                            loanStyles.secondaryButton
                                                        }
                                                        onClick={() =>
                                                            setSelected(a)
                                                        }
                                                    >
                                                        View Report
                                                    </button>

                                                    {a.applicationStatus ===
                                                        "APPROVED" &&
                                                        a.outstandingAmount >
                                                        0 && (
                                                            <button
                                                                style={
                                                                    loanStyles.primaryButton
                                                                }
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/loan-repayment/${a.applicationId}`
                                                                    )
                                                                }
                                                            >
                                                                Make Repayment
                                                            </button>
                                                        )}

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>
                    )}

                </div>

            </Container>

            {/* CUSTOMER LOAN APPLICATION REPORT */}

            {selected && (

                <div style={loanStyles.modalOverlay}>

                    <div
                        style={
                            loanStyles.detailView.detailsModal
                        }
                    >

                        <div
                            style={
                                loanStyles.detailView.modalHeader
                            }
                        >

                            <div>

                                <div
                                    style={
                                        commonStyles.eyebrow
                                    }
                                >
                                    CUSTOMER LOAN APPLICATION REPORT
                                </div>

                                <h2
                                    style={
                                        loanStyles.detailView.modalTitle
                                    }
                                >
                                    {selected.applicationId}
                                </h2>

                            </div>

                            <button
                                style={
                                    loanStyles.detailView.close
                                }
                                onClick={() =>
                                    setSelected(null)
                                }
                            >
                                ×
                            </button>

                        </div>

                        <div
                            style={
                                loanStyles.detailView.detailsBox
                            }
                        >

                            {detailRow(
                                "Application ID",
                                selected.applicationId
                            )}

                            {detailRow(
                                "Customer ID",
                                selected.customerId
                            )}

                            {detailRow(
                                "Customer Name",
                                customer?.customerName
                            )}

                            {detailRow(
                                "Loan Scheme",
                                selected.loanId
                            )}

                            {detailRow(
                                "Loan Amount",
                                money(selected.loanAmount)
                            )}

                            {detailRow(
                                "Interest Rate",
                                selected.interestRate
                                    ? `${selected.interestRate}%`
                                    : "—"
                            )}

                            {detailRow(
                                "Loan Tenure",
                                selected.loanTenure
                                    ? `${selected.loanTenure} ${
                                        Number(selected.loanTenure) === 1
                                            ? "year"
                                            : "years"
                                    }`
                                    : "—"
                            )}

                            {detailRow(
                                "EMI",
                                money(selected.emiPayable)
                            )}

                            {detailRow(
                                "Tenures Paid",
                                `${Math.min(
                                    Number(selected.paidTenure || 0),
                                    Number(selected.totalTenure || 0)
                                )} / ${
                                    selected.totalTenure || 0
                                }`
                            )}

                            {detailRow(
                                "Total Interest",
                                money(selected.totalInterestPayable)
                            )}

                            {detailRow(
                                "Total Cost",
                                money(selected.totalCost)
                            )}

                            {detailRow(
                                "Paid Amount",
                                money(selected.paidAmount)
                            )}

                            {detailRow(
                                "Outstanding Amount",
                                money(selected.outstandingAmount)
                            )}

                            {detailRow(
                                "Application Date",
                                selected.applicationDate || "—"
                            )}

                            {detailRow(
                                "Review Date",
                                selected.reviewedDate ||
                                "Not reviewed yet"
                            )}

                            {detailRow(
                                "Application Status",
                                selected.applicationStatus
                            )}

                            {detailRow(
                                "Rejected Reason",
                                selected.rejectionReason || "—"
                            )}

                            {detailRow(
                                "Loan Account Number",
                                selected.paymentAccountNumber ||
                                "Created after approval"
                            )}

                            {detailRow(
                                "Closed Date",
                                selected.applicationStatus === "CLOSED"
                                    ? formatDate(selected.closedDate)
                                    : "—"
                            )}

                        </div>

                        <div
                            style={
                                loanStyles.detailView.actions
                            }
                        >

                            <button
                                style={
                                    loanStyles.secondaryButton
                                }
                                onClick={() =>
                                    setSelected(null)
                                }
                            >
                                Return Back
                            </button>

                            {selected.applicationStatus ===
                                "APPROVED" &&
                                selected.outstandingAmount > 0 && (

                                    <button
                                        style={
                                            loanStyles.primaryButton
                                        }
                                        onClick={() => {

                                            setSelected(null);

                                            navigate(
                                                `/loan-repayment/${selected.applicationId}`
                                            );

                                        }}
                                    >
                                        Make Repayment
                                    </button>

                                )}

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default LoanApplications;