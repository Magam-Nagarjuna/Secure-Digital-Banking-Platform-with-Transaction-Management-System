import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addCustomer, generateCustomerId, checkCustomer } from "../../Services/CustomerService";
import Modal from "../common/Modal";
import BackButton from "../common/BackButton";
import { customerStyles as cs, formStyles } from "../../styles";
import "../../DisplayView.css";
import logo from "../../assets/logo.png";

const INITIAL_CUSTOMER_STATE = {
    customerId: 0,
    customerName: "abc",
    customerAddress: "",
    email: "abc",
    dateOfBirth: "",
    dateOfJoin: "",
    username: "abc",
    status: "P",
};

const SECURITY_POINTS = [
    "Secure customer registration",
    "Customer information verification",
    "Admin approval required",
];

const CustomerEntry = () => {

    const navigate = useNavigate();

    const [customer, setCustomer] = useState(INITIAL_CUSTOMER_STATE);
    const [newId, setNewId] = useState(0);
    const [bdate, setBdate] = useState("");
    const [jdate, setJdate] = useState("");
    const [errors, setErrors] = useState({});

    const [modal, setModal] = useState({
        open: false,
        title: "",
        message: "",
        type: "info",
    });

    const [flag, setFlag] = useState(false);

    useEffect(() => {
        customerValidation();
        setCustomerId();
        setFlag(false);
    }, []);

    const customerValidation = () => {
        checkCustomer()
            .then((response) => {
                if (response.data === 0) {
                    setModal({
                        open: true,
                        title: "Notice",
                        message: "Customer already exists.",
                        type: "info",
                    });
                }
            })
            .catch((error) => console.log("Customer validation error:", error));
    };

    const setCustomerId = () => {
        generateCustomerId()
            .then((response) => setNewId(response.data))
            .catch((error) => console.log("Customer ID generation error:", error));
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        setFlag(false);

        setCustomer((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const saveCustomer = (event) => {

        event.preventDefault();

        const newCustomer = {
            ...customer,
            customerId: newId,
            dateOfBirth: bdate,
            dateOfJoin: jdate,
            status: "P",
        };

        addCustomer(newCustomer)
            .then(() => {
                setFlag(true);
                setErrors({});
                setCustomer({ ...INITIAL_CUSTOMER_STATE, customerId: newId });
                setBdate("");
                setJdate("");
            })
            .catch((error) => {
                console.log("Customer creation error:", error);
                setModal({
                    open: true,
                    title: "Request Failed",
                    message: error.response?.data || "Unable to submit customer request.",
                    type: "error",
                });
            });
    };

    const handleValidation = (event) => {

        event.preventDefault();

        let tempErrors = {};
        let isValid = true;

        if (!customer.customerAddress || !customer.customerAddress.trim()) {
            tempErrors.customerAddress = "Customer address is required";
            isValid = false;
        }

        if (!bdate) {
            tempErrors.dateOfBirth = "Date of birth is required";
            isValid = false;
        }

        if (!jdate) {
            tempErrors.dateOfJoin = "Date of joining is required";
            isValid = false;
        }

        setErrors(tempErrors);

        if (isValid) {
            saveCustomer(event);
        }
    };

    const clearAll = () => {
        setCustomer(INITIAL_CUSTOMER_STATE);
        setBdate("");
        setJdate("");
        setErrors({});
        setFlag(false);
    };

    const returnBack = () => navigate("/customer-menu");

    const closeModal = () => {
        setModal({ ...modal, open: false });
        navigate("/customer-menu");
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f4f7fb", fontFamily: "Inter, Arial, Helvetica, sans-serif" }}>

            {/* ================= HEADER ================= */}
            <header style={cs.entryHeader}>

                <div style={cs.entryLogoRow}>
                    <img src={logo} alt="FinCore Logo" style={{ width: "48px", height: "48px", objectFit: "contain", display: "block" }} />
                    <div>
                        <div style={cs.entryBrandTitle}>FinCore</div>
                        <div style={cs.entryBrandSubtitle}>DIGITAL BANKING</div>
                    </div>
                </div>

                <div style={cs.entrySecureSession}>
                    <span style={cs.entrySecureDot} />
                    Secure session
                </div>

            </header>

            {/* ================= MAIN ================= */}
            <main style={cs.entryMain}>

                <div style={{ marginBottom: "22px" }}>
                    <BackButton onClick={returnBack} />
                </div>

                <div style={cs.entryIntro}>
                    <div style={cs.entryEyebrow}>CUSTOMER MANAGEMENT</div>
                    <h1 style={cs.entryHeading}>New customer request</h1>
                    <p style={cs.entrySubheading}>
                        Submit your customer information for FinCore Bank approval.
                    </p>
                </div>

                {flag && (
                    <div style={cs.entrySuccessBanner}>
                        <div style={cs.entrySuccessIcon}>✓</div>
                        <div>
                            <div style={cs.entrySuccessTitle}>Request submitted successfully</div>
                            <div style={cs.entrySuccessSubtitle}>
                                Your customer registration is waiting for admin approval.
                            </div>
                        </div>
                    </div>
                )}

                <div style={cs.entryGrid}>

                    {/* ================= LEFT PANEL ================= */}
                    <div>
                        <div style={cs.entryPromoPanel}>
                            <div style={{ position: "relative", zIndex: 2 }}>
                                <div style={cs.entryPromoBadge}>
                                    <img src={logo} alt="FinCore" style={{ width: "42px", height: "42px", objectFit: "contain" }} />
                                </div>
                                <div style={cs.entryPromoEyebrow}>FINCORE BANK</div>
                                <h2 style={cs.entryPromoHeading}>
                                    Your banking
                                    <br />
                                    journey starts here.
                                </h2>
                                <p style={cs.entryPromoText}>
                                    Submit your details securely. Once reviewed
                                    and approved, you can start using FinCore
                                    banking services.
                                </p>
                            </div>
                            <div style={cs.entryPromoDecoration} />
                        </div>

                        <div style={cs.entrySecurityCard}>
                            {SECURITY_POINTS.map((text, index) => (
                                <div key={text} style={cs.entrySecurityRow(index === SECURITY_POINTS.length - 1)}>
                                    <span style={cs.entrySecurityIcon}>✓</span>
                                    <span style={cs.entrySecurityText}>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ================= RIGHT FORM ================= */}
                    <div style={cs.entryFormCard}>

                        <div style={cs.entryFormHeader}>
                            <div>
                                <div style={cs.entryFormEyebrow}>CUSTOMER DETAILS</div>
                                <h2 style={cs.entryFormTitle}>Registration information</h2>
                                <p style={cs.entryFormSubtitle}>Complete the required details below.</p>
                            </div>
                            <div style={cs.entryFormBadge}>01</div>
                        </div>

                        <form onSubmit={handleValidation}>

                            <div style={cs.entryFieldGroup}>
                                <label style={formStyles.label}>Customer ID</label>
                                <input type="text" value={newId} readOnly style={cs.entryReadOnlyInput} />
                                <div style={cs.entryHelpText}>
                                    This ID is generated automatically by FinCore.
                                </div>
                            </div>

                            <div style={cs.entryFieldGroup}>
                                <label style={formStyles.label}>
                                    Customer address<span style={formStyles.required}>*</span>
                                </label>
                                <textarea
                                    name="customerAddress"
                                    placeholder="Enter complete customer address"
                                    value={customer.customerAddress}
                                    onChange={onChangeHandler}
                                    rows="4"
                                    style={{
                                        ...cs.entryInput,
                                        height: "auto",
                                        minHeight: "105px",
                                        padding: "14px 16px",
                                        resize: "vertical",
                                        borderColor: errors.customerAddress ? "#ef4444" : "#dce3ec",
                                    }}
                                />
                                {errors.customerAddress && (
                                    <div style={formStyles.errorText}>{errors.customerAddress}</div>
                                )}
                            </div>

                            <div style={cs.entryDateGrid}>

                                <div>
                                    <label style={formStyles.label}>
                                        Date of birth<span style={formStyles.required}>*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={bdate}
                                        onChange={(e) => {
                                            setBdate(e.target.value);
                                            setErrors((prev) => ({ ...prev, dateOfBirth: "" }));
                                        }}
                                        style={{ ...cs.entryInput, borderColor: errors.dateOfBirth ? "#ef4444" : "#dce3ec" }}
                                    />
                                    {errors.dateOfBirth && (
                                        <div style={formStyles.errorText}>{errors.dateOfBirth}</div>
                                    )}
                                </div>

                                <div>
                                    <label style={formStyles.label}>
                                        Registration date<span style={formStyles.required}>*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={jdate}
                                        onChange={(e) => {
                                            setJdate(e.target.value);
                                            setErrors((prev) => ({ ...prev, dateOfJoin: "" }));
                                        }}
                                        style={{ ...cs.entryInput, borderColor: errors.dateOfJoin ? "#ef4444" : "#dce3ec" }}
                                    />
                                    {errors.dateOfJoin && (
                                        <div style={formStyles.errorText}>{errors.dateOfJoin}</div>
                                    )}
                                </div>

                            </div>

                            <div style={cs.entryStatusBox}>
                                <span style={cs.entryStatusDot} />
                                <div>
                                    <div style={cs.entryStatusTitle}>Approval status</div>
                                    <div style={cs.entryStatusText}>
                                        Your request will remain pending until reviewed
                                        by an administrator.
                                    </div>
                                </div>
                            </div>

                            <div style={cs.entryButtonRow}>
                                <button type="button" onClick={clearAll} style={cs.entryResetButton}>
                                    Reset
                                </button>
                                <button type="submit" style={cs.entrySubmitButton}>
                                    Submit request →
                                </button>
                            </div>

                            <div style={cs.entrySecureFooter}>
                                🔒 Your customer information is handled securely
                            </div>

                        </form>

                    </div>

                </div>

            </main>

            <Modal
                open={modal.open}
                title={modal.title}
                message={modal.message}
                type={modal.type}
                onClose={closeModal}
            />

        </div>
    );
};

export default CustomerEntry;
