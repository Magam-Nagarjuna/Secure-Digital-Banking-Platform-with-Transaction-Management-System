import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/LoginService";
import AppCard from "../common/AppCard";
import { layoutStyles, dashboardStyles, commonStyles } from "../../styles";
import { clearSession, getDisplayName } from "../../utils/storage";
import logo from "../../assets/logo.png";

const QUICK_ACCESS_CARDS = [
    {
        number: "01",
        iconBg: "#EEF2FF",
        iconColor: "#2563EB",
        title: "Customer Request",
        description: "Submit and manage your customer requests.",
        linkLabel: "Open →",
        path: "/customer-req",
    },
    {
        number: "02",
        iconBg: "#FFF7ED",
        iconColor: "#EA580C",
        title: "Customer View",
        description: "View your existing customer information.",
        linkLabel: "View customer →",
        path: "/customer-repo",
    },
    {
        number: "03",
        iconBg: "#ECFDF5",
        iconColor: "#059669",
        title: "Account List",
        description: "Review all accounts associated with you.",
        linkLabel: "View accounts →",
        path: "/account-list",
    },
    {
        number: "04",
        iconBg: "#EFF6FF",
        iconColor: "#1D4ED8",
        title: "Transaction Report",
        description: "Review your deposit and withdrawal history.",
        linkLabel: "View report →",
        path: "/transaction-report",
    },
];

const SERVICE_CARDS = [
    {
        icon: "W",
        title: "Withdraw",
        description: "Make a withdrawal from your account.",
        linkLabel: "Withdraw →",
        path: "/transaction-entry/2",
    },
    {
        icon: "D",
        title: "Deposit",
        description: "Deposit funds into your account.",
        linkLabel: "Deposit →",
        path: "/transaction-entry/1",
    },
    {
        icon: "05",
        title: "My Loans",
        description: "View the available loan information.",
        linkLabel: "View loans →",
        path: "/loan-applications",
    },
];

const CustomerMenu = () => {
    const navigate = useNavigate();

    const username = getDisplayName();

    const handleLogout = () => {
        logoutUser().then(() => {
            clearSession();
            navigate("/");
        });
    };

    const goTo = (path) => navigate(path);

    return (
        <div style={layoutStyles.dashboardShell}>

            {/* ================= HEADER ================= */}
            <div style={layoutStyles.dashboardHeader}>
                <Container>
                    <div style={layoutStyles.dashboardHeaderRow}>

                        <div style={layoutStyles.dashboardBrandRow}>
                            <img src={logo} alt="FinCore Bank" style={layoutStyles.dashboardLogo} />
                            <div>
                                <h2 style={layoutStyles.dashboardBrandTitle}>FinCore Bank</h2>
                                <small style={layoutStyles.dashboardBrandSubtitle}>
                                    Customer Dashboard
                                </small>
                            </div>
                        </div>

                        <div style={layoutStyles.welcomePill}>Welcome, {username}</div>

                    </div>
                </Container>
            </div>

            {/* ================= NAVIGATION ================= */}
            <Navbar expand="lg" style={layoutStyles.navBar}>
                <Container>
                    <Navbar.Brand style={layoutStyles.navBrand}>
                        <img src={logo} alt="Logo" style={layoutStyles.navBrandLogo} />
                        Dashboard
                    </Navbar.Brand>

                    <Navbar.Toggle />

                    <Navbar.Collapse>
                        <Nav className="me-auto">

                            <NavDropdown title=" Customer" id="customer-dropdown">
                                <NavDropdown.Item onClick={() => goTo("/customer-req")}>
                                    Customer Request
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => goTo("/customer-repo")}>
                                    Customer View
                                </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title=" Account" id="account-dropdown">
                                <NavDropdown.Item onClick={() => goTo("/account-list")}>
                                    Account List
                                </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title=" Transaction" id="transaction-dropdown">
                                <NavDropdown.Item onClick={() => goTo("/transaction-entry/2")}>
                                    Withdraw
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => goTo("/transaction-entry/1")}>
                                    Deposit
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => goTo("/transaction-report")}>
                                    Transaction Report
                                </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title=" Loan" id="loan-dropdown">
                                <NavDropdown.Item onClick={() => goTo("/loan-list")}>
                                    Loan List
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => goTo("/loan-applications")}>
                                    My Loan Applications
                                </NavDropdown.Item>
                            </NavDropdown>

                        </Nav>

                        <Nav>
                            <Nav.Link onClick={handleLogout} style={layoutStyles.logoutLink}>
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* ================= CUSTOMER LANDING AREA ================= */}
            <main className="page" style={{ paddingTop: "40px", paddingBottom: "50px" }}>
                <Container>

                    <div className="page-header">
                        <div style={commonStyles.eyebrow}>CUSTOMER PORTAL</div>
                        <h1
                            className="page-title"
                            style={{ fontSize: "34px", fontWeight: "750", color: "#111827", marginBottom: "8px" }}
                        >
                            Manage your FinCore account with confidence.
                        </h1>
                        <p className="page-subtitle" style={{ color: "#6B7280", fontSize: "16px" }}>
                            Access your  profile, accounts, transactions,
                            and available banking services.
                        </p>
                    </div>

                    {/* ================= QUICK ACCESS ================= */}
                    <section style={{ marginTop: "32px" }}>
                        <h2 style={commonStyles.sectionTitle}>Quick access</h2>

                        <div style={layoutStyles.cardsGrid}>
                            {QUICK_ACCESS_CARDS.map((card) => (
                                <AppCard
                                    key={card.number}
                                    style={dashboardStyles.quickAccessCard}
                                    number={card.number}
                                    iconBg={card.iconBg}
                                    iconColor={card.iconColor}
                                    title={card.title}
                                    description={card.description}
                                    linkLabel={card.linkLabel}
                                    onClick={() => goTo(card.path)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* ================= SECONDARY SERVICES ================= */}
                    <section style={dashboardStyles.section}>
                        <h2 style={commonStyles.sectionTitle}>Banking services</h2>

                        <div style={layoutStyles.cardsGrid}>
                            {SERVICE_CARDS.map((card) => (
                                <AppCard
                                    key={card.title}
                                    className="fin-card"
                                    style={dashboardStyles.serviceCard}
                                    iconClassName="quick-icon"
                                    linkClassName="quick-link"
                                    number={card.icon}
                                    title={card.title}
                                    description={card.description}
                                    linkLabel={card.linkLabel}
                                    onClick={() => goTo(card.path)}
                                />
                            ))}
                        </div>
                    </section>

                </Container>
            </main>

        </div>
    );
};

export default CustomerMenu;
