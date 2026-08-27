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
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");
        const loanResponse = await getLoanById(loanId);
        const customerResponse = await getCustomerByUsername();
        const loanData = loanResponse?.data;
        const customerData = customerResponse?.data;
        if (!loanData) {
          throw new Error("Loan scheme not found.");
        }
        if (!customerData?.customerId) {
          throw new Error(
            "Customer information is not available. Please login again.",
          );
        }
        setLoan(loanData);
        setCustomer(customerData);
        setLoanAmount(loanData.loanAmount || "");
        setLoanTenure(loanData.loanTenure || "");
        const accountResponse = await getAccountsByCustomerId(
          customerData.customerId,
        );
        const accountData = Array.isArray(accountResponse?.data)
          ? accountResponse.data
          : [];
        const eligibleAccounts = accountData.filter((account) => {
          const type = String(account?.accountType || "").toUpperCase();
          const status = String(account?.status || "").toUpperCase();
          return type !== "LOAN" && status === "A";
        });
        setAccounts(eligibleAccounts);
        if (eligibleAccounts.length === 0) {
          setError(
            "You do not have an active savings/current account available for loan disbursement.",
          );
        }
      } catch (e) {
        console.error("Loan application loading error:", e);
        setError(
          e.response?.data?.message ||
            (typeof e.response?.data === "string" ? e.response.data : null) ||
            e.message ||
            "Unable to prepare the loan application.",
        );
      } finally {
        setLoading(false);
      }
    };
    if (loanId) {
      loadData();
    }
  }, [loanId]);
  const preview = useMemo(() => {
    const amount = Number(loanAmount);
    const years = Number(loanTenure);
    const rate = Number(loan?.interestRate);
    if (!amount || !years || isNaN(rate) || rate < 0) {
      return null;
    }
    /* * Tenure is stored in YEARS. * * 0.5 years = 6 months * 1 year = 12 months * 2 years = 24 months */ const months =
      Math.round(years * 12);
    if (months <= 0) {
      return null;
    }
    const monthlyRate = rate / 1200;
    const emi =
      monthlyRate === 0
        ? amount / months
        : (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);
    const roundedEmi = Math.round(emi);
    const total = Math.round(roundedEmi * months);
    return { months, emi: roundedEmi, interest: total - amount, total };
  }, [loan, loanAmount, loanTenure]);
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!customer?.customerId) {
      setError("Customer information is not available. Please login again.");
      return;
    }
    if (!loanId) {
      setError("Loan scheme was not selected.");
      return;
    }
    const amount = Number(loanAmount);
    const tenure = Number(loanTenure);
    const savingsAccount = Number(savingsAccountNumber);
    if (!amount || amount < 100000) {
      setError("Minimum loan amount is ₹1,00,000.");
      return;
    }
    /* * 0.5 years is valid because it represents 6 months. */ if (
      !tenure ||
      tenure <= 0
    ) {
      setError("Loan tenure should be greater than zero.");
      return;
    }
    if (!savingsAccount) {
      setError("Please select an account to receive the approved loan amount.");
      return;
    }
    const selectedAccount = accounts.find(
      (acc) => Number(acc.accountNumber) === savingsAccount,
    );
    if (!selectedAccount) {
      setError("Please select a valid active savings/current account.");
      return;
    }
    try {
      setSaving(true);
      const payload = {
        loanId,
        customerId: Number(customer.customerId),
        loanAmount: amount,
        loanTenure: tenure,
        savingsAccountNumber: savingsAccount,
      };
      const response = await applyForLoan(payload);
      const applicationId = response.data?.applicationId;
      setMessage(
        applicationId
          ? `Application ${applicationId} submitted successfully.`
          : "Loan application submitted successfully.",
      );
      setTimeout(() => {
        navigate("/loan-applications");
      }, 1000);
    } catch (e) {
      console.error("Loan application submission error:", e);
      setError(
        e.response?.data?.message ||
          (typeof e.response?.data === "string" ? e.response.data : null) ||
          e.message ||
          "Unable to submit the application.",
      );
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return (
      <div style={loanStyles.page}>
        {" "}
        <Container style={{ paddingTop: 50, color: "#64748B" }}>
          {" "}
          Preparing loan application...{" "}
        </Container>{" "}
      </div>
    );
  }
  if (!loan) {
    return (
      <div style={loanStyles.page}>
        {" "}
        <Container style={{ paddingTop: 28 }}>
          {" "}
          <div style={loanStyles.card}> Loan scheme not found. </div>{" "}
        </Container>{" "}
      </div>
    );
  }
  return (
    <div style={loanStyles.page}>
      {" "}
      <div style={layoutStyles.dashboardHeader}>
        {" "}
        <Container>
          {" "}
          <div style={layoutStyles.dashboardHeaderRow}>
            {" "}
            <div style={layoutStyles.dashboardBrandRow}>
              {" "}
              <img
                src={logo}
                alt="FinCore Bank"
                style={layoutStyles.dashboardLogo}
              />{" "}
              <div>
                {" "}
                <h2 style={layoutStyles.dashboardBrandTitle}>
                  {" "}
                  FinCore Bank{" "}
                </h2>{" "}
                <small style={layoutStyles.dashboardBrandSubtitle}>
                  {" "}
                  Customer • Loan Application{" "}
                </small>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </Container>{" "}
      </div>{" "}
      <Container style={{ paddingTop: 28 }}>
        {" "}
        <div style={loanStyles.backRow}>
          {" "}
          <button
            type="button"
            onClick={() => navigate("/loan-list")}
            style={loanStyles.backButton}
            disabled={saving}
          >
            {" "}
            ‹ <span>Return Back</span>{" "}
          </button>{" "}
        </div>{" "}
        <div style={{ ...loanStyles.header, marginTop: 20 }}>
          {" "}
          <div>
            {" "}
            <div style={commonStyles.eyebrow}>
              {" "}
              CUSTOMER PORTAL • LOAN APPLICATION{" "}
            </div>{" "}
            <h1 style={loanStyles.title}> Apply for {loan.loanId} </h1>{" "}
            <p style={loanStyles.subtitle}>
              {" "}
              Select an existing savings/current account for loan disbursement.
              A separate loan payment account will be created only after
              approval.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {error && (
          <div
            style={{
              ...loanStyles.alert,
              background: "#FEF2F2",
              color: "#B91C1C",
              border: "1px solid #FECACA",
              marginBottom: 18,
            }}
          >
            {" "}
            {error}{" "}
          </div>
        )}{" "}
        {message && (
          <div
            style={{
              ...loanStyles.alert,
              background: "#ECFDF5",
              color: "#047857",
              border: "1px solid #A7F3D0",
              marginBottom: 18,
            }}
          >
            {" "}
            ✓ {message}{" "}
          </div>
        )}{" "}
        <div style={loanStyles.card}>
          {" "}
          <h2 style={commonStyles.sectionTitle}> Loan details </h2>{" "}
          <p style={commonStyles.sectionSubtitle}>
            {" "}
            The approved loan amount will be credited to the selected existing
            account. A separate LOAN account will be created for repayments
            after approval.{" "}
          </p>{" "}
          <form onSubmit={submit}>
            {" "}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 18,
              }}
            >
              {" "}
              <div style={loanStyles.field}>
                {" "}
                <label style={loanStyles.label}> Loan Amount </label>{" "}
                <input
                  style={loanStyles.input}
                  type="number"
                  min="100000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  disabled={saving}
                  required
                />{" "}
                <small style={{ color: "#64748B" }}>
                  {" "}
                  Minimum ₹1,00,000{" "}
                </small>{" "}
              </div>{" "}
              <div style={loanStyles.field}>
                {" "}
                <label style={loanStyles.label}>
                  {" "}
                  Loan Tenure (Years){" "}
                </label>{" "}
                <input
                  style={loanStyles.input}
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  disabled={saving}
                  required
                />{" "}
                <small style={{ color: "#64748B" }}>
                  {" "}
                  Minimum 0.5 years (6 months){" "}
                </small>{" "}
              </div>{" "}
            </div>{" "}
            <div style={{ ...loanStyles.field, marginTop: 18 }}>
              {" "}
              <label style={loanStyles.label}>
                {" "}
                Account for Loan Disbursement{" "}
              </label>{" "}
              <select
                style={loanStyles.input}
                value={savingsAccountNumber}
                onChange={(e) => setSavingsAccountNumber(e.target.value)}
                disabled={saving || accounts.length === 0}
                required
              >
                {" "}
                <option value=""> Select account </option>{" "}
                {accounts.map((account) => (
                  <option
                    key={account.accountNumber}
                    value={account.accountNumber}
                  >
                    {" "}
                    A/C {account.accountNumber} • {account.accountType} •{" "}
                    {money(account.balance)}{" "}
                  </option>
                ))}{" "}
              </select>{" "}
              <small style={{ color: "#64748B" }}>
                {" "}
                This account receives the approved loan amount. The separate
                LOAN payment account is created after approval.{" "}
              </small>{" "}
            </div>{" "}
            {preview && (
              <>
                {" "}
                <div
                  style={{
                    marginTop: 26,
                    paddingTop: 22,
                    borderTop: "1px dashed #E2E8F0",
                  }}
                >
                  {" "}
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "#64748B",
                      textTransform: "uppercase",
                      letterSpacing: ".05em",
                    }}
                  >
                    {" "}
                    Loan Summary{" "}
                  </h3>{" "}
                </div>{" "}
                <div style={{ ...loanStyles.metricGrid, marginTop: 14 }}>
                  {" "}
                  {[
                    ["Interest Rate", `${loan.interestRate}%`],
                    ["Total Tenure", `${preview.months} months`],
                    ["Monthly EMI", money(preview.emi)],
                    ["Total Interest", money(preview.interest)],
                    ["Total Cost", money(preview.total)],
                  ].map(([label, value]) => (
                    <div style={loanStyles.metric} key={label}>
                      {" "}
                      <div style={loanStyles.metricLabel}> {label} </div>{" "}
                      <div style={loanStyles.metricValue}> {value} </div>{" "}
                    </div>
                  ))}{" "}
                </div>{" "}
              </>
            )}{" "}
            <div
              style={{
                marginTop: 24,
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
              }}
            >
              {" "}
              <button
                type="button"
                style={loanStyles.secondaryButton}
                onClick={() => navigate("/loan-list")}
                disabled={saving}
              >
                {" "}
                Cancel{" "}
              </button>{" "}
              <button
                type="submit"
                style={loanStyles.primaryButton}
                disabled={saving || accounts.length === 0}
              >
                {" "}
                {saving ? "Submitting..." : "Submit Application"}{" "}
              </button>{" "}
            </div>{" "}
          </form>{" "}
        </div>{" "}
      </Container>{" "}
    </div>
  );
};
export default LoanApplication;
