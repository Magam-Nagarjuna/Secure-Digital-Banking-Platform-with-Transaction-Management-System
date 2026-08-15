import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser, getUserDetails } from "../../Services/LoginService";
import AppButton from "../common/AppButton";
import AppInput from "../common/AppInput";
import AppAlert from "../common/AppAlert";
import { layoutStyles, loginStyles, buttonStyles } from "../../styles";
import { setSession } from "../../utils/storage";
import "../../DisplayView.css";
import logo from "../../assets/logo.png";

const SECURITY_FEATURES = [
    "Secure account access",
    "Protected customer information",
    "Reliable digital banking",
];

const LoginPage = () => {

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [flag, setFlag] = useState(true);

    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const onChangeHandler = (e) => {

        const { name, value } = e.target;

        setFlag(true);

        setLoginData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateLogin = (e) => {

        e.preventDefault();

        validateUser(loginData.username, loginData.password)
            .then((response) => {

                const role = response.data;

                if (role === "Admin" || role === "Customer") {

                    getUserDetails()
                        .then((userRes) => {

                            console.log(userRes.data);

                            setSession({
                                role,
                                username: userRes.data.username,
                                personalName: userRes.data.personalName,
                            });

                            navigate(role === "Admin" ? "/admin-menu" : "/customer-menu");

                        })
                        .catch((error) => {
                            console.log("User details error:", error);
                            setFlag(false);
                        });

                } else {

                    setFlag(false);

                }

            })
            .catch((error) => {
                console.log("Login error:", error);
                setFlag(false);
            });
    };

    const handleValidation = (e) => {

        e.preventDefault();

        let tempErrors = {};
        let isValid = true;

        if (!loginData.username.trim()) {
            tempErrors.username = "Username is required";
            isValid = false;
        }

        if (!loginData.password.trim()) {
            tempErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(tempErrors);

        if (isValid) {
            validateLogin(e);
        }
    };

    const registerNewUser = () => navigate("/register");

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

                <div style={layoutStyles.secureSession}>
                    <span style={layoutStyles.secureDot} />
                    Secure session
                </div>

            </header>

            {/* ================= MAIN ================= */}
            <main style={layoutStyles.contentMain}>
                <div style={loginStyles.grid}>

                    {/* ================= LEFT PANEL ================= */}
                    <div style={loginStyles.promoPanel}>

                        <div style={{ position: "relative", zIndex: 2 }}>
                            <div style={loginStyles.promoLogoBadge}>
                                <img src={logo} alt="FinCore" style={loginStyles.promoLogoImg} />
                            </div>

                            <div style={loginStyles.promoEyebrow}>FINCORE BANK</div>

                            <h1 style={loginStyles.promoHeading}>
                                Banking made
                                <br />
                                simple and secure.
                            </h1>

                            <p style={loginStyles.promoText}>
                                Access your FinCore banking account
                                through a secure and reliable digital
                                banking experience.
                            </p>
                        </div>

                        <div style={loginStyles.promoFeatureList}>
                            {SECURITY_FEATURES.map((item, index) => (
                                <div
                                    key={item}
                                    style={loginStyles.promoFeatureRow(
                                        index === SECURITY_FEATURES.length - 1
                                    )}
                                >
                                    <span style={loginStyles.promoFeatureIcon}>✓</span>
                                    <span style={loginStyles.promoFeatureText}>{item}</span>
                                </div>
                            ))}
                        </div>

                        <div style={loginStyles.promoDecorationOuter} />
                        <div style={loginStyles.promoDecorationInner} />

                    </div>

                    {/* ================= LOGIN CARD ================= */}
                    <div style={loginStyles.authCard}>

                        <div style={loginStyles.authCardHeader}>
                            <div style={loginStyles.authCardEyebrow}>CUSTOMER ACCESS</div>
                            <h2 style={loginStyles.authCardTitle}>Welcome back</h2>
                            <p style={loginStyles.authCardSubtitle}>
                                Sign in to continue banking securely.
                            </p>
                        </div>

                        {!flag && (
                            <AppAlert variant="error">
                                Invalid username or password.
                            </AppAlert>
                        )}

                        <form onSubmit={handleValidation}>

                            <AppInput
                                label="Username"
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                value={loginData.username}
                                onChange={onChangeHandler}
                                error={errors.username}
                            />

                            <AppInput
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={loginData.password}
                                onChange={onChangeHandler}
                                error={errors.password}
                                wrapperStyle={{ marginBottom: "28px" }}
                            />

                            <AppButton type="submit" fullWidth>
                                Sign in securely →
                            </AppButton>

                        </form>

                        <div style={loginStyles.footerRow}>
                            <span style={loginStyles.footerMuted}>
                                Don't have a FinCore account?
                            </span>

                            <button
                                type="button"
                                onClick={registerNewUser}
                                style={buttonStyles.link}
                            >
                                Create account
                            </button>
                        </div>

                        <div style={loginStyles.secureNote}>
                            🔒 Your banking session is protected by
                            FinCore security controls.
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

export default LoginPage;
