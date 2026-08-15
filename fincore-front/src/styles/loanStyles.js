import colors from "./colors";


const loanStyles = {

    page: {
        minHeight: "100vh",
        background: colors.pageBackground || "#F8FAFC",
        padding: "38px 0 60px",
    },

    main: {
        width: "100%",
    },

    
    backRow: {
        marginBottom: "28px",
    },

    backButton: {
        height: "44px",
        padding: "0 18px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        background: "#FFFFFF",
        border: "1px solid #DCE5EF",
        borderRadius: "10px",
        color: "#16233B",
        fontSize: "14px",
        fontWeight: 700,
        fontFamily: "inherit",
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(15, 23, 42, 0.04)",
        outline: "none",
        transition: "all 0.2s ease",
    },

    
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "20px",
        marginBottom: "28px",
    },

    title: {
        margin: 0,
        color: colors.textInk || "#111827",
        fontSize: "32px",
        fontWeight: 750,
    },

    subtitle: {
        margin: "8px 0 0",
        color: colors.gray500 || "#6B7280",
        fontSize: "15px",
    },

    card: {
        background: colors.white || "#FFFFFF",
        border: `1px solid ${colors.borderGray || "#E5E7EB"}`,
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 15px rgba(15,23,42,.05)",
    },

    metricGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
        gap: "16px",
        marginBottom: "22px",
    },

    metric: {
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "14px",
        padding: "18px",
    },

    metricLabel: {
        color: "#6B7280",
        fontSize: "12px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: ".05em",
    },

    metricValue: {
        color: "#111827",
        fontSize: "24px",
        fontWeight: 800,
        marginTop: "7px",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
        gap: "18px",
    },

    schemeCard: {
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        padding: "22px",
        boxShadow: "0 4px 15px rgba(15,23,42,.04)",
    },

    schemeTop: {
        display: "flex",
        justifyContent: "space-between",
        gap: "12px",
        alignItems: "flex-start",
        marginBottom: "18px",
    },

    schemeName: {
        margin: 0,
        fontSize: "18px",
        fontWeight: 750,
        color: "#111827",
    },

    schemeId: {
        marginTop: "4px",
        color: "#6B7280",
        fontSize: "12px",
    },


    detailGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
        marginBottom: "20px",
    },

    detail: {
        background: "#F8FAFC",
        borderRadius: "10px",
        padding: "12px",
    },

    detailLabel: {
        display: "block",
        color: "#6B7280",
        fontSize: "11px",
        marginBottom: "4px",
    },

    detailValue: {
        color: "#111827",
        fontWeight: 750,
        fontSize: "14px",
    },

    buttonRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "9px",
    },

    primaryButton: {
        border: 0,
        borderRadius: "9px",
        padding: "10px 15px",
        background: "#2563EB",
        color: "#FFFFFF",
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit",
    },

    secondaryButton: {
        border: "1px solid #D1D5DB",
        borderRadius: "9px",
        padding: "10px 15px",
        background: "#FFFFFF",
        color: "#374151",
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit",
    },

    dangerButton: {
        border: 0,
        borderRadius: "9px",
        padding: "10px 15px",
        background: "#DC2626",
        color: "#FFFFFF",
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit",
    },


    tableWrap: {
        overflowX: "auto",
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
        minWidth: "950px",
    },

    th: {
        textAlign: "left",
        padding: "13px 14px",
        background: "#F8FAFC",
        color: "#64748B",
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: ".05em",
        borderBottom: "1px solid #E5E7EB",
    },

    td: {
        padding: "14px",
        borderBottom: "1px solid #EEF2F7",
        color: "#374151",
        fontSize: "13px",
    },

    status: {
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "999px",
        padding: "5px 9px",
        fontSize: "11px",
        fontWeight: 800,
    },

    
    input: {
        width: "100%",
        height: "50px",
        border: "1px solid #D1D5DB",
        borderRadius: "10px",
        padding: "0 14px",
        boxSizing: "border-box",
        outline: "none",
        fontSize: "14px",
        fontFamily: "inherit",
    },

    label: {
        display: "block",
        marginBottom: "8px",
        color: "#374151",
        fontSize: "13px",
        fontWeight: 700,
    },

    field: {
        marginBottom: "18px",
    },

    alert: {
        borderRadius: "10px",
        padding: "12px 14px",
        marginBottom: "18px",
        fontSize: "14px",
    },

    summaryGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
        gap: "12px",
        marginTop: "20px",
    },

    summary: {
        background: "#F8FAFC",
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        padding: "15px",
    },

    summaryLabel: {
        color: "#64748B",
        fontSize: "11px",
        fontWeight: 700,
    },

    summaryValue: {
        color: "#111827",
        fontSize: "18px",
        fontWeight: 800,
        marginTop: "5px",
    },

    modalOverlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
    },

    confirmModal: {
        width: "100%",
        maxWidth: "430px",
        background: "#FFFFFF",
        borderRadius: "16px",
        padding: "26px",
        boxShadow: "0 20px 50px rgba(15, 23, 42, 0.20)",
        border: "1px solid #E5E7EB",
    },

    modalTitle: {
        margin: 0,
        color: "#111827",
        fontSize: "20px",
        fontWeight: 800,
    },

    modalText: {
        margin: "10px 0 24px",
        color: "#64748B",
        fontSize: "14px",
        lineHeight: 1.6,
    },

    modalActions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
    },

    // Shared "read-only detail report" modal styles — used by both the
    // admin Loan Application Review screen and the customer Loan
    // Application Report screen. Namespaced under detailView (rather than
    // flattened into the top-level object) so keys like "label" and
    // "value" here don't collide with the existing form-field
    // loanStyles.label used elsewhere in the module.
    detailView: {
        detailsModal: {
            width: "min(760px, 94vw)",
            maxHeight: "88vh",
            overflowY: "auto",
            background: "#FFFFFF",
            borderRadius: "16px",
            padding: "28px",
            boxShadow: "0 24px 60px rgba(15, 23, 42, 0.22)",
        },

        modalHeader: {
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "20px",
            marginBottom: "18px",
        },

        modalTitle: {
            margin: "6px 0 0",
            fontSize: "25px",
            fontWeight: 700,
            color: "#172033",
        },

        close: {
            border: "none",
            background: "#F1F5F9",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            fontSize: "25px",
            cursor: "pointer",
            color: "#334155",
        },

        detailsBox: {
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#FFFFFF",
        },

        row: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "42px",
            alignItems: "center",
            borderBottom: "1px solid #E2E8F0",
            fontSize: "14px",
        },

        label: {
            padding: "9px 14px",
            color: "#27364B",
        },

        value: {
            padding: "9px 14px",
            color: "#172033",
            fontWeight: 600,
        },

        actions: {
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "22px",
            flexWrap: "wrap",
        },

        icon: {
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            margin: "0 auto 12px",
            background: "#EFF6FF",
            color: "#2563EB",
            fontSize: "24px",
            fontWeight: 700,
        },

        note: {
            margin: "12px 0 0",
            padding: "12px 14px",
            borderRadius: "8px",
            background: "#F8FAFC",
            color: "#64748B",
            fontSize: "13px",
            lineHeight: 1.5,
        },

        textarea: {
            width: "100%",
            marginTop: "10px",
            padding: "10px 12px",
            borderRadius: "8px",
            border: "1px solid #CBD5E1",
            fontFamily: "inherit",
            fontSize: "14px",
            resize: "vertical",
            boxSizing: "border-box",
        },

        error: {
            padding: "14px 18px",
            marginBottom: "18px",
            borderRadius: "10px",
            background: "#FEF2F2",
            color: "#B91C1C",
            border: "1px solid #FECACA",
        },

        success: {
            padding: "14px 18px",
            marginBottom: "18px",
            borderRadius: "10px",
            background: "#ECFDF5",
            color: "#047857",
            border: "1px solid #A7F3D0",
        },

        empty: {
            padding: "30px 0",
            color: "#64748B",
            textAlign: "center",
        },
    },
};

export default loanStyles;