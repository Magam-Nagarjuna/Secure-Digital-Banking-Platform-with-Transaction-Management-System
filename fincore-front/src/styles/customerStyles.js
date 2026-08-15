import colors from "./colors";


const customerStyles = {
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "18px",
        marginBottom: "22px",
    },

    directoryCard: {
        padding: 0,
        overflow: "hidden",
    },

    cardHeader: {
        padding: "22px 26px 20px",
        borderBottom: "1px solid #e8edf4",
    },

    usernamePill: {
        display: "inline-block",
        background: "#f3f6fa",
        border: "1px solid #e2e8f0",
        padding: "7px 11px",
        borderRadius: "8px",
        fontSize: "12px",
        fontWeight: "700",
        color: colors.textMuted,
    },

    tableFooter: {
        padding: "16px 26px",
        borderTop: "1px solid #e8edf4",
        background: "#fbfcfe",
        color: "#718198",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },

    tableFooterDot: {
        color: colors.success,
        fontSize: "9px",
    },

    // ---- PendingCustomerList specific ----
    pendingPageHeader: {
        maxWidth: "1450px",
        margin: "0 auto",
        padding: "28px 35px 25px",
    },

    pendingBackRow: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        marginBottom: "24px",
        minHeight: "42px",
    },

    pendingTitleRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: "25px",
        flexWrap: "wrap",
    },

    pendingEyebrow: {
        color: "#0864c7",
        fontSize: "12px",
        fontWeight: "800",
        letterSpacing: "2px",
        marginBottom: "8px",
    },

    pendingHeading: {
        margin: 0,
        color: "#172238",
        fontSize: "32px",
        fontWeight: "800",
        lineHeight: "1.2",
    },

    pendingSubheading: {
        margin: "9px 0 0",
        color: "#7b8aa1",
        fontSize: "15px",
    },

    pendingCountCard: {
        minWidth: "155px",
        background: "#ffffff",
        border: "1px solid #e1e7ef",
        borderRadius: "14px",
        padding: "15px 20px",
        boxShadow: "0 6px 20px rgba(20,40,80,.05)",
    },

    pendingCountLabel: {
        fontSize: "11px",
        fontWeight: "800",
        color: colors.grayIcon,
        letterSpacing: "1.2px",
        marginBottom: "5px",
    },

    pendingCountRow: {
        display: "flex",
        alignItems: "center",
        gap: "9px",
    },

    pendingCountValue: {
        fontSize: "26px",
        fontWeight: "800",
        color: colors.textPrimary,
    },

    pendingCountDot: {
        width: "9px",
        height: "9px",
        borderRadius: "50%",
        background: "#f59e0b",
        display: "inline-block",
    },

    pendingMain: {
        maxWidth: "1450px",
        margin: "0 auto",
        padding: "0 35px",
    },

    pendingCard: {
        background: "#ffffff",
        border: "1px solid #e1e7ef",
        borderRadius: "20px",
        boxShadow: "0 12px 35px rgba(20,40,80,.06)",
        overflow: "hidden",
    },

    pendingCardTop: {
        padding: "25px 28px",
        borderBottom: "1px solid #e7ebf1",
        display: "flex",
        alignItems: "center",
        gap: "14px",
    },

    pendingCardIcon: {
        width: "44px",
        height: "44px",
        borderRadius: "12px",
        background: "#eff5ff",
        color: "#0864c7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "19px",
        fontWeight: "800",
        flexShrink: 0,
    },

    pendingCardTitle: {
        margin: 0,
        color: "#172238",
        fontSize: "19px",
        fontWeight: "800",
    },

    pendingCardSubtitle: {
        margin: "4px 0 0",
        color: colors.grayIcon,
        fontSize: "13px",
    },

    pendingTh: (isActions) => ({
        padding: "15px 18px",
        textAlign: isActions ? "center" : "left",
        color: "#64748b",
        fontSize: "11px",
        fontWeight: "800",
        letterSpacing: "0.7px",
        textTransform: "uppercase",
        borderBottom: "1px solid #e5eaf1",
        whiteSpace: "nowrap",
    }),

    pendingRow: {
        borderBottom: "1px solid #edf0f4",
    },

    pendingCellId: {
        padding: "18px",
        color: "#0864c7",
        fontWeight: "700",
        fontSize: "13px",
    },

    pendingCellBase: {
        padding: "18px",
        color: "#64748b",
        fontSize: "13px",
    },

    pendingAvatarRow: {
        display: "flex",
        alignItems: "center",
        gap: "11px",
    },

    pendingAvatarCircle: {
        width: "38px",
        height: "38px",
        borderRadius: "50%",
        background: colors.brandBlueSurface,
        color: colors.brandBlue,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "800",
        fontSize: "14px",
        flexShrink: 0,
    },

    pendingCustomerName: {
        color: "#172238",
        fontWeight: "700",
        fontSize: "13px",
        whiteSpace: "nowrap",
    },

    pendingCustomerTag: {
        color: "#94a3b8",
        fontSize: "11px",
        marginTop: "3px",
    },

    pendingAddressCell: {
        maxWidth: "220px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },

    pendingUsernameCell: {
        padding: "18px",
        color: "#334155",
        fontSize: "13px",
        fontWeight: "600",
    },

    pendingStatusBadge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        padding: "7px 11px",
        borderRadius: "20px",
        background: "#fff7e6",
        color: "#b77908",
        fontSize: "11px",
        fontWeight: "800",
        whiteSpace: "nowrap",
    },

    pendingStatusDot: {
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: "#f59e0b",
    },

    pendingEmptyIcon: {
        width: "65px",
        height: "65px",
        borderRadius: "18px",
        background: "#eff6ff",
        color: "#2563eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 18px",
        fontSize: "26px",
        fontWeight: "800",
    },

    pendingCardFooter: {
        padding: "16px 24px",
        borderTop: "1px solid #edf0f4",
        background: "#fbfcfe",
        color: colors.grayIcon,
        fontSize: "12px",
    },

    // ---- CustomerEntry specific ----
    entryHeader: {
        height: "84px",
        background: colors.white,
        borderBottom: "1px solid #e5eaf1",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 42px",
        position: "sticky",
        top: 0,
        zIndex: 100,
    },

    entryLogoRow: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        minWidth: "260px",
    },

    entryBrandTitle: {
        fontSize: "25px",
        fontWeight: "800",
        color: "#075fc2",
        lineHeight: "25px",
    },

    entryBrandSubtitle: {
        fontSize: "10px",
        fontWeight: "700",
        letterSpacing: "3px",
        color: "#8090a6",
        marginTop: "4px",
    },

    entrySecureSession: {
        display: "flex",
        alignItems: "center",
        gap: "9px",
        color: "#52627a",
        fontSize: "14px",
    },

    entrySecureDot: {
        width: "9px",
        height: "9px",
        borderRadius: "50%",
        background: "#16a05d",
        display: "inline-block",
    },

    entryMain: {
        maxWidth: "1390px",
        margin: "0 auto",
        padding: "42px 30px 70px",
    },

    entryIntro: {
        marginBottom: "30px",
    },

    entryEyebrow: {
        color: "#0864c7",
        fontSize: "12px",
        fontWeight: "800",
        letterSpacing: "2px",
        marginBottom: "7px",
    },

    entryHeading: {
        margin: 0,
        color: "#172238",
        fontSize: "32px",
        fontWeight: "800",
    },

    entrySubheading: {
        marginTop: "8px",
        marginBottom: 0,
        color: "#7b8aa1",
        fontSize: "15px",
    },

    entrySuccessBanner: {
        background: "#ecfdf3",
        border: "1px solid #bcebd0",
        borderRadius: "12px",
        padding: "15px 20px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        gap: "13px",
    },

    entrySuccessIcon: {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        background: "#d8f7e6",
        color: "#159455",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "800",
    },

    entrySuccessTitle: {
        fontWeight: "700",
        color: "#167346",
    },

    entrySuccessSubtitle: {
        fontSize: "13px",
        color: "#4d7b62",
        marginTop: "3px",
    },

    entryGrid: {
        display: "grid",
        gridTemplateColumns: "minmax(300px, .78fr) minmax(600px, 1.7fr)",
        gap: "28px",
        alignItems: "start",
    },

    entryPromoPanel: {
        minHeight: "360px",
        borderRadius: "20px",
        padding: "40px 32px",
        background: "linear-gradient(145deg,#0759b5,#1976d2)",
        color: colors.white,
        boxShadow: "0 18px 35px rgba(14,93,180,.20)",
        position: "relative",
        overflow: "hidden",
    },

    entryPromoBadge: {
        width: "58px",
        height: "58px",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "44px",
        overflow: "hidden",
    },

    entryPromoEyebrow: {
        fontSize: "12px",
        fontWeight: "800",
        letterSpacing: "2px",
        opacity: ".75",
        marginBottom: "14px",
    },

    entryPromoHeading: {
        fontSize: "30px",
        lineHeight: "1.2",
        margin: 0,
        maxWidth: "360px",
        fontWeight: "800",
    },

    entryPromoText: {
        marginTop: "20px",
        fontSize: "14px",
        lineHeight: "1.7",
        color: "rgba(255,255,255,.82)",
        maxWidth: "390px",
    },

    entryPromoDecoration: {
        position: "absolute",
        width: "230px",
        height: "230px",
        border: "1px solid rgba(255,255,255,.15)",
        borderRadius: "50%",
        right: "-90px",
        bottom: "-90px",
    },

    entrySecurityCard: {
        background: colors.white,
        border: "1px solid #e1e7ef",
        borderRadius: "18px",
        padding: "25px",
        marginTop: "20px",
        boxShadow: "0 8px 25px rgba(20,40,80,.05)",
    },

    entrySecurityRow: (isLast) => ({
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: isLast ? 0 : "18px",
    }),

    entrySecurityIcon: {
        width: "23px",
        height: "23px",
        borderRadius: "50%",
        background: "#eaf8f0",
        color: "#15935a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "13px",
        fontWeight: "800",
        flexShrink: 0,
    },

    entrySecurityText: {
        fontSize: "13px",
        color: "#687992",
    },

    entryFormCard: {
        background: colors.white,
        border: "1px solid #e1e7ef",
        borderRadius: "20px",
        padding: "38px 40px",
        boxShadow: "0 12px 35px rgba(20,40,80,.06)",
    },

    entryFormHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderBottom: "1px solid #e7ebf1",
        paddingBottom: "25px",
        marginBottom: "28px",
    },

    entryFormEyebrow: {
        color: "#0864c7",
        fontSize: "11px",
        fontWeight: "800",
        letterSpacing: "2px",
        marginBottom: "8px",
    },

    entryFormTitle: {
        margin: 0,
        color: "#172238",
        fontSize: "25px",
        fontWeight: "800",
    },

    entryFormSubtitle: {
        margin: "6px 0 0",
        color: "#8794a8",
        fontSize: "14px",
    },

    entryFormBadge: {
        width: "42px",
        height: "42px",
        borderRadius: "12px",
        background: "#eff5ff",
        color: "#0963c5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "800",
        fontSize: "13px",
    },

    entryFieldGroup: {
        marginBottom: "24px",
    },

    entryHelpText: {
        marginTop: "7px",
        fontSize: "12px",
        color: "#9aa7ba",
    },

    entryInput: {
        width: "100%",
        height: "52px",
        boxSizing: "border-box",
        border: "1px solid #dce3ec",
        borderRadius: "10px",
        background: colors.white,
        padding: "0 16px",
        fontSize: "14px",
        color: "#24344d",
        outline: "none",
    },

    entryReadOnlyInput: {
        width: "100%",
        height: "52px",
        boxSizing: "border-box",
        border: "1px solid #dce3ec",
        borderRadius: "10px",
        background: "#f5f7fa",
        padding: "0 16px",
        fontSize: "14px",
        color: "#66758a",
        outline: "none",
    },

    entryDateGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "18px",
        marginBottom: "30px",
    },

    entryStatusBox: {
        background: "#f8fafc",
        border: "1px solid #e6ebf1",
        borderRadius: "11px",
        padding: "14px 16px",
        marginBottom: "25px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },

    entryStatusDot: {
        width: "9px",
        height: "9px",
        borderRadius: "50%",
        background: "#f59e0b",
        flexShrink: 0,
    },

    entryStatusTitle: {
        fontSize: "13px",
        color: "#334155",
        fontWeight: "700",
    },

    entryStatusText: {
        fontSize: "12px",
        color: "#94a3b8",
        marginTop: "3px",
    },

    entryButtonRow: {
        display: "grid",
        gridTemplateColumns: "110px 1fr",
        gap: "12px",
    },

    entryResetButton: {
        height: "52px",
        borderRadius: "10px",
        border: "1px solid #dce3ec",
        background: colors.white,
        color: "#334155",
        fontWeight: "700",
        cursor: "pointer",
        fontSize: "14px",
    },

    entrySubmitButton: {
        height: "52px",
        borderRadius: "10px",
        border: "none",
        background: "linear-gradient(135deg,#0862bd,#176fca)",
        color: colors.white,
        fontWeight: "700",
        cursor: "pointer",
        fontSize: "14px",
        boxShadow: "0 8px 18px rgba(10,96,190,.20)",
    },

    entrySecureFooter: {
        textAlign: "center",
        marginTop: "18px",
        color: "#9aa7ba",
        fontSize: "12px",
    },
};

export default customerStyles;
