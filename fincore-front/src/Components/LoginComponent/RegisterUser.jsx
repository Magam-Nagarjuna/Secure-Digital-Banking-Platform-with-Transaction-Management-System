import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../../Services/LoginService";
import AppButton from "../common/AppButton";
import AppInput from "../common/AppInput";
import AppSelect from "../common/AppSelect";
import { layoutStyles, loginStyles } from "../../styles";
import { EMAIL_PATTERN } from "../../utils/validators";
import "../../DisplayView.css";
import logo from "../../assets/logo.png";

const SECURITY_POINTS = [
    "Secure registration",
    "Protected account information",
    "FinCore banking access",
];

const EMPTY_USER = {
    username: "",
    password: "",
    personalName: "",
    email: "",
    role: "",
};

const RegisterUser = () => {

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [bankUser, setBankUser] = useState(EMPTY_USER);
    const [flag, setFlag] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    const onChangeHandler = (event) => {

        const { name, value } = event.target;

        setFlag(false);

        setBankUser((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const onConfirmPasswordChange = (event) => {

        setConfirmPassword(event.target.value);
        setFlag(false);

        if (errors.confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        }
    };

    const createNewUser = (event) => {

        event.preventDefault();

        registerNewUser(bankUser)
            .then(() => {
                setFlag(true);
                setBankUser(EMPTY_USER);
                setConfirmPassword("");
                setErrors({});
            })
            .catch((error) => {
                console.log("Registration error:", error);
                setFlag(false);
            });
    };

    const handleValidation = (event) => {

        event.preventDefault();

        let tempErrors = {};
        let isValid = true;

        if (!bankUser.username.trim()) {
            tempErrors.username = "Username is required";
            isValid = false;
        }

        if (!bankUser.password.trim()) {
            tempErrors.password = "Password is required";
            isValid = false;
        } else if (bankUser.password.length < 5 || bankUser.password.length > 10) {
            tempErrors.password = "Password must be between 5 and 10 characters";
            isValid = false;
        }

        if (!confirmPassword.trim()) {
            tempErrors.confirmPassword = "Confirm Password is required";
            isValid = false;
        } else if (bankUser.password !== confirmPassword) {
            tempErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        if (!bankUser.personalName.trim()) {
            tempErrors.personalName = "Full Name is required";
            isValid = false;
        }

        if (!bankUser.email.trim()) {
            tempErrors.email = "Email is required";
            isValid = false;
        } else if (!EMAIL_PATTERN.test(bankUser.email)) {
            tempErrors.email = "Invalid Email Address";
            isValid = false;
        }

        if (!bankUser.role.trim()) {
            tempErrors.role = "Please select a role";
            isValid = false;
        }

        setErrors(tempErrors);

        if (isValid) {
            createNewUser(event);
        }
    };

    const returnBack = () => navigate("/");

    return (
        <div style={layoutStyles.pageShell}>

            {/* ================= HEADER ================= */}
            <header style={layoutStyles.simpleHeader}>

                <div style={layoutStyles.brandRow}>
                    <img src={logo} alt="FinCore Bank" style={layoutStyles.brandLogo} />
                    <div>
                        <div style={layoutStyles.brandTitle}>FinCore</div>
                        <div style={layoutStyles.brandSubtitle}>DIGITAL BANKING</div>
                    </div>
                </div>

                <div style={loginStyles.registerHeaderRow}>
                    <span style={loginStyles.registerHeaderMuted}>
                        Already registered?
                    </span>
                    <button
                        type="button"
                        onClick={returnBack}
                        style={loginStyles.registerSignInPill}
                    >
                        Sign in
                    </button>
                </div>

            </header>

            {/* ================= MAIN ================= */}
            <main style={loginStyles.registerMain}>

                <div style={loginStyles.registerIntro}>
                    <div style={loginStyles.registerEyebrow}>CUSTOMER REGISTRATION</div>
                    <h1 style={loginStyles.registerHeading}>Create your FinCore account</h1>
                    <p style={loginStyles.registerSubheading}>
                        Register securely to access FinCore digital
                        banking services.
                    </p>
                </div>

                <div style={loginStyles.registerGrid}>

                    {/* ================= LEFT ================= */}
                    <div>
                        <div style={loginStyles.registerPromoPanel}>
                            <div style={{ position: "relative", zIndex: 2 }}>
                                <div style={loginStyles.registerPromoLogoBadge}>
                                    <img
                                        src={logo}
                                        alt="FinCore"
                                        style={loginStyles.registerPromoLogoImg}
                                    />
                                </div>

                                <div style={loginStyles.registerPromoEyebrow}>
                                    FINCORE BANK
                                </div>

                                <h2 style={loginStyles.registerPromoHeading}>
                                    A better banking
                                    <br />
                                    experience starts here.
                                </h2>

                                <p style={loginStyles.registerPromoText}>
                                    Create your FinCore profile and
                                    experience secure, simple digital
                                    banking.
                                </p>
                            </div>

                            <div style={loginStyles.registerPromoDecoration} />
                        </div>

                        <div style={loginStyles.registerSecurityCard}>
                            {SECURITY_POINTS.map((text, index) => (
                                <div
                                    key={text}
                                    style={loginStyles.registerSecurityRow(
                                        index === SECURITY_POINTS.length - 1
                                    )}
                                >
                                    <span style={loginStyles.registerSecurityIcon}>✓</span>
                                    <span style={loginStyles.registerSecurityText}>
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ================= RIGHT FORM ================= */}
                    <div style={loginStyles.registerFormCard}>

                        <div style={loginStyles.registerFormHeader}>
                            <div>
                                <div style={loginStyles.registerFormEyebrow}>
                                    ACCOUNT DETAILS
                                </div>
                                <h2 style={loginStyles.registerFormTitle}>
                                    Registration information
                                </h2>
                                <p style={loginStyles.registerFormSubtitle}>
                                    Complete the details below to
                                    create your FinCore account.
                                </p>
                            </div>

                            <div style={loginStyles.registerFormBadge}>01</div>
                        </div>

                        {flag && (
                            <div style={loginStyles.registerSuccessBanner}>
                                <div style={loginStyles.registerSuccessIcon}>✓</div>
                                <div>
                                    <div style={loginStyles.registerSuccessTitle}>
                                        Registration completed successfully
                                    </div>
                                    <div style={loginStyles.registerSuccessSubtitle}>
                                        Your FinCore account has been
                                        created successfully.
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleValidation}>

                            <AppInput
                                label="Username"
                                name="username"
                                type="text"
                                placeholder="Enter username"
                                value={bankUser.username}
                                onChange={onChangeHandler}
                                error={errors.username}
                                required
                                wrapperStyle={{ marginBottom: "20px" }}
                            />

                            <div style={{ marginBottom: "20px" }}>
                                <AppInput
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={bankUser.password}
                                    onChange={onChangeHandler}
                                    required
                                    wrapperStyle={{ marginBottom: 0 }}
                                />
                                <div style={loginStyles.registerHelpText}>
                                    Password must contain 5–10 characters.
                                </div>
                                {errors.password && (
                                    <div style={{ marginTop: "7px", color: "#dc2626", fontSize: "12px", fontWeight: "600" }}>
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            <AppInput
                                label="Confirm password"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={onConfirmPasswordChange}
                                error={errors.confirmPassword}
                                required
                                wrapperStyle={{ marginBottom: "20px" }}
                            />

                            <AppInput
                                label="Full name"
                                name="personalName"
                                type="text"
                                placeholder="Enter your full name"
                                value={bankUser.personalName}
                                onChange={onChangeHandler}
                                error={errors.personalName}
                                required
                                wrapperStyle={{ marginBottom: "20px" }}
                            />

                            <AppInput
                                label="Email address"
                                name="email"
                                type="email"
                                placeholder="Enter email address"
                                value={bankUser.email}
                                onChange={onChangeHandler}
                                error={errors.email}
                                required
                                wrapperStyle={{ marginBottom: "20px" }}
                            />

                            <AppSelect
                                label="Account role"
                                name="role"
                                value={bankUser.role}
                                onChange={onChangeHandler}
                                error={errors.role}
                                required
                                placeholder="Choose role"
                                wrapperStyle={{ marginBottom: "30px" }}
                            >
                                <option value="Customer">Customer</option>
                                <option value="Admin">Admin</option>
                            </AppSelect>

                            <AppButton type="submit" fullWidth>
                                Create account →
                            </AppButton>

                            <div style={loginStyles.registerSecureFooter}>
                                🔒 Your registration information is
                                handled securely.
                            </div>

                        </form>

                        <div style={loginStyles.footerRow}>
                            <span style={loginStyles.footerMuted}>
                                Already have an account?
                            </span>
                            <button
                                type="button"
                                onClick={returnBack}
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    color: "#0864c7",
                                    fontWeight: "700",
                                    cursor: "pointer",
                                    marginLeft: "6px",
                                    fontSize: "14px",
                                }}
                            >
                                Sign in
                            </button>
                        </div>

                    </div>

                </div>

            </main>

            {/* ================= FOOTER ================= */}
            <footer style={layoutStyles.pageFooter}>
                © 2026 FinCore Bank · Secure Banking. Stronger Future.
            </footer>

        </div>
    );
};

export default RegisterUser;
