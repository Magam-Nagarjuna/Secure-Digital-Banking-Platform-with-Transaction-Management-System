import colors from "./colors";


const transactionStyles = {
    page: {
        minHeight: "100vh",
        background: colors.pageBackground,
        padding: "45px 7%",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: colors.textPrimaryAlt,
    },

    headerRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: "28px",
        gap: "20px",
        flexWrap: "wrap",
    },

    eyebrow: {
        color: "#1261c9",
        fontSize: "13px",
        fontWeight: "800",
        letterSpacing: "2px",
        marginBottom: "8px",
    },

    heading: {
        margin: 0,
        fontSize: "38px",
        fontWeight: "800",
        letterSpacing: "-1px",
    },

    subheading: {
        margin: "8px 0 0",
        color: "#718096",
        fontSize: "16px",
    },

    backButton: {
        background: "#ffffff",
        border: "1px solid #d9e2ef",
        borderRadius: "10px",
        padding: "12px 20px",
        fontSize: "14px",
        fontWeight: "700",
        color: "#26354d",
        cursor: "pointer",
        boxShadow: "0 3px 10px rgba(20, 40, 80, 0.05)",
    },

    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "18px",
        marginBottom: "24px",
    },

    statCard: (borderColor) => ({
        background: "#ffffff",
        border: `1px solid ${borderColor}`,
        borderRadius: "16px",
        padding: "22px 24px",
        boxShadow: "0 8px 25px rgba(31, 61, 100, 0.06)",
    }),

    statLabel: (color) => ({
        color,
        fontSize: "13px",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "1px",
    }),

    statValue: (color) => ({
        fontSize: "28px",
        fontWeight: "800",
        marginTop: "8px",
        color,
    }),

    reportCard: {
        background: "#ffffff",
        border: "1px solid #e1e7ef",
        borderRadius: "18px",
        padding: "24px",
        boxShadow: "0 12px 35px rgba(31, 61, 100, 0.07)",
    },

    filterHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "18px",
        flexWrap: "wrap",
        paddingBottom: "20px",
        borderBottom: "1px solid #edf1f5",
    },

    filterTitle: {
        margin: 0,
        fontSize: "20px",
        fontWeight: "800",
    },

    filterSubtitle: {
        margin: "5px 0 0",
        color: "#8793a5",
        fontSize: "13px",
    },

    filterControls: {
        display: "flex",
        gap: "12px",
        alignItems: "center",
        flexWrap: "wrap",
    },

    filterSelect: {
        minWidth: "170px",
        height: "44px",
        padding: "0 14px",
        borderRadius: "9px",
        border: "1px solid #d8e0ea",
        background: "#ffffff",
        color: colors.textPrimaryAlt,
        fontSize: "14px",
        fontWeight: "600",
        outline: "none",
        cursor: "pointer",
    },

    resetButton: {
        height: "44px",
        padding: "0 17px",
        borderRadius: "9px",
        border: "1px solid #d8e0ea",
        background: "#f8fafc",
        color: "#334155",
        fontWeight: "700",
        cursor: "pointer",
    },

    activeFilters: {
        display: "flex",
        gap: "8px",
        alignItems: "center",
        flexWrap: "wrap",
        padding: "16px 0",
    },

    activeFiltersLabel: {
        color: "#718096",
        fontSize: "13px",
        fontWeight: "600",
    },

    filterPill: (bg, color) => ({
        background: bg,
        color,
        padding: "6px 11px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "700",
    }),

    stateBlock: {
        padding: "70px 20px",
        textAlign: "center",
        color: "#718096",
    },

    errorBlock: {
        background: "#fff5f5",
        border: "1px solid #fecaca",
        color: "#b91c1c",
        borderRadius: "10px",
        padding: "15px",
        marginTop: "10px",
    },

    tableWrapper: {
        overflowX: "auto",
        border: "1px solid #e6ebf2",
        borderRadius: "12px",
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
        minWidth: "850px",
    },

    theadRow: {
        background: "#f1f5ff",
    },

    th: {
        textAlign: "left",
        padding: "15px 16px",
        fontSize: "12px",
        fontWeight: "800",
        color: "#174ea6",
        letterSpacing: "0.7px",
        whiteSpace: "nowrap",
    },

    td: {
        padding: "18px 16px",
        fontSize: "14px",
        color: "#334155",
        whiteSpace: "nowrap",
    },

    row: {
        borderTop: "1px solid #edf1f5",
    },

    typeBadge: (isDeposit) => ({
        display: "inline-flex",
        alignItems: "center",
        padding: "7px 13px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "800",
        background: isDeposit ? "#dcfce7" : "#fff3cd",
        color: isDeposit ? "#15803d" : "#b45309",
    }),

    amountText: (isDeposit) => ({
        fontWeight: "800",
        color: isDeposit ? "#15803d" : "#b45309",
    }),

    tableFooter: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "18px",
        color: "#8793a5",
        fontSize: "13px",
    },

    // ---- AdminTransactionReport specific ----
    adminEyebrow: {
        fontSize: "14px",
        fontWeight: "700",
        letterSpacing: "2px",
        color: "#1666C5",
        marginBottom: "8px",
    },

    adminStatsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "20px",
        marginBottom: "25px",
    },

    adminStatCard: (borderColor) => ({
        margin: 0,
        padding: "25px",
        ...(borderColor ? { borderColor } : {}),
    }),

    adminStatLabel: (color) => ({
        color,
        fontSize: "13px",
        fontWeight: "700",
        letterSpacing: "1px",
        textTransform: "uppercase",
    }),

    adminStatValue: (color) => ({
        fontSize: "30px",
        fontWeight: "800",
        marginTop: "12px",
        color,
    }),

    adminFiltersRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "20px",
        flexWrap: "wrap",
        marginBottom: "25px",
    },

    adminSectionTitle: {
        margin: 0,
        color: "#172033",
        fontSize: "22px",
    },

    adminSectionSubtitle: {
        marginTop: "7px",
        marginBottom: 0,
        color: "#718096",
    },

    adminFilterControls: {
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
    },

    adminResetButton: {
        background: "#FFFFFF",
        color: "#172033",
        border: "1px solid #D8E1EC",
        minWidth: "100px",
    },

    adminCountBar: {
        padding: "12px 16px",
        background: "#F8FAFC",
        border: "1px solid #E2E8F0",
        borderRadius: "10px",
        marginBottom: "20px",
        color: "#64748B",
        fontSize: "14px",
    },

    adminCountHighlight: {
        marginLeft: "10px",
        color: "#1666C5",
        fontWeight: "700",
    },

    adminErrorBox: {
        background: "#FFF5F5",
        border: "1px solid #FECACA",
        color: "#B91C1C",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "20px",
    },

    adminLoadingBox: {
        textAlign: "center",
        padding: "50px",
        color: "#64748B",
    },

    adminEmptyBox: {
        textAlign: "center",
        padding: "45px 20px",
        background: "#F8FAFC",
        border: "1px dashed #CBD5E1",
        borderRadius: "14px",
    },

    adminFilteredEmptyBox: {
        textAlign: "center",
        padding: "35px",
        color: "#64748B",
        background: "#F8FAFC",
        borderRadius: "12px",
    },

    adminTypeBadge: (typeData) => ({
        display: "inline-flex",
        alignItems: "center",
        padding: "7px 13px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "800",
        background: typeData.background,
        color: typeData.color,
    }),

    adminIdCell: {
        fontWeight: "700",
        color: "#1666C5",
    },

    adminAmountCell: (isDeposit) => ({
        fontWeight: "800",
        color: isDeposit ? "#15803D" : "#B45309",
    }),
};

export default transactionStyles;
