import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCustomerByUsername } from "../../Services/CustomerService";
import { getLoanApplicationsByCustomer } from "../../Services/LoanService";
import { commonStyles, layoutStyles } from "../../styles";
import loanStyles from "../../styles/loanStyles";
import logo from "../../assets/logo.png";

const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

const pillStyle = (status) =>
  status === "APPROVED"
    ? { background: "#ECFDF5", color: "#047857" }
    : status === "PENDING"
      ? { background: "#FFF7ED", color: "#C2410C" }
      : status === "REJECTED"
        ? { background: "#FEF2F2", color: "#B91C1C" }
        : { background: "#F1F5F9", color: "#475569" };

const detailRow = (label, value) => (
  <div style={loanStyles.detailView.row} key={label}>
    <strong style={loanStyles.detailView.label}>{label}</strong>
    <span style={loanStyles.detailView.value}>{value ?? "—"}</span>
  </div>
);

const LoanApplications = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const c = await getCustomerByUsername();
      setCustomer(c.data);
      const response = await getLoanApplicationsByCustomer(
        c.data.customerId,
      );
      setApplications(Array.isArray(response.data) ? response.data : []);
    } catch (e) {
      setError(
        e.response?.data?.message || "Unable to load your applications.",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

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
            onClick={() => navigate("/customer-menu")}
            style={loanStyles.backButton}
          >
            <span
              style={{ fontSize: "20px", lineHeight: "1", marginTop: "-2px" }}
            >
              ‹
            </span>
            <span>Return Back</span>
          </button>
        </div>
        <div style={{ ...loanStyles.header, marginTop: "20px" }}>
          <div>
            <div style={commonStyles.eyebrow}>CUSTOMER PORTAL • LOANS</div>
            <h1 style={loanStyles.title}>My Loan Applications</h1>
            <p style={loanStyles.subtitle}>
              {customer
                ? `${customer.customerName} • Track applications, approved loans, repayments and outstanding balances.`
                : "Track applications, approved loans, repayments and outstanding balances."}
            </p>
          </div>
          <button
            style={loanStyles.primaryButton}
            onClick={() => navigate("/loan-list")}
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
              border: "1px solid #FECACA",
            }}
          >
            {error}
          </div>
        )}
        <div style={loanStyles.card}>
          {loading ? (
            <div>Loading...</div>
          ) : applications.length === 0 ? (
            <div>
              No loan applications yet. Browse available loans to get started.
            </div>
          ) : (
            <div style={loanStyles.tableWrap}>
              <table style={loanStyles.table}>
                <thead>
                  <tr>
                    <th style={loanStyles.th}>Application ID</th>
                    <th style={loanStyles.th}>Loan Scheme</th>
                    <th style={loanStyles.th}>Loan Amount</th>
                    <th style={loanStyles.th}>EMI</th>
                    <th style={loanStyles.th}>Paid Amount</th>
                    <th style={loanStyles.th}>Outstanding</th>
                    <th style={loanStyles.th}>Application Status</th>
                    <th style={loanStyles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((a) => (
                    <tr key={a.applicationId}>
                      <td style={loanStyles.td}>
                        <strong>{a.applicationId}</strong>
                      </td>
                      <td style={loanStyles.td}>{a.loanId}</td>
                      <td style={loanStyles.td}>{money(a.loanAmount)}</td>
                      <td style={loanStyles.td}>{money(a.emiPayable)}</td>
                      <td style={loanStyles.td}>{money(a.paidAmount)}</td>
                      <td style={loanStyles.td}>
                        <strong>{money(a.outstandingAmount)}</strong>
                      </td>
                      <td style={loanStyles.td}>
                        <span
                          style={{
                            ...loanStyles.status,
                            ...pillStyle(a.applicationStatus),
                          }}
                        >
                          {a.applicationStatus}
                        </span>
                      </td>
                      <td style={loanStyles.td}>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          <button
                            style={loanStyles.secondaryButton}
                            onClick={() => setSelected(a)}
                          >
                            View Report
                          </button>
                          {a.applicationStatus === "APPROVED" &&
                            a.outstandingAmount > 0 && (
                              <button
                                style={loanStyles.primaryButton}
                                onClick={() =>
                                  navigate(`/loan-repayment/${a.applicationId}`)
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
          <div style={loanStyles.detailView.detailsModal}>
            <div style={loanStyles.detailView.modalHeader}>
              <div>
                <div style={commonStyles.eyebrow}>CUSTOMER LOAN APPLICATION REPORT</div>
                <h2 style={loanStyles.detailView.modalTitle}>{selected.applicationId}</h2>
              </div>
              <button
                style={loanStyles.detailView.close}
                onClick={() => setSelected(null)}
              >
                ×
              </button>
            </div>

            <div style={loanStyles.detailView.detailsBox}>
              {detailRow("Application ID", selected.applicationId)}
              {detailRow("Customer ID", selected.customerId)}
              {detailRow("Customer Name", customer?.customerName)}
              {detailRow("Loan Scheme", selected.loanId)}
              {detailRow("Loan Amount", money(selected.loanAmount))}
              {detailRow(
                "Interest Rate",
                selected.interestRate ? `${selected.interestRate}%` : "—",
              )}
              {detailRow(
                "Loan Tenure",
                selected.loanTenure
                  ? `${selected.loanTenure} ${Number(selected.loanTenure) === 1 ? "year" : "years"}`
                  : "—",
              )}
              {detailRow("EMI", money(selected.emiPayable))}
              {detailRow("Total Interest", money(selected.totalInterestPayable))}
              {detailRow("Total Cost", money(selected.totalCost))}
              {detailRow("Paid Amount", money(selected.paidAmount))}
              {detailRow("Outstanding Amount", money(selected.outstandingAmount))}
              {detailRow("Application Date", selected.applicationDate || "—")}
              {detailRow("Review Date", selected.reviewedDate || "Not reviewed yet")}
              {detailRow("Application Status", selected.applicationStatus)}
              {detailRow("Rejected Reason", selected.rejectionReason || "—")}
              {detailRow(
                "Loan Account Number",
                selected.paymentAccountNumber || "Created after approval",
              )}
            </div>

            <div style={loanStyles.detailView.actions}>
              <button
                style={loanStyles.secondaryButton}
                onClick={() => setSelected(null)}
              >
                Return Back
              </button>
              {selected.applicationStatus === "APPROVED" &&
                selected.outstandingAmount > 0 && (
                  <button
                    style={loanStyles.primaryButton}
                    onClick={() => {
                      setSelected(null);
                      navigate(`/loan-repayment/${selected.applicationId}`);
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