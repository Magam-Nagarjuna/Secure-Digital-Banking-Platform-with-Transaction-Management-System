import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/LoginService";
import AppCard from "../common/AppCard";
import { layoutStyles, dashboardStyles, commonStyles } from "../../styles";
import { clearSession } from "../../utils/storage";
import logo from "../../assets/logo.png";

const QUICK_ACCESS_CARDS = [
    {
        number: "01",
        iconBg: "#EEF2FF",
        iconColor: "#2563EB",
        title: "Customer List",
        description: "Review existing customer records.",
        linkLabel: "Open →",
        path: "/customer-repo",
    },
    {
        number: "02",
        iconBg: "#FFF7ED",
        iconColor: "#EA580C",
        title: "Pending Customers",
        description: "Review customer requests awaiting action.",
        linkLabel: "Open →",
        path: "/pending-customer",
    },
    {
        number: "03",
        iconBg: "#ECFDF5",
        iconColor: "#059669",
        title: "Account Addition",
        description: "Open the account creation flow.",
        linkLabel: "Open →",
        path: "/account-add",
    },
    {
        number: "04",
        iconBg: "#F0FDF4",
        iconColor: "#16A34A",
        title: "All Accounts",
        description: "View accounts across every customer.",
        linkLabel: "Open →",
        path: "/account-list",
    },
    {
        number: "05",
        iconBg: "#EFF6FF",
        iconColor: "#1D4ED8",
        title: "Transaction Reports",
        description: "View transaction reports and account activity.",
        linkLabel: "Open →",
        path: "/admin-transaction-report",
    },
];

const AdminMenu = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                clearSession();
                navigate("/");
            })
            .catch((error) => {
                console.error("Logout failed:", error);
                clearSession();
                navigate("/");
            });
    };

    const goTo = (path) => navigate(path);

    return (
        <div style={layoutStyles.dashboardShell}>

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
                                    Admin Dashboard
                                </small>
                            </div>
                        </div>

                        <div style={layoutStyles.welcomePill}>
                            Welcome Admin
                        </div>
                    </div>
                </Container>
            </div>

            <Navbar expand="lg" style={layoutStyles.navBar}>
                <Container>

                    <Navbar.Brand
                        onClick={() => goTo("/admin-menu")}
                        style={layoutStyles.navBrand}
                    >
                        <img
                            src={logo}
                            alt="FinCore Logo"
                            style={layoutStyles.navBrandLogo}
                        />
                        Dashboard
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="admin-navbar-nav" />

                    <Navbar.Collapse id="admin-navbar-nav">

                        <Nav className="me-auto">

                            {/* CUSTOMER */}
                            <NavDropdown
                                title="Customer"
                                id="customer-dropdown"
                            >
                                <NavDropdown.Item
                                    onClick={() => goTo("/customer-repo")}
                                >
                                    Customer List
                                </NavDropdown.Item>

                                <NavDropdown.Item
                                    onClick={() => goTo("/pending-customer")}
                                >
                                    Pending Customer List
                                </NavDropdown.Item>
                            </NavDropdown>

                            {/* ACCOUNT */}
                            <NavDropdown
                                title="Account"
                                id="account-dropdown"
                            >

                                <NavDropdown.Item
                                    onClick={() => goTo("/account-add")}
                                >
                                    Account Addition
                                </NavDropdown.Item>

                                <NavDropdown.Item
                                    onClick={() => goTo("/account-list")}
                                >
                                    All Accounts
                                </NavDropdown.Item>

                                <NavDropdown.Divider />

                                <NavDropdown.Item
                                    onClick={() =>
                                        goTo("/admin-transaction-report")
                                    }
                                >
                                    Transaction Reports
                                </NavDropdown.Item>
                            </NavDropdown>

                            {/* LOAN */}
                            <NavDropdown
                                title="Loan"
                                id="loan-dropdown"
                            >
                                <NavDropdown.Item
                                    onClick={() => goTo("/loan-list")}
                                >
                                    Loan List
                                </NavDropdown.Item>

                                <NavDropdown.Item
                                    onClick={() => goTo("/loan-add")}
                                >
                                    Loan Addition
                                </NavDropdown.Item>

                                <NavDropdown.Divider />

                                <NavDropdown.Item
                                    onClick={() =>
                                        goTo("/loan-application-review")
                                    }
                                >
                                    Customer Loan Requests
                                </NavDropdown.Item>

                                <NavDropdown.Item
                                    onClick={() =>
                                        goTo("/customer-loans")
                                    }
                                >
                                    Customer Loans
                                </NavDropdown.Item>
                            </NavDropdown>

                        </Nav>

                        <Nav>
                            <Nav.Link
                                onClick={handleLogout}
                                style={layoutStyles.logoutLink}
                            >
                                Logout
                            </Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

           
            <main style={layoutStyles.dashboardMain}>

                <div style={dashboardStyles.pageIntro}>
                    <div style={commonStyles.eyebrow}>
                        ADMIN PORTAL
                    </div>

                    <h1 style={commonStyles.pageTitle}>
                        Manage FinCore with confidence.
                    </h1>

                    <p style={commonStyles.pageSubtitle}>
                        Manage customers, accounts, transactions and loans
                        from one secure banking dashboard.
                    </p>
                </div>

                {/* QUICK ACCESS */}
                <section>
                    <h2 style={commonStyles.sectionTitle}>
                        Quick access
                    </h2>

                    <p style={commonStyles.sectionSubtitle}>
                        Frequently used administration tools.
                    </p>

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

                
                <section style={dashboardStyles.section}>

                    <h2 style={commonStyles.sectionTitle}>
                        Banking services
                    </h2>

                    <div style={layoutStyles.cardsGrid}>

                        <AppCard
                            className="fin-card"
                            style={dashboardStyles.serviceCard}
                            iconClassName="quick-icon"
                            linkClassName="quick-link"
                            number="06"
                            title="Loan List"
                            description="View and manage available loan schemes."
                            linkLabel="View loans →"
                            onClick={() => goTo("/loan-list")}
                        />

                        <AppCard
                            className="fin-card"
                            style={dashboardStyles.serviceCard}
                            iconClassName="quick-icon"
                            linkClassName="quick-link"
                            number="07"
                            title="Customer Loans"
                            description="View all customer loans and repayment status."
                            linkLabel="Review loans →"
                            onClick={() =>
                                goTo("/customer-loans")
                            }
                        />

                    </div>
                </section>

            </main>
        </div>
    );
};

export default AdminMenu;