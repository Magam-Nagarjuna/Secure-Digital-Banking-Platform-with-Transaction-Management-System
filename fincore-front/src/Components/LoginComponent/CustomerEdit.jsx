import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    updateCustomer,
    getCustomerById,
} from "../../Services/CustomerService";
import AppButton from "../common/AppButton";
import "../../DisplayView.css";

const CustomerEdit = () => {
    const navigate = useNavigate();
    const { cid, pno } = useParams();

    const [customer, setCustomer] = useState({
        customerId: 0,
        customerName: "",
        customerAddress: "",
        dateOfBirth: "",
        dateOfJoin: "",
        email: "",
        username: "",
        status: "",
    });

    const [flag, setFlag] = useState("");

    useEffect(() => {
        getCustomerById(cid).then((response) => {
            setCustomer(response.data);
            setFlag(pno);
        });
    }, [cid, pno]);

    const setCustomerStatus = () => {
        const updatedCustomer = {
            ...customer,
            status: flag === "1" ? "A" : "R",
        };

        updateCustomer(updatedCustomer).then(() => {
            navigate("/admin-menu");
        });
    };

    const approved = parseInt(flag) === 1;

    return (
        <div className="page">

            <div className="fin-card" style={{ maxWidth: "650px", margin: "60px auto" }}>

                <div style={{ textAlign: "center" }}>

                    <div style={{ fontSize: "60px" }}>
                        {approved ? "🎉" : "❌"}
                    </div>

                    <h2
                        style={{
                            color: approved ? "#22C55E" : "#EF4444",
                            fontWeight: "700",
                            marginTop: "15px",
                        }}
                    >
                        {approved ? "Customer Approved" : "Customer Rejected"}
                    </h2>

                    <p style={{ color: "#6B7280", marginTop: "10px" }}>
                        {approved
                            ? "The customer has been approved successfully."
                            : "The customer's request has been rejected."}
                    </p>

                    <AppButton
                        style={{ width: "220px", marginTop: "35px" }}
                        onClick={setCustomerStatus}
                    >
                        Return to Dashboard
                    </AppButton>

                </div>

            </div>

        </div>
    );
};

export default CustomerEdit;
