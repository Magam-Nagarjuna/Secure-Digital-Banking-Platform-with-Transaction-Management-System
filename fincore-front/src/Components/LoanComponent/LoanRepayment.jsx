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
  `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

const today = () => {
  const date = new Date();
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).replaceAll("/", "-");
};

const LoanRepayment = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [repayments, setRepayments] = useState([]);
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
        Array.isArray(repaymentResponse.data)
          ? repaymentResponse.data
          : []
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

  if (!application) return;

  const outstanding = Number(application.outstandingAmount || 0);
  const emi = Number(application.emiPayable || 0);

  if (!Number.isFinite(emi) || emi <= 0) {
    setError("The EMI amount is not available for this loan.");
    return;
  }

  if (outstanding <= 0) {
    setError("This loan has no outstanding amount.");
    return;
  }

  const paymentAmount = Math.min(emi, outstanding);

  setSaving(true);

  try {
    const response = await repayLoan(applicationId, {
      paymentAmount,
      paymentMode: "ACCOUNT",
    });

    const data = response.data || {};

    setMessage(
      `Tenure payment successful. ${
        data.repaymentId || ""
      } Remaining outstanding: ${money(
        data.remainingOutstanding
      )}.`
    );

    await load();

  } catch (e) {

    if (e.response?.status === 403) {
      setError("Insufficient Balance");
    } else {
      setError(
        extractError(
          e,
          "Unable to process the tenure payment. Please try again."
        )
      );
    }

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
          color: "#64748B",
          fontSize: "15px",
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
  const emi = Number(application.emiPayable || 0);
  const totalTenure = Number(application.totalTenure || 0);
  const paidTenure = Number(application.paidTenure || 0);
  const payableAmount = Math.min(emi, outstanding);
  const isFinalPayment =
    outstanding > 0 && emi > 0 && outstanding <= emi;

  const showRepaymentForm =
    outstanding > 0 && application.applicationStatus === "APPROVED";

  const loanAccountNumber =
    application.paymentAccountNumber || application.accountNumber;

  const debitAccountNumber = application.savingsAccountNumber;

  return (
    <div style={loanStyles.page}>
      <style>{`
        @keyframes fincore-spin {
          to { transform: rotate(360deg); }
        }

        .fincore-repayment-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          border-bottom: 1px solid #E8EEF5;
          min-height: 44px;
          align-items: center;
        }

        .fincore-repayment-label {
          color: #64748B;
          font-size: 13px;
          font-weight: 700;
        }

        .fincore-repayment-value {
          color: #172033;
          font-size: 14px;
          font-weight: 700;
        }

        @media (max-width: 900px) {
          .fincore-repayment-columns {
            grid-template-columns: 1fr !important;
          }

          .fincore-repayment-row {
            grid-template-columns: 1fr;
            gap: 4px;
            padding: 10px 0;
          }
        }
      `}</style>

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
                <small style={layoutStyles.dashboardBrandSubtitle}>
                  Loan Repayment
                </small>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container style={{ paddingTop: "28px", paddingBottom: "40px" }}>
        <div style={loanStyles.backRow}>
          <button
            type="button"
            onClick={() => navigate("/customer-menu")}
            style={loanStyles.backButton}
          >
            <span style={{ fontSize: "22px", lineHeight: 1 }}>‹</span>
            <span>Return Back</span>
          </button>
        </div>

       
        <div style={{ ...loanStyles.header, marginTop: "10px" }}>
          <div>
            <div style={commonStyles.eyebrow}>
              CUSTOMER PORTAL • REPAYMENT
            </div>

            <h1 style={loanStyles.title}>Loan Repayment</h1>

            <p style={loanStyles.subtitle}>
              Application {application.applicationId} • Debit from savings
              account {debitAccountNumber || "—"}
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

       
        {error && (
          <div
            style={{
              ...loanStyles.alert,
              background: "#FEF2F2",
              color: "#B91C1C",
              border: "1px solid #FECACA",
              display: "flex",
              gap: "10px",
            }}
          >
            <span style={{ fontWeight: 800 }}>!</span>
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
              gap: "10px",
            }}
          >
            <span style={{ fontWeight: 800 }}>✓</span>
            <span>{message}</span>
          </div>
        )}

        <div style={loanStyles.metricGrid}>
          <div style={loanStyles.metric}>
            <div style={loanStyles.metricLabel}>EMI Per Tenure</div>
            <div style={loanStyles.metricValue}>{money(emi)}</div>
          </div>

          <div style={loanStyles.metric}>
            <div style={loanStyles.metricLabel}>Total Tenures</div>
            <div style={loanStyles.metricValue}>{totalTenure}</div>
          </div>

          <div style={loanStyles.metric}>
            <div style={loanStyles.metricLabel}>Already Paid Tenures</div>
            <div style={loanStyles.metricValue}>{paidTenure}</div>
          </div>

          <div style={loanStyles.metric}>
            <div style={loanStyles.metricLabel}>Outstanding Amount</div>
            <div style={loanStyles.metricValue}>
              {money(outstanding)}
            </div>
          </div>

          <div style={loanStyles.metric}>
            <div style={loanStyles.metricLabel}>Tenures Paid</div>
            <div style={loanStyles.metricValue}>
              {paidTenure} / {totalTenure}
            </div>
          </div>
        </div>

       
        {showRepaymentForm && (
          <div
            style={{
              ...loanStyles.card,
              marginBottom: "22px",
              padding: "26px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              <h2
                style={{
                  ...commonStyles.sectionTitle,
                  marginBottom: "6px",
                }}
              >
                Payment Entry
              </h2>

              <div
                style={{
                  width: "42px",
                  height: "3px",
                  borderRadius: "4px",
                  background: "#2563EB",
                  margin: "0 auto",
                }}
              />
            </div>

            <div
              className="fincore-repayment-columns"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "42px",
              }}
            >
             
              <div>
                <div className="fincore-repayment-row">
                  <span className="fincore-repayment-label">Payment ID</span>
                  <span className="fincore-repayment-value">
                    Generated on payment
                  </span>
                </div>

                <div className="fincore-repayment-row">
                  <span className="fincore-repayment-label">
                    Customer Loan ID
                  </span>
                  <span className="fincore-repayment-value">
                    {application.applicationId}
                  </span>
                </div>

                <div className="fincore-repayment-row">
                  <span className="fincore-repayment-label">
                    Customer ID
                  </span>
                  <span className="fincore-repayment-value">
                    {application.customerId}
                  </span>
                </div>

                <div className="fincore-repayment-row">
                  <span className="fincore-repayment-label">Loan ID</span>
                  <span className="fincore-repayment-value">
                    {application.loanId}
                  </span>
                </div>

                <div className="fincore-repayment-row">
                  <span className="fincore-repayment-label">
                    EMI (Per Tenure)
                  </span>
                  <span className="fincore-repayment-value">
                    {money(emi)}
                  </span>
                </div>

                <div className="fincore-repayment-row">
                  <span className="fincore-repayment-label">
                    Total Tenures
                  </span>
                  <span className="fincore-repayment-value">
                    {totalTenure}
                  </span>
                </div>

                <div className="fincore-repayment-row">
                  <span className="fincore-repayment-label">
                    Already Paid Tenures
                  </span>
                  <span className="fincore-repayment-value">
                    {paidTenure}
                  </span>
                </div>

                <div className="fincore-repayment-row">
                  <span className="fincore-repayment-label">
                    Amount Paid Till Date
                  </span>
                  <span className="fincore-repayment-value">
                    {money(application.paidAmount)}
                  </span>
                </div>
              </div>

           
              <div>
                <div className="fincore-repayment-row">
                  <span className="fincore-repayment-label">
                    Outstanding Amount
                  </span>
                  <span className="fincore-repayment-value">
                    {money(outstanding)}
                  </span>
                </div>

                <div className="fincore-repayment-row">
                  <span className="fincore-repayment-label">
                    Loan Payment Account
                  </span>
                  <span className="fincore-repayment-value">
                    {loanAccountNumber || "Not created"}
                    <span
                      style={{
                        display: "block",
                        color: "#64748B",
                        fontSize: "12px",
                        fontWeight: 500,
                        marginTop: "2px",
                      }}
                    >
                      Loan Account
                    </span>
                  </span>
                </div>

                <div className="fincore-repayment-row">
                  <span className="fincore-repayment-label">
                    Debit Account
                  </span>
                  <span className="fincore-repayment-value">
                    {debitAccountNumber || "Not linked"}
                    <span
                      style={{
                        display: "block",
                        color: "#64748B",
                        fontSize: "12px",
                        fontWeight: 500,
                        marginTop: "2px",
                      }}
                    >
                      Savings Account
                    </span>
                  </span>
                </div>

                <div className="fincore-repayment-row">
                  <span className="fincore-repayment-label">
                    Payment Date
                  </span>
                  <span className="fincore-repayment-value">
                    {today()}
                  </span>
                </div>

                
                <div
                  style={{
                    marginTop: "16px",
                    padding: "16px",
                    borderRadius: "10px",
                    background: isFinalPayment ? "#FFF7ED" : "#EFF6FF",
                    border: `1px solid ${
                      isFinalPayment ? "#FED7AA" : "#BFDBFE"
                    }`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        color: "#334155",
                        fontSize: "13px",
                        fontWeight: 800,
                      }}
                    >
                      {isFinalPayment
                        ? "Final Tenure Amount"
                        : "Payable Amount (Next Tenure)"}
                    </span>

                    <span
                      style={{
                        color: isFinalPayment ? "#C2410C" : "#16A34A",
                        fontSize: "24px",
                        fontWeight: 900,
                      }}
                    >
                      {money(payableAmount)}
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: "8px",
                      color: "#64748B",
                      fontSize: "12px",
                      lineHeight: 1.5,
                    }}
                  >
                    {isFinalPayment
                      ? "This is the final outstanding amount. The payment amount is fixed and cannot be edited."
                      : "You are paying for the next tenure. The amount is fixed according to your EMI."}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "24px",
              }}
            >
              <button
                type="button"
                onClick={submit}
                disabled={saving || payableAmount <= 0}
                style={{
                  ...loanStyles.primaryButton,
                  minWidth: "270px",
                  height: "50px",
                  fontSize: "15px",
                  borderRadius: "10px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "9px",
                  opacity: saving ? 0.7 : 1,
                  cursor:
                    saving || payableAmount <= 0
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {saving && (
                  <span
                    style={{
                      width: "14px",
                      height: "14px",
                      border: "2px solid rgba(255,255,255,.4)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "fincore-spin .7s linear infinite",
                    }}
                  />
                )}
                {saving ? "Processing..." : " Pay Tenure Amount"}
              </button>
            </div>
          </div>
        )}

        {/* Closed loan */}
        {application.applicationStatus === "CLOSED" && (
          <div
            style={{
              ...loanStyles.card,
              marginBottom: "22px",
              background: "#ECFDF5",
              border: "1px solid #A7F3D0",
            }}
          >
            <h2
              style={{
                ...commonStyles.sectionTitle,
                color: "#047857",
              }}
            >
              Loan fully repaid
            </h2>
            <p
              style={{
                ...commonStyles.sectionSubtitle,
                marginBottom: 0,
              }}
            >
              This loan has been completely repaid and is now closed.
            </p>
          </div>
        )}

        
        <div style={loanStyles.card}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
              marginBottom: "6px",
            }}
          >
            <div>
              <h2
                style={{
                  ...commonStyles.sectionTitle,
                  marginBottom: "5px",
                }}
              >
                Repayment History
              </h2>
              <p
                style={{
                  ...commonStyles.sectionSubtitle,
                  marginBottom: 0,
                }}
              >
                Every successful payment is recorded against this loan.
              </p>
            </div>
          </div>

          {repayments.length === 0 ? (
            <div
              style={{
                padding: "30px 0",
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
                    <th style={loanStyles.th}>Payment ID</th>
                    <th style={loanStyles.th}>Payment Date</th>
                    <th style={loanStyles.th}>Tenure No.</th>
                    <th style={loanStyles.th}>Amount Paid</th>
                    <th style={loanStyles.th}>Remaining Outstanding</th>
                    <th style={loanStyles.th}>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {repayments.map((repayment, index) => {
                    
                    const tenureNumber = paidTenure - index;

                    return (
                      <tr key={repayment.repaymentId}>
                        <td style={loanStyles.td}>
                          {repayment.repaymentId}
                        </td>

                        <td style={loanStyles.td}>
                          {repayment.paymentDate}
                        </td>

                        <td style={loanStyles.td}>
                          {tenureNumber > 0 ? tenureNumber : "—"}
                        </td>

                        <td
                          style={{
                            ...loanStyles.td,
                            fontWeight: 800,
                          }}
                        >
                          {money(repayment.paymentAmount)}
                        </td>

                        <td style={loanStyles.td}>
                          {money(repayment.remainingOutstanding)}
                        </td>

                        <td style={loanStyles.td}>
                          <span
                            style={{
                              ...loanStyles.status,
                              background: "#ECFDF5",
                              color: "#047857",
                              border: "1px solid #A7F3D0",
                            }}
                          >
                            Success
                          </span>
                        </td>
                      </tr>
                    );
                  })}
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
