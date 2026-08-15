import React, { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getAccountsByCustomerId } from "../../Services/AccountService";
import { getCustomerByUsername } from "../../Services/CustomerService";
import { applyForLoan, getLoanById } from "../../Services/LoanService";
import { commonStyles, layoutStyles } from "../../styles";
import loanStyles from "../../styles/loanStyles";
import logo from "../../assets/logo.png";

const money = (v) =>
  `₹${Number(v || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

const LoanApplication = () => {
  const { loanId } = useParams();
  const navigate = useNavigate();
  const [loan, setLoan] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [savingsAccountNumber, setSavingsAccountNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    Promise.all([getLoanById(loanId), getCustomerByUsername()])
      .then(async ([l, c]) => {
        setLoan(l.data);
        setCustomer(c.data);
        setLoanAmount(l.data.loanAmount || "");
        setLoanTenure(l.data.loanTenure || "");
        const a = await getAccountsByCustomerId(c.data.customerId);
        setAccounts(
          (Array.isArray(a.data) ? a.data : []).filter(
            (x) =>
              x.accountType?.toUpperCase() !== "LOAN" &&
              x.status?.toUpperCase() === "A",
          ),
        );
      })
      .catch((e) =>
        setError(
          e.response?.data?.message ||
            "Unable to prepare the loan application.",
        ),
      )
      .finally(() => setLoading(false));
  }, [loanId]);

  const preview = useMemo(() => {
    const amount = Number(loanAmount),
      months = Number(loanTenure) * 12,
      rate = Number(loan?.interestRate);
    if (!amount || !months || !rate) return null;
    const r = rate / 1200,
      f = Math.pow(1 + r, months),
      emi = (amount * r * f) / (f - 1);
    const total = Math.round(emi * months);
    return { emi: Math.round(emi), interest: total - amount, total };
  }, [loan, loanAmount, loanTenure]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!customer?.customerId)
      return setError(
        "Customer information is not available. Please login again.",
      );
    if (!savingsAccountNumber)
      return setError(
        "Please select an account to receive the approved loan amount.",
      );
    if (Number(loanAmount) < 100000)
      return setError("Minimum loan amount is ₹1,00,000.");
    if (Number(loanTenure) <= 0)
      return setError("Loan tenure should be greater than zero.");
    setSaving(true);
    try {
      const response = await applyForLoan({
        loanId,
        customerId: customer.customerId,
        loanAmount: Number(loanAmount),
        loanTenure: Number(loanTenure),
        savingsAccountNumber: Number(savingsAccountNumber),
      });
      setMessage(
        `Application ${response.data.applicationId} submitted successfully.`,
      );
      setTimeout(() => navigate("/loan-applications"), 900);
    } catch (e) {
      setError(
        e.response?.data?.message || "Unable to submit the application.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div style={loanStyles.page}>Preparing application...</div>;
  if (!loan)
    return (
      <div style={loanStyles.page}>
        <Container>
          <div style={loanStyles.card}>Loan scheme not found.</div>
        </Container>
      </div>
    );

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
                <h2 style={layoutStyles.dashboardBrandTitle}>FinCore Bank</h2>
                <small style={layoutStyles.dashboardBrandSubtitle}>
                  Customer • Loan Application
                </small>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container style={{ paddingTop: 28 }}>
        <div style={loanStyles.backRow}>
          <button
            type="button"
            onClick={() => navigate("/loan-list")}
            style={loanStyles.backButton}
          >
            ‹ <span>Return Back</span>
          </button>
        </div>
        <div style={{ ...loanStyles.header, marginTop: 20 }}>
          <div>
            <div style={commonStyles.eyebrow}>
              CUSTOMER PORTAL • LOAN APPLICATION
            </div>
            <h1 style={loanStyles.title}>Apply for {loan.loanId}</h1>
            <p style={loanStyles.subtitle}>
              Select an existing savings/current account for loan disbursement.
              A separate repayment account will be created only after approval.
            </p>
          </div>
        </div>
        {error && (
          <div
            style={{
              ...loanStyles.alert,
              background: "#FEF2F2",
              color: "#B91C1C",
              border: "1px solid #FECACA",
            }}
          >
            {error}
          </div>
        )}
        {message && (
          <div
            style={{
              ...loanStyles.alert,
              background: "#ECFDF5",
              color: "#047857",
              border: "1px solid #A7F3D0",
            }}
          >
            ✓ {message}
          </div>
        )}
        <div style={loanStyles.card}>
          <h2 style={commonStyles.sectionTitle}>Loan details</h2>
          <p style={commonStyles.sectionSubtitle}>
            The approved loan amount will be credited to the selected existing
            account. A new LOAN account is created for repayment after approval.
          </p>
          <form onSubmit={submit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 18,
              }}
            >
              <div style={loanStyles.field}>
                <label style={loanStyles.label}>Loan Amount</label>
                <input
                  style={loanStyles.input}
                  type="number"
                  min="100000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  required
                />
                <small style={{ color: "#64748B" }}>Minimum ₹1,00,000</small>
              </div>
              <div style={loanStyles.field}>
                <label style={loanStyles.label}>Loan Tenure (Years)</label>
                <input
                  style={loanStyles.input}
                  type="number"
                  min="1"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  required
                />
              </div>
            </div>
            <div style={{ ...loanStyles.field, marginTop: 18 }}>
              <label style={loanStyles.label}>
                Existing Account for Loan Disbursement
              </label>
              <select
                style={loanStyles.input}
                value={savingsAccountNumber}
                onChange={(e) => setSavingsAccountNumber(e.target.value)}
                required
              >
                <option value="">Select account</option>
                {accounts.map((a) => (
                  <option key={a.accountNumber} value={a.accountNumber}>
                    A/C {a.accountNumber} • {a.accountType} • {money(a.balance)}
                  </option>
                ))}
              </select>
              <small style={{ color: "#64748B" }}>
                This existing account receives the approved loan amount. It is
                not the repayment account.
              </small>
            </div>
            {preview && (
              <div style={{ ...loanStyles.metricGrid, marginTop: 22 }}>
                {[
                  ["Interest Rate", `${loan.interestRate}%`],
                  ["Monthly EMI", money(preview.emi)],
                  ["Total Interest", money(preview.interest)],
                  ["Total Cost", money(preview.total)],
                ].map(([label, value]) => (
                  <div style={loanStyles.metric} key={label}>
                    <div style={loanStyles.metricLabel}>{label}</div>
                    <div style={loanStyles.metricValue}>{value}</div>
                  </div>
                ))}
              </div>
            )}
            <div
              style={{
                marginTop: 24,
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
              }}
            >
              <button
                type="button"
                style={loanStyles.secondaryButton}
                onClick={() => navigate("/loan-list")}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={loanStyles.primaryButton}
                disabled={saving}
              >
                {saving ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};
export default LoanApplication;
