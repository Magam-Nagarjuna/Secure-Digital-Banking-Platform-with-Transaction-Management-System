import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addAccount, generateAccountNumber } from "../../Services/AccountService";
import { getCustomerByStatus } from "../../Services/CustomerService";
import { accountStyles as as_, formStyles } from "../../styles";
import logo from "../../assets/logo.png";

const INITIAL_ACCOUNT_STATE = {
    customerId: "",
    accountType: "",
    balance: 5000,
};

const SECURITY_POINTS = [
    "Customer verification",
    "Secure account creation",
    "Account details validation",
];

const AccountAdd = () => {

    const navigate = useNavigate();

    const [account, setAccount] = useState(INITIAL_ACCOUNT_STATE);
    const [newAccountNumber, setNewAccountNumber] = useState(0);
    const [openDate, setOpenDate] = useState("");
    const [flag, setFlag] = useState(false);
    const [errors, setErrors] = useState({});
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        loadAccountNumber();
        loadCustomers();
    }, []);

    const loadAccountNumber = () => {
        generateAccountNumber()
            .then((response) => setNewAccountNumber(response.data))
            .catch((error) => console.log("Account Number Error:", error));
    };

    const loadCustomers = () => {
        getCustomerByStatus("A")
            .then((response) => {
                setCustomers(Array.isArray(response.data) ? response.data : []);
            })
            .catch((error) => {
                console.log("Customer Loading Error:", error);
                setCustomers([]);
            });
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        setAccount((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleValidation = (event) => {

        event.preventDefault();

        let tempErrors = {};
        let valid = true;

        if (!account.customerId) {
            tempErrors.customerId = "Customer is required";
            valid = false;
        }

        if (!account.accountType) {
            tempErrors.accountType = "Account Type is required";
            valid = false;
        }

        if (!openDate) {
            tempErrors.accountOpenDate = "Account Open Date is required";
            valid = false;
        }

        setErrors(tempErrors);

        if (valid) {
            saveAccount();
        }
    };

    const saveAccount = () => {

        const newAccount = {
            accountNumber: newAccountNumber,
            customerId: account.customerId,
            accountType: account.accountType,
            balance: account.balance,
            accountOpenDate: openDate,
        };

        addAccount(newAccount)
            .then(() => {
                setFlag(true);
                setAccount(INITIAL_ACCOUNT_STATE);
                setOpenDate("");
                setErrors({});
                loadAccountNumber();
            })
            .catch((error) => {
                console.log("Account Creation Error:", error);
                if (error.response) {
                    alert("Error : " + error.response.data);
                } else {
                    alert("Unable to save account.");
                }
            });
    };

    const clearAll = () => {
        setAccount(INITIAL_ACCOUNT_STATE);
        setOpenDate("");
        setErrors({});
        setFlag(false);
    };

    const returnBack = () => navigate("/admin-menu");

    return (
        <div style={as_.entryPage}>

            {/* ================= HEADER ================= */}
            <header style={as_.entryHeader}>

                <div style={as_.entryLogoRow}>
                    <img src={logo} alt="FinCore Logo" style={{ width: "48px", height: "48px", objectFit: "contain", display: "block" }} />
                    <div>
                        <div style={as_.entryBrandTitle}>FinCore</div>
                        <div style={as_.entryBrandSubtitle}>DIGITAL BANKING</div>
                    </div>
                </div>

                <div style={as_.entryUserArea}>
                    <div style={as_.entrySecureSession}>
                        <span style={as_.entrySecureDot} />
                        Secure session
                    </div>

                    <div style={as_.entryUserRow}>
                        <div style={as_.entryUserAvatar}>N</div>
                        <div>
                            <div style={as_.entryUserName}>Nagarjuna</div>
                            <div style={as_.entryUserRole}>Bank Staff</div>
                        </div>
                    </div>
                </div>

            </header>

            {/* ================= MAIN ================= */}
            <main style={as_.entryMain}>

                <div style={as_.entryBackRow}>
                    <button
                        type="button"
                        onClick={returnBack}
                        style={as_.entryBackButton}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#f1f6fd";
                            e.currentTarget.style.borderColor = "#176fca";
                            e.currentTarget.style.color = "#0862bd";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#ffffff";
                            e.currentTarget.style.borderColor = "#d7e0eb";
                            e.currentTarget.style.color = "#24344d";
                        }}
                    >
                        <span style={{ fontSize: "21px", lineHeight: "1", marginTop: "-2px" }}>←</span>
                        <span>Back to Admin Menu</span>
                    </button>
                </div>

                <div style={as_.entryIntro}>
                    <div style={as_.entryEyebrow}>ACCOUNT MANAGEMENT</div>
                    <h1 style={as_.entryHeading}>Create customer account</h1>
                    <p style={as_.entrySubheading}>
                        Open a new FinCore bank account for an existing customer.
                    </p>
                </div>

                {flag && (
                    <div style={as_.entrySuccessBanner}>
                        <div style={as_.entrySuccessIcon}>✓</div>
                        <div>
                            <div style={as_.entrySuccessTitle}>Account Created Successfully</div>
                            <div style={as_.entrySuccessSubtitle}>
                                The customer account has been created successfully.
                            </div>
                        </div>
                    </div>
                )}

                <div style={as_.entryGrid}>

                    {/* ================= LEFT PANEL ================= */}
                    <div>
                        <div style={as_.entryPromoPanel}>
                            <div style={{ position: "relative", zIndex: 2 }}>
                                <div style={as_.entryPromoBadge}>F</div>
                                <div style={as_.entryPromoEyebrow}>FINCORE BANK</div>
                                <h2 style={as_.entryPromoHeading}>
                                    A better banking
                                    <br />
                                    experience starts here.
                                </h2>
                                <p style={as_.entryPromoText}>
                                    Create and manage customer accounts securely
                                    through the FinCore banking platform.
                                </p>
                            </div>
                            <div style={as_.entryPromoDecoration} />
                        </div>

                        <div style={as_.entrySecurityCard}>
                            {SECURITY_POINTS.map((text, index) => (
                                <div key={text} style={as_.entrySecurityRow(index === SECURITY_POINTS.length - 1)}>
                                    <span style={as_.entrySecurityIcon}>✓</span>
                                    <span style={as_.entrySecurityText}>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ================= RIGHT FORM ================= */}
                    <div style={as_.entryFormCard}>

                        <div style={as_.entryFormHeader}>
                            <div>
                                <div style={as_.entryFormEyebrow}>ACCOUNT DETAILS</div>
                                <h2 style={as_.entryFormTitle}>Account information</h2>
                                <p style={as_.entryFormSubtitle}>
                                    Complete the details below to create the account.
                                </p>
                            </div>
                            <div style={as_.entryFormBadge}>01</div>
                        </div>

                        <form onSubmit={handleValidation}>

                            <div style={as_.entryFieldGroup}>
                                <label style={formStyles.label}>Account number</label>
                                <input type="text" value={newAccountNumber} readOnly style={as_.entryReadOnlyInput} />
                                <div style={as_.entryHelpText}>
                                    This number is generated by the banking system.
                                </div>
                            </div>

                            <div style={as_.entryFieldGroup}>
                                <label style={formStyles.label}>
                                    Customer<span style={formStyles.required}>*</span>
                                </label>
                                <select
                                    name="customerId"
                                    value={account.customerId}
                                    onChange={onChangeHandler}
                                    style={{ ...as_.entryInput, borderColor: errors.customerId ? "#ef4444" : "#dce3ec" }}
                                >
                                    <option value="">Select customer</option>
                                    {customers.map((cust, index) => (
                                        <option key={cust.customerId || index} value={cust.customerId}>
                                            {cust.customerId}{cust.customerName ? ` - ${cust.customerName}` : ""}
                                        </option>
                                    ))}
                                </select>
                                {customers.length === 0 && (
                                    <div style={as_.entryWarningText}>
                                        No active customers found. Please verify that the
                                        customer API is returning customers with status A.
                                    </div>
                                )}
                                {errors.customerId && (
                                    <div style={formStyles.errorText}>{errors.customerId}</div>
                                )}
                            </div>

                            <div style={as_.entryFieldGroup}>
                                <label style={formStyles.label}>
                                    Account type<span style={formStyles.required}>*</span>
                                </label>
                                <select
                                    name="accountType"
                                    value={account.accountType}
                                    onChange={onChangeHandler}
                                    style={{ ...as_.entryInput, borderColor: errors.accountType ? "#ef4444" : "#dce3ec" }}
                                >
                                    <option value="">Select account type</option>
                                    <option value="Savings">Savings Account</option>
                                    <option value="Current">Current Account</option>
                                </select>
                                {errors.accountType && (
                                    <div style={formStyles.errorText}>{errors.accountType}</div>
                                )}
                            </div>

                            <div style={as_.entryFieldGroup}>
                                <label style={formStyles.label}>
                                    Initial balance<span style={formStyles.required}>*</span>
                                </label>
                                <div style={{ position: "relative" }}>
                                    <span style={{ position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)", color: "#64748b", fontWeight: "600" }}>
                                        ₹
                                    </span>
                                    <input
                                        type="number"
                                        name="balance"
                                        value={account.balance}
                                        readOnly
                                        style={{ ...as_.entryReadOnlyInput, paddingLeft: "48px" }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: "30px" }}>
                                <label style={formStyles.label}>
                                    Account open date<span style={formStyles.required}>*</span>
                                </label>
                                <input
                                    type="date"
                                    value={openDate}
                                    onChange={(e) => setOpenDate(e.target.value)}
                                    style={{ ...as_.entryInput, borderColor: errors.accountOpenDate ? "#ef4444" : "#dce3ec" }}
                                />
                                {errors.accountOpenDate && (
                                    <div style={formStyles.errorText}>{errors.accountOpenDate}</div>
                                )}
                            </div>

                            <div style={as_.entryButtonRow}>
                                <button type="button" onClick={clearAll} style={as_.entryResetButton}>
                                    Reset
                                </button>
                                <button type="submit" style={as_.entrySubmitButton}>
                                    Create account →
                                </button>
                            </div>

                            <div style={as_.entrySecureFooter}>
                                🔒 Customer data is handled securely
                            </div>

                        </form>

                    </div>

                </div>

            </main>

        </div>
    );
};

export default AccountAdd;
