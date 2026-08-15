import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
    approveLoanApplication,
    getLoanApplicationsByStatus,
    rejectLoanApplication
} from "../../Services/LoanService";
import { commonStyles, layoutStyles } from "../../styles";
import loanStyles from "../../styles/loanStyles";
import logo from "../../assets/logo.png";

const money = value =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
        maximumFractionDigits: 2
    })}`;

const field = (label, value) => (
    <div style={loanStyles.detailView.row} key={label}>
        <strong style={loanStyles.detailView.label}>{label}</strong>
        <span style={loanStyles.detailView.value}>{value ?? "—"}</span>
    </div>
);

const LoanApplicationReview = () => {
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [status, setStatus] = useState("PENDING");
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [approveId, setApproveId] = useState(null);
    const [rejectId, setRejectId] = useState(null);
    const [rejectReason, setRejectReason] = useState("");

    const load = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getLoanApplicationsByStatus(status);
            setApplications(
                Array.isArray(response.data) ? response.data : []
            );
        } catch (e) {
            setError(
                e.response?.data?.message ||
                "Unable to load loan applications."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, [status]);

    const openReject = id => {
        setRejectId(id);
        setRejectReason("Application does not meet current lending criteria");
    };

    const confirmReject = async () => {
        const id = rejectId;
        const reason = rejectReason;
        setRejectId(null);

        try {
            setError("");
            await rejectLoanApplication(id, reason);
            setSelected(null);
            setMessage("Loan application rejected successfully.");
            await load();
        } catch (e) {
            setError(
                e.response?.data?.message ||
                "Unable to reject loan application."
            );
        }
    };

    const confirmApprove = async () => {
        try {
            setError("");

            await approveLoanApplication(approveId);

            setApproveId(null);
            setSelected(null);
            setMessage("Loan application approved successfully.");

            await load();
        } catch (e) {
            setApproveId(null);
            setError(
                e.response?.data?.message ||
                "Unable to approve loan application."
            );
        }
    };

    return (
        <div style={loanStyles.page}>

            {/* HEADER */}
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
                                <h2 style={layoutStyles.dashboardBrandTitle}>
                                    FinCore Bank
                                </h2>

                                <small
                                    style={
                                        layoutStyles.dashboardBrandSubtitle
                                    }
                                >
                                    Admin • Loan Review
                                </small>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <Container style={{ paddingTop: "28px" }}>

                {/* BACK */}
                <div style={loanStyles.backRow}>
                    <button
                        type="button"
                        style={loanStyles.backButton}
                        onClick={() => navigate("/admin-menu")}
                    >
                        ‹ <span>Return Back</span>
                    </button>
                </div>

                {/* PAGE TITLE */}
                <div style={{ ...loanStyles.header, marginTop: "20px" }}>
                    <div>
                        <div style={commonStyles.eyebrow}>
                            ADMIN PORTAL • CREDIT REVIEW
                        </div>

                        <h1 style={loanStyles.title}>
                            Loan Applications
                        </h1>

                        <p style={loanStyles.subtitle}>
                            Review complete customer loan requests and
                            approve or reject applications.
                        </p>
                    </div>

                    <button
                        style={loanStyles.secondaryButton}
                        onClick={load}
                    >
                        Refresh
                    </button>
                </div>

                {/* ALERTS */}
                {error && (
                    <div style={loanStyles.detailView.error}>
                        {error}
                    </div>
                )}

                {message && (
                    <div style={loanStyles.detailView.success}>
                        ✓ {message}
                    </div>
                )}

                {/* STATUS FILTER */}
                <div
                    style={{
                        ...loanStyles.card,
                        marginBottom: "18px"
                    }}
                >
                    <div style={loanStyles.buttonRow}>
                        {[
                            "PENDING",
                            "APPROVED",
                            "REJECTED",
                            "CLOSED"
                        ].map(item => (
                            <button
                                key={item}
                                style={
                                    status === item
                                        ? loanStyles.primaryButton
                                        : loanStyles.secondaryButton
                                }
                                onClick={() => {
                                    setSelected(null);
                                    setMessage("");
                                    setStatus(item);
                                }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* APPLICATION LIST */}
                <div style={loanStyles.card}>

                    {loading ? (
                        <div>Loading applications...</div>
                    ) : applications.length === 0 ? (
                        <div style={loanStyles.detailView.empty}>
                            No {status.toLowerCase()} loan applications found.
                        </div>
                    ) : (
                        <div style={loanStyles.tableWrap}>
                            <table style={loanStyles.table}>
                                <thead>
                                    <tr>
                                        {[
                                            "Application",
                                            "Customer",
                                            "Loan",
                                            "Amount",
                                            "EMI",
                                            "Status",
                                            "Action"
                                        ].map(title => (
                                            <th
                                                key={title}
                                                style={loanStyles.th}
                                            >
                                                {title}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {applications.map(application => (
                                        <tr
                                            key={
                                                application.applicationId
                                            }
                                        >
                                            <td style={loanStyles.td}>
                                                <strong>
                                                    {
                                                        application.applicationId
                                                    }
                                                </strong>
                                            </td>

                                            <td style={loanStyles.td}>
                                                {application.customerId}
                                            </td>

                                            <td style={loanStyles.td}>
                                                {application.loanId}
                                            </td>

                                            <td style={loanStyles.td}>
                                                {money(
                                                    application.loanAmount
                                                )}
                                            </td>

                                            <td style={loanStyles.td}>
                                                {money(
                                                    application.emiPayable
                                                )}
                                            </td>

                                            <td style={loanStyles.td}>
                                                {application.applicationStatus ||
                                                    status}
                                            </td>

                                            <td style={loanStyles.td}>
                                                <button
                                                    style={
                                                        loanStyles.secondaryButton
                                                    }
                                                    onClick={() =>
                                                        setSelected(
                                                            application
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </Container>

            {/* COMPLETE LOAN REQUEST MODAL */}
            {selected && (
                <div style={loanStyles.modalOverlay}>
                    <div style={loanStyles.detailView.detailsModal}>

                        <div style={loanStyles.detailView.modalHeader}>
                            <div>
                                <div style={commonStyles.eyebrow}>
                                    CUSTOMER LOAN REQUEST VIEW
                                </div>

                                <h2 style={loanStyles.detailView.modalTitle}>
                                    Loan Application Details
                                </h2>
                            </div>

                            <button
                                style={loanStyles.detailView.close}
                                onClick={() => setSelected(null)}
                            >
                                ×
                            </button>
                        </div>

                        <div style={loanStyles.detailView.detailsBox}>

                            {field(
                                "Customer Loan Id",
                                selected.applicationId
                            )}

                            {field(
                                "Customer Id",
                                selected.customerId
                            )}

                            {field(
                                "Loan Id",
                                selected.loanId
                            )}

                            {field(
                                "Interest Rate",
                                selected.interestRate
                                    ? `${selected.interestRate}%`
                                    : "—"
                            )}

                            {field(
                                "Loan Amount",
                                money(selected.loanAmount)
                            )}

                            {field(
                                "Total Interest Need to Pay",
                                money(selected.totalInterestPayable)
                            )}

                            {field(
                                "EMI",
                                money(selected.emiPayable)
                            )}

                            {field(
                                "Total Tenures",
                                selected.totalTenure
                            )}

                            {field(
                                "Already Paid Tenures",
                                selected.paidTenure || 0
                            )}

                            {field(
                                "Amount Paid Till Date",
                                money(
                                    selected.paidAmount ??
                                    selected.amountPaidTillDate
                                )
                            )}

                            {field(
                                "Total Amount Need to Pay",
                                money(
                                    selected.totalCost
                                )
                            )}

                            {field(
                                "Saving Account",
                                selected.savingsAccountNumber
                            )}

                            {field(
                                "Loan Payment Account",
                                selected.paymentAccountNumber ||
                                "Created on approval"
                            )}

                            {field(
                                "Loan Date",
                                selected.loanDate ||
                                selected.applicationDate
                            )}

                            {field(
                                "Loan Status",
                                selected.applicationStatus ||
                                selected.status
                            )}

                            {field(
                                "Payment Complete Date",
                                selected.completeDate ||
                                "—"
                            )}

                            {selected.rejectionReason &&
                                field(
                                    "Rejection Reason",
                                    selected.rejectionReason
                                )}

                        </div>

                        {/* ACTIONS */}
                        <div style={loanStyles.detailView.actions}>

                            <button
                                style={loanStyles.secondaryButton}
                                onClick={() => setSelected(null)}
                            >
                                Return Back
                            </button>

                            {status === "PENDING" && (
                                <>
                                    <button
                                        style={loanStyles.dangerButton}
                                        onClick={() =>
                                            openReject(
                                                selected.applicationId
                                            )
                                        }
                                    >
                                        Reject
                                    </button>

                                    <button
                                        style={loanStyles.primaryButton}
                                        onClick={() =>
                                            setApproveId(
                                                selected.applicationId
                                            )
                                        }
                                    >
                                        Approve
                                    </button>
                                </>
                            )}

                            {status === "APPROVED" && (
                                <button
                                    style={loanStyles.primaryButton}
                                    onClick={() =>
                                        navigate(
                                            `/loan-repayment/${selected.applicationId}`
                                        )
                                    }
                                >
                                    Repayment
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            )}

            {/* APPROVAL CONFIRMATION */}
            {approveId && (
                <div style={loanStyles.modalOverlay}>
                    <div style={loanStyles.confirmModal}>

                        <div style={loanStyles.detailView.icon}>✓</div>

                        <h3 style={loanStyles.modalTitle}>
                            Approve Loan Application?
                        </h3>

                        <p style={loanStyles.modalText}>
                            Are you sure you want to approve{" "}
                            <strong>{approveId}</strong>?
                        </p>

                        <p style={loanStyles.detailView.note}>
                            The selected savings account will receive the
                            approved loan amount and the repayment account
                            will be created after approval.
                        </p>

                        <div style={loanStyles.modalActions}>
                            <button
                                style={loanStyles.secondaryButton}
                                onClick={() => setApproveId(null)}
                            >
                                Cancel
                            </button>

                            <button
                                style={loanStyles.primaryButton}
                                onClick={confirmApprove}
                            >
                                Confirm Approval
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* REJECTION REASON */}
            {rejectId && (
                <div style={loanStyles.modalOverlay}>
                    <div style={loanStyles.confirmModal}>

                        <div style={{ ...loanStyles.detailView.icon, background: "#FEF2F2", color: "#B91C1C" }}>
                            ✕
                        </div>

                        <h3 style={loanStyles.modalTitle}>
                            Reject Loan Application?
                        </h3>

                        <p style={loanStyles.modalText}>
                            Enter the reason for rejecting{" "}
                            <strong>{rejectId}</strong>.
                        </p>

                        <textarea
                            value={rejectReason}
                            onChange={e => setRejectReason(e.target.value)}
                            rows={3}
                            style={loanStyles.detailView.textarea}
                            placeholder="Enter rejection reason"
                        />

                        <div style={loanStyles.modalActions}>
                            <button
                                style={loanStyles.secondaryButton}
                                onClick={() => setRejectId(null)}
                            >
                                Cancel
                            </button>

                            <button
                                style={loanStyles.dangerButton}
                                onClick={confirmReject}
                                disabled={!rejectReason.trim()}
                            >
                                Confirm Rejection
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default LoanApplicationReview;