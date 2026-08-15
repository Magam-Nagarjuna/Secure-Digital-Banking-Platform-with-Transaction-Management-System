import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {
    deleteLoanById,
    getActiveLoans,
    getLoans
} from "../../Services/LoanService";

import { getRole } from "../../utils/storage";
import logo from "../../assets/logo.png";
import loanStyles from "../../styles/loanStyles";
import ConfirmDialog from "../common/ConfirmDialog";
import Modal from "../common/Modal";

const money = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
        maximumFractionDigits: 2
    })}`;

const StatusPill = ({ status }) => {
    const value = String(status || "").toUpperCase();
    const active = value === "ACTIVE" || value === "A";

    return (
        <span
            style={{
                ...loanStyles.status,
                background: active ? "#ECFDF5" : "#F1F5F9",
                color: active ? "#047857" : "#475569"
            }}
        >
            {active ? "ACTIVE" : value === "I" ? "INACTIVE" : value || "UNKNOWN"}
        </span>
    );
};

const LoanList = () => {
    const navigate = useNavigate();
    const isAdmin = String(getRole() || "").toLowerCase().includes("admin");

    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [errorModal, setErrorModal] = useState({ open: false, message: "" });

    const returnBack = () =>
        navigate(isAdmin ? "/admin-menu" : "/customer-menu");

    const loadLoans = async () => {
        setLoading(true);
        setError("");

        try {
            const response = isAdmin
                ? await getLoans()
                : await getActiveLoans();

            setLoans(Array.isArray(response?.data) ? response.data : []);
        } catch (e) {
            setError(
                e?.response?.data?.message ||
                "Unable to load loan schemes."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLoans();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = (loanId) => setDeleteTarget(loanId);

    const confirmDelete = async () => {
        const loanId = deleteTarget;
        setDeleteTarget(null);
        try {
            await deleteLoanById(loanId);
            await loadLoans();
        } catch (e) {
            setErrorModal({
                open: true,
                message:
                    e?.response?.data?.message ||
                    "Unable to delete loan scheme."
            });
        }
    };

    const handleApply = (loanId) =>
        navigate(`/loan-apply/${loanId}`);

    const handleEdit = (loanId) =>
        navigate(`/loan-edit/${loanId}`);

    const activeCount = loans.filter(
        (loan) =>
            loan.loanStatus === "A" ||
            String(loan.loanStatus).toUpperCase() === "ACTIVE"
    ).length;

    return (
        <div style={loanStyles.page}>

            {/* Header */}
            <div
                style={{
                    background: "#FFFFFF",
                    borderBottom: "1px solid #E5E7EB",
                    padding: "22px 0"
                }}
            >
                <Container>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px"
                        }}
                    >
                        <img
                            src={logo}
                            alt="FinCore Bank"
                            style={{
                                width: "58px",
                                height: "58px",
                                objectFit: "contain"
                            }}
                        />

                        <div>
                            <h2
                                style={{
                                    margin: 0,
                                    color: "#16233B",
                                    fontSize: "30px",
                                    fontWeight: 800
                                }}
                            >
                                FinCore Bank
                            </h2>

                            <div
                                style={{
                                    marginTop: "2px",
                                    color: "#64748B",
                                    fontSize: "15px"
                                }}
                            >
                                {isAdmin ? "Admin • Loans" : "Customer • Loans"}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <Container style={{ paddingTop: "30px" }}>

                {/* Back */}
                <div style={loanStyles.backRow}>
                    <button
                        type="button"
                        onClick={returnBack}
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
                        <span>Return Back</span>
                    </button>
                </div>

                {/* Page heading */}
                <div style={loanStyles.header}>
                    <div>
                        <div
                            style={{
                                color: "#2563EB",
                                fontSize: "12px",
                                fontWeight: 800,
                                letterSpacing: "0.08em",
                                marginBottom: "8px"
                            }}
                        >
                            {isAdmin ? "ADMIN PORTAL" : "CUSTOMER PORTAL"}
                        </div>

                        <h1 style={loanStyles.title}>
                            {isAdmin ? "Loan Schemes" : "Available Loans"}
                        </h1>

                        <p style={loanStyles.subtitle}>
                            {isAdmin
                                ? "Create, maintain and monitor loan products."
                                : "Explore active loan products and choose the one that suits your needs."}
                        </p>
                    </div>

                    <div style={loanStyles.buttonRow}>
                        <button
                            type="button"
                            style={loanStyles.secondaryButton}
                            onClick={loadLoans}
                        >
                            Refresh
                        </button>

                        {isAdmin && (
                            <button
                                type="button"
                                style={loanStyles.primaryButton}
                                onClick={() => navigate("/loan-add")}
                            >
                                + Add Loan Scheme
                            </button>
                        )}
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div
                        style={{
                            ...loanStyles.alert,
                            background: "#FEF2F2",
                            border: "1px solid #FECACA",
                            color: "#B91C1C"
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* Admin metrics */}
                {isAdmin && (
                    <div style={loanStyles.metricGrid}>
                        <div style={loanStyles.metric}>
                            <div style={loanStyles.metricLabel}>
                                Total Schemes
                            </div>
                            <div style={loanStyles.metricValue}>
                                {loans.length}
                            </div>
                        </div>

                        <div style={loanStyles.metric}>
                            <div style={loanStyles.metricLabel}>
                                Active
                            </div>
                            <div style={loanStyles.metricValue}>
                                {activeCount}
                            </div>
                        </div>

                        <div style={loanStyles.metric}>
                            <div style={loanStyles.metricLabel}>
                                Inactive
                            </div>
                            <div style={loanStyles.metricValue}>
                                {loans.length - activeCount}
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div style={loanStyles.card}>
                        Loading loan schemes...
                    </div>
                )}

                {/* Empty */}
                {!loading && loans.length === 0 && (
                    <div style={loanStyles.card}>
                        <div
                            style={{
                                fontSize: "18px",
                                fontWeight: 700,
                                color: "#16233B"
                            }}
                        >
                            No loan schemes available
                        </div>

                        <div
                            style={{
                                marginTop: "6px",
                                color: "#64748B",
                                fontSize: "14px"
                            }}
                        >
                            {isAdmin
                                ? "Create a loan scheme to make it available to customers."
                                : "There are currently no active loan schemes available."}
                        </div>
                    </div>
                )}

                {/* Loan cards */}
                {!loading && loans.length > 0 && (
                    <div style={loanStyles.grid}>
                        {loans.map((loan) => {
                            const loanId = loan.loanId || loan.id;
                            const amount = loan.loanAmount || loan.amount || 0;
                            const interest =
                                loan.interestRate || loan.interest || 0;
                            const tenure =
                                loan.loanTenure || loan.tenure || 0;
                            const emi =
                                loan.emiPayable || loan.emi || 0;
                            const total =
                                loan.totalCost ||
                                loan.totalPayable ||
                                loan.totalRepayment ||
                                0;

                            return (
                                <div
                                    key={loanId}
                                    style={{
                                        ...loanStyles.schemeCard,
                                        gridColumn:
                                            loans.length === 1
                                                ? "1 / -1"
                                                : undefined
                                    }}
                                >
                                    <div style={loanStyles.schemeTop}>
                                        <div>
                                            <h3 style={loanStyles.schemeName}>
                                                {money(amount)} Loan
                                            </h3>

                                            <div style={loanStyles.schemeId}>
                                                {loanId}
                                            </div>
                                        </div>

                                        <StatusPill
                                            status={loan.loanStatus}
                                        />
                                    </div>

                                    <div style={loanStyles.detailGrid}>
                                        <div style={loanStyles.detail}>
                                            <span style={loanStyles.detailLabel}>
                                                Interest
                                            </span>
                                            <strong style={loanStyles.detailValue}>
                                                {interest}% p.a.
                                            </strong>
                                        </div>

                                        <div style={loanStyles.detail}>
                                            <span style={loanStyles.detailLabel}>
                                                Tenure
                                            </span>
                                            <strong style={loanStyles.detailValue}>
                                                {tenure}{" "}
                                                {Number(tenure) === 1
                                                    ? "year"
                                                    : "years"}
                                            </strong>
                                        </div>

                                        <div style={loanStyles.detail}>
                                            <span style={loanStyles.detailLabel}>
                                                EMI
                                            </span>
                                            <strong style={loanStyles.detailValue}>
                                                {money(emi)}
                                            </strong>
                                        </div>

                                        <div style={loanStyles.detail}>
                                            <span style={loanStyles.detailLabel}>
                                                Total Payable
                                            </span>
                                            <strong style={loanStyles.detailValue}>
                                                {money(total)}
                                            </strong>
                                        </div>
                                    </div>

                                    <div style={loanStyles.buttonRow}>
                                        {isAdmin ? (
                                            <>
                                                <button
                                                    type="button"
                                                    style={loanStyles.primaryButton}
                                                    onClick={() =>
                                                        handleEdit(loanId)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    style={loanStyles.dangerButton}
                                                    onClick={() =>
                                                        handleDelete(loanId)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                                
                                            </>
                                        ) : (
                                            <button
                                                type="button"
                                                style={loanStyles.primaryButton}
                                                onClick={() =>
                                                    handleApply(loanId)
                                                }
                                            >
                                                Apply Now
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Container>

            <ConfirmDialog
                open={deleteTarget !== null}
                title="Delete Loan Scheme"
                message={`Are you sure you want to delete loan scheme ${deleteTarget}?`}
                confirmLabel="Delete"
                cancelLabel="Cancel"
                type="error"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteTarget(null)}
            />

            <Modal
                open={errorModal.open}
                title="Notice"
                message={errorModal.message}
                type="error"
                onClose={() => setErrorModal({ open: false, message: "" })}
            />
        </div>
    );
};

export default LoanList;