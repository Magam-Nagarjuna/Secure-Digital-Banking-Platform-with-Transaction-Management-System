import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAccountByNumber } from "../../Services/AccountService";
import FormRow from "../common/FormRow";
import FormField from "../common/FormField";
import "../../DisplayView.css";

const AccountDetails = () => {

    const { accountNumber } = useParams();
    const navigate = useNavigate();
    const [account, setAccount] = useState({});

    useEffect(() => {
        getAccountByNumber(accountNumber)
            .then((response) => setAccount(response.data))
            .catch((error) => console.error(error));
    }, [accountNumber]);

    const fields = [
        { label: "Account Number", value: account.accountNumber || "" },
        { label: "Customer ID", value: account.customerId || "" },
        { label: "Account Type", value: account.accountType || "" },
        { label: "Balance", value: `₹ ${account.balance || 0}` },
        {
            label: "Status",
            value: account.status === "A" ? "Active" : "Pending",
        },
        { label: "Account Open Date", value: account.accountOpenDate || "" },
    ];

    return (
        <div className="page">

            <div className="page-header">
                <h1 className="page-title">Account Details</h1>
                <p className="page-subtitle">View your account information.</p>
            </div>

            <div className="fin-card">

                <div style={{ marginBottom: "30px" }}>
                    <button
                        className="btn btn-light border rounded-pill px-4"
                        onClick={() => navigate("/account-list")}
                    >
                        ← Return Back
                    </button>
                </div>

                <FormRow>
                    {fields.map((field) => (
                        <FormField key={field.label} label={field.label}>
                            <input
                                className="fin-input"
                                value={field.value}
                                readOnly
                            />
                        </FormField>
                    ))}
                </FormRow>

            </div>

        </div>
    );
};

export default AccountDetails;
