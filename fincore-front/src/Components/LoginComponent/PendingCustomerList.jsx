import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerByStatus } from "../../Services/CustomerService";
import Modal from "../common/Modal";
import BackButton from "../common/BackButton";
import ActionButtons from "../common/ActionButtons";
import { customerStyles } from "../../styles";
import "../../DisplayView.css";

const TABLE_HEADINGS = [
    "ID",
    "Customer",
    "Address",
    "Email",
    "Date of Birth",
    "Username",
    "Date Joined",
    "Status",
    "Actions",
];

const PendingCustomerList = () => {

    const [customers, setCustomers] = useState([]);

    const [modal, setModal] = useState({
        open: false,
        title: "",
        message: "",
        type: "info",
    });

    const navigate = useNavigate();

    const setCustomerData = () => {

        getCustomerByStatus("P")
            .then((response) => {
                setCustomers(Array.isArray(response.data) ? response.data : []);
            })
            .catch((error) => {
                console.log("Pending Customer Error:", error);
                setModal({
                    open: true,
                    title: "Unable to Load Requests",
                    message: "An error occurred while loading pending customer requests.",
                    type: "error",
                });
            });
    };

    useEffect(() => {
        setCustomerData();
    }, []);

    const returnBack = () => navigate("/admin-menu");

    return (
        <div style={{ minHeight: "100vh", background: "#f4f7fb", fontFamily: "Inter, Arial, Helvetica, sans-serif", paddingBottom: "60px" }}>

            {/* ================= PAGE HEADER ================= */}
            <div style={customerStyles.pendingPageHeader}>

                <div style={customerStyles.pendingBackRow}>
                    <BackButton onClick={returnBack} />
                </div>

                <div style={customerStyles.pendingTitleRow}>
                    <div>
                        <div style={customerStyles.pendingEyebrow}>CUSTOMER MANAGEMENT</div>
                        <h1 style={customerStyles.pendingHeading}>Pending customer requests</h1>
                        <p style={customerStyles.pendingSubheading}>
                            Review new customer registrations and
                            approve or reject requests.
                        </p>
                    </div>

                    <div style={customerStyles.pendingCountCard}>
                        <div style={customerStyles.pendingCountLabel}>PENDING REQUESTS</div>
                        <div style={customerStyles.pendingCountRow}>
                            <span style={customerStyles.pendingCountValue}>
                                {customers.length}
                            </span>
                            <span style={customerStyles.pendingCountDot} />
                        </div>
                    </div>
                </div>

            </div>

            {/* ================= MAIN CARD ================= */}
            <main style={customerStyles.pendingMain}>

                <div style={customerStyles.pendingCard}>

                    <div style={customerStyles.pendingCardTop}>
                        <div style={customerStyles.pendingCardIcon}>✓</div>
                        <div>
                            <h2 style={customerStyles.pendingCardTitle}>Registration requests</h2>
                            <p style={customerStyles.pendingCardSubtitle}>
                                Customers awaiting account approval
                            </p>
                        </div>
                    </div>

                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1150px" }}>

                            <thead>
                                <tr style={{ background: "#f8fafc" }}>
                                    {TABLE_HEADINGS.map((heading) => (
                                        <th
                                            key={heading}
                                            style={customerStyles.pendingTh(heading === "Actions")}
                                        >
                                            {heading}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {customers.length > 0 ? (
                                    customers.map((cust) => (
                                        <tr key={cust.customerId} style={customerStyles.pendingRow}>

                                            <td style={customerStyles.pendingCellId}>
                                                {cust.customerId}
                                            </td>

                                            <td style={{ padding: "18px" }}>
                                                <div style={customerStyles.pendingAvatarRow}>
                                                    <div style={customerStyles.pendingAvatarCircle}>
                                                        {cust.customerName
                                                            ? cust.customerName.charAt(0).toUpperCase()
                                                            : "C"}
                                                    </div>
                                                    <div>
                                                        <div style={customerStyles.pendingCustomerName}>
                                                            {cust.customerName}
                                                        </div>
                                                        <div style={customerStyles.pendingCustomerTag}>
                                                            Customer
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td style={{ ...customerStyles.pendingCellBase, maxWidth: "220px" }}>
                                                <div
                                                    style={customerStyles.pendingAddressCell}
                                                    title={cust.customerAddress}
                                                >
                                                    {cust.customerAddress || "—"}
                                                </div>
                                            </td>

                                            <td style={customerStyles.pendingCellBase}>
                                                {cust.email || "—"}
                                            </td>

                                            <td style={{ ...customerStyles.pendingCellBase, whiteSpace: "nowrap" }}>
                                                {cust.dateOfBirth || "—"}
                                            </td>

                                            <td style={customerStyles.pendingUsernameCell}>
                                                {cust.username || "—"}
                                            </td>

                                            <td style={{ ...customerStyles.pendingCellBase, whiteSpace: "nowrap" }}>
                                                {cust.dateOfJoin || "—"}
                                            </td>

                                            <td style={{ padding: "18px" }}>
                                                <span style={customerStyles.pendingStatusBadge}>
                                                    <span style={customerStyles.pendingStatusDot} />
                                                    Pending
                                                </span>
                                            </td>

                                            <td style={{ padding: "18px", textAlign: "center" }}>
                                                <ActionButtons
                                                    actions={[
                                                        {
                                                            key: "accept",
                                                            label: "✓ Accept",
                                                            variant: "success",
                                                            to: `/customer-edit/${cust.customerId}/1`,
                                                        },
                                                        {
                                                            key: "reject",
                                                            label: "✕ Reject",
                                                            variant: "danger",
                                                            to: `/customer-edit/${cust.customerId}/2`,
                                                        },
                                                    ]}
                                                />
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" style={{ padding: "65px 25px", textAlign: "center" }}>
                                            <div style={customerStyles.pendingEmptyIcon}>✓</div>
                                            <h3 style={{ margin: "0 0 7px", color: "#172238", fontSize: "18px", fontWeight: "800" }}>
                                                No pending requests
                                            </h3>
                                            <p style={{ margin: 0, color: "#8a97aa", fontSize: "13px" }}>
                                                There are currently no
                                                customer registrations
                                                waiting for review.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                    {customers.length > 0 && (
                        <div style={customerStyles.pendingCardFooter}>
                            Showing{" "}
                            <strong style={{ color: "#334155" }}>{customers.length}</strong>{" "}
                            pending customer{" "}
                            {customers.length === 1 ? "request" : "requests"}
                        </div>
                    )}

                </div>

            </main>

            <Modal
                open={modal.open}
                title={modal.title}
                message={modal.message}
                type={modal.type}
                onClose={() => setModal({ ...modal, open: false })}
            />

        </div>
    );
};

export default PendingCustomerList;
