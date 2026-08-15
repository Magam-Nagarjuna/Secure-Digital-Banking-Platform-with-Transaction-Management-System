import React, { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import {
    addLoan,
    generateLoanId,
    getLoanById,
    updateLoan
} from "../../Services/LoanService";

import { commonStyles, layoutStyles } from "../../styles";
import loanStyles from "../../styles/loanStyles";
import logo from "../../assets/logo.png";

const EMPTY = {
    loanId: "",
    loanAmount: "100000",
    loanTenure: "1",
    interestRate: "20",
    loanStatus: "A",
};

const money = (value) =>
    Number.isFinite(Number(value))
        ? `₹${Number(value).toLocaleString("en-IN", {
            maximumFractionDigits: 2
        })}`
        : "₹0";

const LoanEntry = () => {
    const navigate = useNavigate();
    const { loanId } = useParams();
    const editing = Boolean(loanId);

    const [form, setForm] = useState(EMPTY);
    const [loading, setLoading] = useState(editing);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                if (editing) {
                    const response = await getLoanById(loanId);
                    const data = response.data;

                    setForm({
                        loanId: data.loanId,
                        loanAmount: data.loanAmount ?? "",
                        loanTenure: data.loanTenure ?? "",
                        interestRate: data.interestRate ?? "",
                        loanStatus: data.loanStatus ?? "A",
                    });
                } else {
                    const response = await generateLoanId();

                    setForm((current) => ({
                        ...current,
                        loanId: response.data
                    }));
                }
            } catch (e) {
                setError(
                    e.response?.data?.message ||
                    "Unable to load loan details."
                );
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [editing, loanId]);

    const calculate = (amount, annualRate, years) => {
        const principal = Number(amount);
        const rate = Number(annualRate);
        const months = Number(years) * 12;

        if (!principal || !rate || !months) return null;

        const monthlyRate = rate / 1200;
        const factor = Math.pow(1 + monthlyRate, months);

        const exactEmi =
            (principal * monthlyRate * factor) /
            (factor - 1);

        const emi = Math.round(exactEmi);
        const total = Math.round(exactEmi * months);

        return {
            months,
            emi,
            totalInterest: total - principal,
            total
        };
    };

    const preview = useMemo(
        () =>
            calculate(
                form.loanAmount,
                form.interestRate,
                form.loanTenure
            ),
        [
            form.loanAmount,
            form.interestRate,
            form.loanTenure
        ]
    );

    const update = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value
        }));
    };

    const submit = async (event) => {
        event.preventDefault();

        setError("");
        setMessage("");

        if (Number(form.loanAmount) < 100000) {
            return setError(
                "Minimum loan amount should be ₹1,00,000."
            );
        }

        if (Number(form.loanTenure) <= 0) {
            return setError(
                "Loan tenure should be greater than zero."
            );
        }

        if (Number(form.interestRate) <= 0) {
            return setError(
                "Interest rate should be greater than zero."
            );
        }

        setSaving(true);

        try {
            const payload = {
                loanId: form.loanId,
                loanAmount: Number(form.loanAmount),
                loanTenure: Number(form.loanTenure),
                interestRate: Number(form.interestRate),
                loanStatus: form.loanStatus,
            };

            if (editing) {
                await updateLoan(payload);
            } else {
                await addLoan(payload);
            }

            setMessage(
                editing
                    ? "Loan scheme updated successfully."
                    : "Loan scheme created successfully."
            );

            setTimeout(() => navigate("/loan-list"), 700);
        } catch (e) {
            setError(
                e.response?.data?.message ||
                "Unable to save the loan scheme."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div style={loanStyles.page}>
                Loading loan details.
            </div>
        );
    }

    return (
        <div style={loanStyles.page}>

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
                                    Loan Management
                                </small>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <Container style={{ paddingTop: "28px" }}>

                <div style={loanStyles.backRow}>
                    <button
                        type="button"
                        onClick={() => navigate("/admin-menu")}
                        style={loanStyles.backButton}
                    >
                        <span
                            style={{
                                fontSize: "20px",
                                lineHeight: "1",
                                marginTop: "-2px"
                            }}
                        >
                            ‹
                        </span>

                        <span>Return Back</span>
                    </button>
                </div>

                <div
                    style={{
                        ...loanStyles.header,
                        marginTop: "20px"
                    }}
                >
                    <div>
                        <div style={commonStyles.eyebrow}>
                            ADMIN • LOAN SCHEME
                        </div>

                        <h1 style={loanStyles.title}>
                            {editing
                                ? "Edit Loan Scheme"
                                : "Create Loan Scheme"}
                        </h1>

                        <p style={loanStyles.subtitle}>
                            Define the product customers can apply for.
                        </p>
                    </div>
                </div>

                {error && (
                    <div
                        style={{
                            ...loanStyles.alert,
                            background: "#FEF2F2",
                            color: "#B91C1C",
                            border: "1px solid #FECACA"
                        }}
                    >
                        {error}
                    </div>
                )}

                {message && (
                    <div
                        style={{
                            ...loanStyles.alert,
                            background: "#ECFDF5",
                            color: "#047857",
                            border: "1px solid #A7F3D0"
                        }}
                    >
                        {message}
                    </div>
                )}

                <div style={loanStyles.card}>
                    <form onSubmit={submit}>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit,minmax(240px,1fr))",
                                gap: "20px"
                            }}
                        >
                            <div style={loanStyles.field}>
                                <label style={loanStyles.label}>
                                    Loan ID
                                </label>

                                <input
                                    style={{
                                        ...loanStyles.input,
                                        background: "#F8FAFC"
                                    }}
                                    value={form.loanId}
                                    readOnly
                                />
                            </div>

                            <div style={loanStyles.field}>
                                <label style={loanStyles.label}>
                                    Loan Amount
                                </label>

                                <input
                                    style={loanStyles.input}
                                    type="number"
                                    min="100000"
                                    value={form.loanAmount}
                                    onChange={(e) =>
                                        update(
                                            "loanAmount",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>

                            <div style={loanStyles.field}>
                                <label style={loanStyles.label}>
                                    Tenure (Years)
                                </label>

                                <input
                                    style={loanStyles.input}
                                    type="number"
                                    min="1"
                                    value={form.loanTenure}
                                    onChange={(e) =>
                                        update(
                                            "loanTenure",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>

                            <div style={loanStyles.field}>
                                <label style={loanStyles.label}>
                                    Interest Rate (% p.a.)
                                </label>

                                <input
                                    style={loanStyles.input}
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    value={form.interestRate}
                                    onChange={(e) =>
                                        update(
                                            "interestRate",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>

                            <div style={loanStyles.field}>
                                <label style={loanStyles.label}>
                                    Scheme Status
                                </label>

                                <select
                                    style={loanStyles.input}
                                    value={form.loanStatus}
                                    onChange={(e) =>
                                        update(
                                            "loanStatus",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="A">Active</option>
                                    <option value="I">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {preview && (
                            <div style={loanStyles.summaryGrid}>

                                <div style={loanStyles.summary}>
                                    <div style={loanStyles.summaryLabel}>
                                        Total Tenure
                                    </div>

                                    <div style={loanStyles.summaryValue}>
                                        {preview.months} months
                                    </div>
                                </div>

                                <div style={loanStyles.summary}>
                                    <div style={loanStyles.summaryLabel}>
                                        Estimated EMI
                                    </div>

                                    <div style={loanStyles.summaryValue}>
                                        {money(preview.emi)}
                                    </div>
                                </div>

                                <div style={loanStyles.summary}>
                                    <div style={loanStyles.summaryLabel}>
                                        Total Interest
                                    </div>

                                    <div style={loanStyles.summaryValue}>
                                        {money(preview.totalInterest)}
                                    </div>
                                </div>

                                <div style={loanStyles.summary}>
                                    <div style={loanStyles.summaryLabel}>
                                        Total Payable
                                    </div>

                                    <div style={loanStyles.summaryValue}>
                                        {money(preview.total)}
                                    </div>
                                </div>

                            </div>
                        )}

                        <div
                            style={{
                                ...loanStyles.buttonRow,
                                marginTop: "24px"
                            }}
                        >
                            <button
                                type="submit"
                                disabled={saving}
                                style={{
                                    ...loanStyles.primaryButton,
                                    opacity: saving ? 0.7 : 1
                                }}
                            >
                                {saving
                                    ? "Saving..."
                                    : editing
                                        ? "Update Scheme"
                                        : "Create Scheme"}
                            </button>

                            <button
                                type="button"
                                style={loanStyles.secondaryButton}
                                onClick={() => navigate("/loan-list")}
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                </div>

            </Container>
        </div>
    );
};

export default LoanEntry;