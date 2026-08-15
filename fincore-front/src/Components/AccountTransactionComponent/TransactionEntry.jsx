import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  generateTransactionId,
  addTransaction,
} from "../../Services/TransactionService";
import { getAccountIdsByCustomerId } from "../../Services/AccountService";
import { getCustomerByUsername } from "../../Services/CustomerService";
import "../../DisplayView.css";
import logo from "../../assets/logo.png";

const EMPTY_CUSTOMER = {
  customerId: 0,
  customerName: "",
  customerAddress: "",
  dateOfBirth: "",
  dateOfJoin: "",
  email: "",
  username: "",
  status: "",
};

const TransactionEntry = () => {
  const navigate = useNavigate();
  const { tno } = useParams();

  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState(0);

  const [transaction, setTransaction] = useState({
    transactionId: "",
    accountNumber: "",
    customerId: 0,
    transactionAmount: "",
    transactionType: "",
    transactionDate: new Date(),
  });

  const [customer, setCustomer] = useState(EMPTY_CUSTOMER);
  const [newId, setNewId] = useState("");
  const [idList, setIdList] = useState([]);
  const [loading, setLoading] = useState(true);

  const isDeposit = tno === "1";

  useEffect(() => {
    setLoading(true);
    setFlag(0);
    setErrors({});

    getCustomerByUsername()
      .then((res) => {
        setCustomer(res.data);
        return getAccountIdsByCustomerId();
      })
      .then((res) => {
        setIdList(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Customer / Account loading error:", err);
        setIdList([]);
      });

    generateTransactionId()
      .then((res) => setNewId(res.data))
      .catch((err) => console.error("Transaction ID error:", err))
      .finally(() => setLoading(false));
  }, [tno]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFlag(0);
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = (e) => {
    e.preventDefault();

    let tempErrors = {};
    let valid = true;

    if (!transaction.accountNumber) {
      tempErrors.accountNumber = "Please select an account.";
      valid = false;
    }

    if (
      !transaction.transactionAmount ||
      Number(transaction.transactionAmount) <= 0
    ) {
      tempErrors.transactionAmount =
        "Please enter a valid amount greater than ₹0.";
      valid = false;
    }

    if (!customer.customerId) {
      tempErrors.customerId =
        "Customer information is not available. Please login again.";
      valid = false;
    }

    setErrors(tempErrors);

    if (valid) {
      saveTransaction();
    }
  };

  const saveTransaction = () => {
    const newTransaction = {
      ...transaction,
      transactionId: newId,
      customerId: customer.customerId,
      accountNumber: Number(transaction.accountNumber),
      transactionAmount: Number(transaction.transactionAmount),
      transactionType: isDeposit ? "Deposit" : "Withdraw",
      transactionDate: new Date(),
    };

    addTransaction(newTransaction)
      .then((response) => {
        const result = Number(response.data);

        if (result === 2) {
          setFlag(2);
        } else if (result === 1) {
          setFlag(1);
        } else {
          alert("Unexpected response from server: " + response.data);
        }
      })
      .catch((err) => {
        console.error("Transaction Failed:", err);
        setFlag(1);
      });
  };

  const clearAll = () => {
    setTransaction((prev) => ({
      ...prev,
      accountNumber: "",
      transactionAmount: "",
    }));
    setErrors({});
    setFlag(0);
  };

  const returnBack = () => navigate("/customer-menu");

  const displayName = customer.customerName || customer.username || "Customer";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <div className="fin-page">
      {/* ================= TOP HEADER ================= */}
      <header className="fin-header">
        <div
          className="fin-logo-area"
          onClick={() => navigate("/customer-menu")}
          style={{ cursor: "pointer" }}
        >
          <img
            src={logo}
            alt="FinCore"
            className="fin-logo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="fin-brand">
            <div className="fin-brand-name">FinCore</div>
            <div className="fin-brand-subtitle">DIGITAL BANKING</div>
          </div>
        </div>

        <div className="fin-header-right">
          <div className="secure-session">
            <span className="secure-dot"></span>
            <span>Secure session</span>
          </div>

          <div className="user-profile">
            <div className="user-avatar">{userInitial}</div>
            <div className="user-details">
              <strong>{displayName}</strong>
              <span>Customer</span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="fin-main">
        <div className="fin-layout">
          {/* ================= LEFT PANEL ================= */}
          <aside className="fin-sidebar">
            <section className="banking-card">
              <div className="banking-card-top">
                <span className="eyebrow">YOUR BANKING</span>
                <div className="rupee-icon">₹</div>
              </div>
              <h1>Move money</h1>
              <p>
                {isDeposit
                  ? "Deposit funds securely into your FinCore account."
                  : "Withdraw funds securely from your FinCore account."}
              </p>
            </section>

            <section className="info-card">
              <div className="info-icon success">✓</div>
              <div>
                <h3>Secure banking</h3>
                <p>
                  Your transaction is protected by FinCore security controls.
                </p>
              </div>
            </section>

            <section className="info-card help-card">
              <span className="eyebrow blue">NEED HELP?</span>
              <h3>Review before submitting</h3>
              <p>
                Verify your account and transaction amount before continuing.
              </p>
            </section>
          </aside>

          {/* ================= RIGHT FORM ================= */}
          <section className="transaction-card">
            <button type="button" className="back-button" onClick={returnBack}>
              <span className="back-arrow">←</span>
              <span>Back to Customer Menu</span>
            </button>

            <div className="transaction-heading">
              <div>
                <span className="eyebrow blue">TRANSACTION DETAILS</span>
                <h2>{isDeposit ? "Deposit money" : "Withdraw money"}</h2>
                <p>
                  {isDeposit
                    ? "Transfer funds securely into your FinCore account."
                    : "Transfer funds securely from your FinCore account."}
                </p>
              </div>
              <div className="step-number">01</div>
            </div>

            <div className="heading-divider"></div>

            {flag === 2 && (
              <div className="success-alert">
                <div className="alert-icon">✓</div>
                <div>
                  <strong>Transaction successful</strong>
                  <p>
                    Your {isDeposit ? "deposit" : "withdrawal"} has been
                    processed successfully.
                  </p>
                </div>
              </div>
            )}

            {flag === 1 && (
              <div className="danger-alert">
                <div className="alert-icon">!</div>
                <div>
                  <strong>Transaction failed</strong>
                  <p>
                    {isDeposit
                      ? "Unable to complete the deposit. Please try again."
                      : "Insufficient balance. For normal accounts, the applicable minimum-balance rule is enforced. Loan accounts do not require the ₹5,000 minimum balance."}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleValidation} className="transaction-form">
              <div className="form-group">
                <label>
                  Account number<span className="required">*</span>
                </label>
                <select
                  name="accountNumber"
                  className={`fin-input ${errors.accountNumber ? "input-error" : ""}`}
                  value={transaction.accountNumber}
                  onChange={onChangeHandler}
                  disabled={loading}
                >
                  <option value="">
                    {loading
                      ? "Loading accounts..."
                      : idList.length === 0
                        ? "No accounts available"
                        : "Select account"}
                  </option>
                  {idList.map((accountNo) => (
                    <option key={accountNo} value={accountNo}>
                      {accountNo}
                    </option>
                  ))}
                </select>
                {errors.accountNumber && (
                  <span className="error-text">{errors.accountNumber}</span>
                )}
                {!errors.accountNumber && idList.length > 0 && (
                  <span className="field-help">
                    Choose the account for this transaction.
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Transaction ID</label>
                <input
                  type="text"
                  className="fin-input readonly-input"
                  value={newId}
                  readOnly
                />
                <span className="field-help">
                  This ID is generated automatically by FinCore.
                </span>
              </div>

              <div className="form-group">
                <label>Customer ID</label>
                <input
                  type="text"
                  className={`fin-input readonly-input ${errors.customerId ? "input-error" : ""}`}
                  value={customer.customerId || ""}
                  readOnly
                />
                {errors.customerId ? (
                  <span className="error-text">{errors.customerId}</span>
                ) : (
                  <span className="field-help">Logged-in customer ID.</span>
                )}
              </div>

              <div className="form-group">
                <label>
                  {isDeposit ? "Deposit amount" : "Withdrawal amount"}
                  <span className="required">*</span>
                </label>
                <div className="amount-wrapper">
                  <span className="currency-symbol">₹</span>
                  <input
                    type="number"
                    name="transactionAmount"
                    className={`fin-input amount-input ${errors.transactionAmount ? "input-error" : ""}`}
                    placeholder="0.00"
                    min="1"
                    step="0.01"
                    value={transaction.transactionAmount}
                    onChange={onChangeHandler}
                  />
                </div>
                {errors.transactionAmount && (
                  <span className="error-text">{errors.transactionAmount}</span>
                )}
                {!errors.transactionAmount && (
                  <span className="field-help">
                    Enter the amount in Indian Rupees.
                  </span>
                )}
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="reset-button"
                  onClick={clearAll}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="primary-button"
                  disabled={
                    loading || !customer.customerId || idList.length === 0
                  }
                >
                  <span>{isDeposit ? "Deposit funds" : "Withdraw funds"}</span>
                  <span className="button-arrow">→</span>
                </button>
              </div>
            </form>

            <div className="secure-footer">
              <span className="lock-icon">🔒</span>
              <span>Secure transaction · FinCore Banking</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TransactionEntry;
