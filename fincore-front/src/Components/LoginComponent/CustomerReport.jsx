import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../../Services/CustomerService";
import Modal from "../common/Modal";
import PageHeader from "../common/PageHeader";
import InfoCard from "../common/InfoCard";
import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";
import { customerStyles, tableStyles } from "../../styles";
import { getInitial } from "../../utils/helper";
import { CUSTOMER_STATUS } from "../../utils/constants";
import "../../DisplayView.css";

const COLUMNS = [
    { key: "id", label: "ID" },
    { key: "customer", label: "CUSTOMER" },
    { key: "address", label: "ADDRESS" },
    { key: "email", label: "EMAIL" },
    { key: "dob", label: "DOB" },
    { key: "username", label: "USERNAME" },
    { key: "joined", label: "JOINED" },
    { key: "status", label: "STATUS" },
];

function CustomerReport() {

    const [customers, setCustomers] = useState([]);

    const [modal, setModal] = useState({
        open: false,
        title: "",
        message: "",
        type: "info",
    });

    const navigate = useNavigate();

    const setCustomerData = () => {

        getCustomers()
            .then((response) => {
                setCustomers(Array.isArray(response.data) ? response.data : []);
            })
            .catch((error) => {
                console.error("Customer Loading Error:", error);
                setModal({
                    open: true,
                    title: "Unable to Load Customers",
                    message: "An error occurred while loading customer information.",
                    type: "error",
                });
            });
    };

    useEffect(() => {
        setCustomerData();
    }, []);

    const returnBack = () => {
        const role = localStorage.getItem("role");
        navigate(role === "Admin" ? "/admin-menu" : "/customer-menu");
    };

    const totalCustomers = customers.length;

    const approvedCustomers = customers.filter(
        (c) => c.status === CUSTOMER_STATUS.APPROVED
    ).length;

    const pendingCustomers = customers.filter(
        (c) => c.status === CUSTOMER_STATUS.PENDING
    ).length;

    const renderStatus = (status) => {
        if (status === CUSTOMER_STATUS.APPROVED) {
            return <StatusBadge variant="success" label="Approved" />;
        }
        if (status === CUSTOMER_STATUS.PENDING) {
            return <StatusBadge variant="warning" label="Pending" />;
        }
        return <StatusBadge variant="danger" label="Rejected" />;
    };

    return (
        <div className="page">

            {/* PAGE HEADER */}
            <div className="page-header" style={{ marginBottom: "28px" }}>
                <div>
                    <div style={{ color: "#0864c7", fontSize: "12px", fontWeight: "800", letterSpacing: "2px", marginBottom: "8px" }}>
                        CUSTOMER MANAGEMENT
                    </div>
                    <h1 className="page-title" style={{ marginBottom: "7px" }}>
                        Customer Directory
                    </h1>
                    <p className="page-subtitle" style={{ margin: 0 }}>
                        View customer profiles, registration status,
                        and account information.
                    </p>
                </div>
            </div>

            {/* SUMMARY CARDS */}
            <div style={customerStyles.statsGrid}>
                <InfoCard label="TOTAL CUSTOMERS" value={totalCustomers} icon="👥" />
                <InfoCard
                    label="APPROVED"
                    value={approvedCustomers}
                    icon="✓"
                    iconBg="#ecfdf3"
                    iconColor="#16a05d"
                />
                <InfoCard
                    label="PENDING"
                    value={pendingCustomers}
                    icon="⏳"
                    iconBg="#fff7df"
                />
            </div>

            {/* CUSTOMER DIRECTORY CARD */}
            <div className="fin-card" style={customerStyles.directoryCard}>

                <div style={customerStyles.cardHeader}>
                    <div style={{ marginBottom: "20px" }}>
                        <button
                            type="button"
                            onClick={returnBack}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                height: "42px",
                                padding: "0 18px",
                                border: "1px solid #dce5ef",
                                borderRadius: "10px",
                                background: "#ffffff",
                                color: "#172238",
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer",
                                boxShadow: "0 2px 6px rgba(20,40,80,.04)",
                            }}
                        >
                            <span style={{ fontSize: "20px", lineHeight: "1", marginTop: "-2px" }}>‹</span>
                            <span>Return Back</span>
                        </button>
                    </div>
                    <PageHeader
                        title="Customers"
                        subtitle="Customer information and registration status"
                    />
                </div>

                <DataTable
                    columns={COLUMNS}
                    rows={customers}
                    renderEmpty={() => (
                        <tr>
                            <td colSpan={8} style={{ textAlign: "center", padding: "55px 20px", color: "#8290a5" }}>
                                <div style={{ fontSize: "28px", marginBottom: "10px" }}>👥</div>
                                <div style={{ fontWeight: "700", color: "#52627a", marginBottom: "5px" }}>
                                    No customers found
                                </div>
                                <div style={{ fontSize: "13px" }}>
                                    There are currently no customer records available.
                                </div>
                            </td>
                        </tr>
                    )}
                    renderRow={(customer) => (
                        <tr key={customer.customerId}>
                            <td>
                                <strong style={tableStyles.idCell}>{customer.customerId}</strong>
                            </td>
                            <td>
                                <div style={tableStyles.avatarCell}>
                                    <div style={tableStyles.avatarCircle}>
                                        {getInitial(customer.customerName)}
                                    </div>
                                    <strong style={{ color: "#24344d" }}>
                                        {customer.customerName}
                                    </strong>
                                </div>
                            </td>
                            <td>
                                <span style={{ color: "#64748b" }}>
                                    {customer.customerAddress || "—"}
                                </span>
                            </td>
                            <td>
                                <span style={{ color: "#52627a" }}>
                                    {customer.email || "—"}
                                </span>
                            </td>
                            <td>{customer.dateOfBirth || "—"}</td>
                            <td>
                                <span style={customerStyles.usernamePill}>
                                    {customer.username || "—"}
                                </span>
                            </td>
                            <td>{customer.dateOfJoin || "—"}</td>
                            <td>{renderStatus(customer.status)}</td>
                        </tr>
                    )}
                />

                <div style={customerStyles.tableFooter}>
                    <span style={customerStyles.tableFooterDot}>●</span>
                    View-only access • Customer information is protected
                </div>

            </div>

            <Modal
                open={modal.open}
                title={modal.title}
                message={modal.message}
                type={modal.type}
                onClose={() => setModal({ ...modal, open: false })}
            />

        </div>
    );
}

export default CustomerReport;