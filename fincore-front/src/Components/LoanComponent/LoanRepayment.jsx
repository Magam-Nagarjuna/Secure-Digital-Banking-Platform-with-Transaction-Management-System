import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  getLoanApplicationById,
  getLoanRepayments,
  repayLoan,
} from "../../Services/LoanService";
import { commonStyles, layoutStyles } from "../../styles";
import loanStyles from "../../styles/loanStyles";
import logo from "../../assets/logo.png";

const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

const LoanRepayment = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [repayments, setRepayments] = useState([]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const extractError = (e, fallback) => {
    const serverMessage =
      e.response?.data?.message ||
      (typeof e.response?.data === "string" ? e.response.data : "");
    return serverMessage || e.message || fallback;
  };

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [applicationResponse, repaymentResponse] = await Promise.all([
        getLoanApplicationById(applicationId),
        getLoanRepayments(applicationId),
      ]);
      setApplication(applicationResponse.data);
      setRepayments(
        Array.isArray(repaymentResponse.data) ? repaymentResponse.data : [],
      );
    } catch (e) {
      setError(extractError(e, "Unable to load repayment details."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [applicationId]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const payment = Number(amount);
    const outstanding = Number(application?.outstandingAmount || 0);

    if (!amount || !Number.isFinite(payment) || payment <= 0) {
      setError("Enter a valid repayment amount.");
      return;
    }
    if (payment > outstanding) {
      setError("Repayment cannot exceed the outstanding amount.");
      return;
    }

    setSaving(true);
    try {
      const response = await repayLoan(applicationId, {
        paymentAmount: payment,
        paymentMode: "ACCOUNT",
      });
      const data = response.data || {};
      setAmount("");
      setMessage(
        `Loan repayment successful. ${data.repaymentId || ""} Remaining outstanding: ${money(data.remainingOutstanding)}.`,
      );
      await load();
    } catch (e) {
      setError(
        extractError(e, "Unable to process repayment. Please try again."),
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          ...loanStyles.page,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "15px",
          color: "#64748B",
        }}
      >
        Loading repayment details...
      </div>
    );
  }

  if (!application) {
    return (
      <div style={loanStyles.page}>
        <Container>
          <div
            style={{
              ...loanStyles.card,
              marginTop: "40px",
              textAlign: "center",
              padding: "40px",
            }}
          >
            <h2 style={{ marginBottom: "10px", color: "#172033" }}>
              Loan application not found
            </h2>
            <p style={{ marginBottom: "20px", color: "#64748B" }}>
              The requested loan application could not be found.
            </p>
            <button
              type="button"
              onClick={() => navigate("/loan-applications")}
              style={loanStyles.secondaryButton}
            >
              Back to My Loans
            </button>
          </div>
        </Container>
      </div>
    );
  }

  const outstanding = Number(application.outstandingAmount || 0);
  const showRepaymentForm =
    outstanding > 0 && application.applicationStatus === "APPROVED";
  const metrics = [
    { label: "Original Loan", value: application.loanAmount },
    { label: "EMI", value: application.emiPayable },
    { label: "Paid", value: application.paidAmount },
    { label: "Outstanding", value: outstanding },
  ];

  const payDisabled =
    saving || !amount || Number(amount) <= 0 || Number(amount) > outstanding;

  return (
    <div style={loanStyles.page}>
      {/* Spinner keyframes for the Pay Now button */}
      <style>{`
                @keyframes fincore-spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>

      {/* Header */}
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
                <h2 style={layoutStyles.dashboardBrandTitle}>FinCore Bank</h2>
                <small style={layoutStyles.dashboardBrandSubtitle}>
                  Loan Repayment
                </small>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container style={{ paddingTop: "28px", paddingBottom: "40px" }}>
        {/* Return button */}
        <div style={loanStyles.backRow}>
          <button
            type="button"
            onClick={() => navigate("/customer-menu")}
            style={{
              ...loanStyles.backButton,
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <span
              style={{ fontSize: "22px", lineHeight: "1", marginTop: "-2px" }}
            >
              ‹
            </span>
            <span>Return Back</span>
          </button>
        </div>

        {/* Page header */}
        <div style={{ ...loanStyles.header, marginTop: "20px" }}>
          <div>
            <div style={commonStyles.eyebrow}>CUSTOMER PORTAL • REPAYMENT</div>
            <h1 style={loanStyles.title}>Loan Repayment</h1>
            <p style={loanStyles.subtitle}>
              Application {application.applicationId} • Repayment account{" "}
              {application.paymentAccountNumber || application.accountNumber}
            </p>
          </div>
          <button
            type="button"
            style={loanStyles.secondaryButton}
            onClick={() => navigate("/loan-applications")}
          >
            Back to My Loans
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div
            style={{
              ...loanStyles.alert,
              background: "#FEF2F2",
              color: "#B91C1C",
              border: "1px solid #FECACA",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <span style={{ fontWeight: "700" }}>!</span>
            <span>{error}</span>
          </div>
        )}
        {message && (
          <div
            style={{
              ...loanStyles.alert,
              background: "#ECFDF5",
              color: "#047857",
              border: "1px solid #A7F3D0",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <span style={{ fontWeight: "700" }}>✓</span>
            <span>{message}</span>
          </div>
        )}

        {/* Loan metrics */}
        <div style={loanStyles.metricGrid}>
          {metrics.map((m) => (
            <div style={loanStyles.metric} key={m.label}>
              <div style={loanStyles.metricLabel}>{m.label}</div>
              <div style={loanStyles.metricValue}>{money(m.value)}</div>
            </div>
          ))}
        </div>

        {/* Repayment form */}
        {showRepaymentForm && (
          <div style={{ ...loanStyles.card, marginBottom: "22px" }}>
            <h2 style={commonStyles.sectionTitle}>Make a repayment</h2>
            <p style={commonStyles.sectionSubtitle}>
              Payment will be debited from the dedicated loan repayment account.
            </p>
            <form onSubmit={submit}>
              <div style={loanStyles.field}>
                <label style={loanStyles.label}>Payment Amount</label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) auto",
                    gap: "16px",
                    alignItems: "center",
                  }}
                >
                  <input
                    style={{
                      ...loanStyles.input,
                      height: "52px",
                      fontSize: "15px",
                    }}
                    type="number"
                    min="1"
                    max={outstanding}
                    step="0.01"
                    value={amount}
                    placeholder="Enter repayment amount"
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={saving}
                    required
                  />
                  <button
                    type="submit"
                    disabled={payDisabled}
                    style={{
                      ...loanStyles.primaryButton,
                      minWidth: "140px",
                      height: "52px",
                      padding: "0 28px",
                      borderRadius: "10px",
                      fontSize: "15px",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      border: "none",
                      cursor: payDisabled ? "not-allowed" : "pointer",
                      opacity: payDisabled ? 0.6 : 1,
                      transition: "opacity 0.2s ease, transform 0.1s ease",
                    }}
                  >
                    {saving && (
                      <span
                        style={{
                          width: "14px",
                          height: "14px",
                          border: "2px solid rgba(255,255,255,0.4)",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          display: "inline-block",
                          animation: "fincore-spin 0.7s linear infinite",
                        }}
                      />
                    )}
                    {saving ? "Processing..." : "Pay Now"}
                  </button>
                </div>
                <small
                  style={{
                    display: "block",
                    marginTop: "7px",
                    color: "#64748B",
                    fontSize: "12px",
                  }}
                >
                  Maximum repayment: {money(outstanding)}
                </small>
              </div>
            </form>
          </div>
        )}

        {/* Loan closed message */}
        {application.applicationStatus === "CLOSED" && (
          <div
            style={{
              ...loanStyles.card,
              marginBottom: "22px",
              background: "#ECFDF5",
              border: "1px solid #A7F3D0",
            }}
          >
            <h2 style={{ ...commonStyles.sectionTitle, color: "#047857" }}>
              Loan fully repaid
            </h2>
            <p style={{ ...commonStyles.sectionSubtitle, marginBottom: 0 }}>
              This loan has been completely repaid and is now closed.
            </p>
          </div>
        )}

        {/* Repayment history */}
        <div style={loanStyles.card}>
          <h2 style={commonStyles.sectionTitle}>Repayment history</h2>
          <p style={commonStyles.sectionSubtitle}>
            Every successful payment is recorded against this loan.
          </p>

          {repayments.length === 0 ? (
            <div
              style={{
                padding: "24px 0",
                textAlign: "center",
                color: "#64748B",
                fontSize: "14px",
              }}
            >
              No repayments have been recorded yet.
            </div>
          ) : (
            <div style={loanStyles.tableWrap}>
              <table style={loanStyles.table}>
                <thead>
                  <tr>
                    <th style={loanStyles.th}>Repayment ID</th>
                    <th style={loanStyles.th}>Date</th>
                    <th style={loanStyles.th}>Amount</th>
                    <th style={loanStyles.th}>Mode</th>
                    <th style={loanStyles.th}>Remaining</th>
                  </tr>
                </thead>
                <tbody>
                  {repayments.map((repayment) => (
                    <tr key={repayment.repaymentId}>
                      <td style={loanStyles.td}>{repayment.repaymentId}</td>
                      <td style={loanStyles.td}>{repayment.paymentDate}</td>
                      <td style={loanStyles.td}>
                        {money(repayment.paymentAmount)}
                      </td>
                      <td style={loanStyles.td}>{repayment.paymentMode}</td>
                      <td style={loanStyles.td}>
                        {money(repayment.remainingOutstanding)}
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
};

export default LoanRepayment;
