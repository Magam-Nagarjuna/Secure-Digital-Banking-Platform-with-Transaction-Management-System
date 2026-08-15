import colors from "./colors";


const accountStyles = {
    page: {
        minHeight: "100vh",
        background: colors.pageBackground,
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
        paddingBottom: "60px",
    },

    header: {
        background: colors.white,
        borderBottom: "1px solid #e5eaf1",
    },

    headerInner: {
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "28px 42px 26px",
    },

    headerRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap",
    },

    eyebrow: {
        fontSize: "11px",
        fontWeight: "800",
        letterSpacing: "2px",
        color: "#0864c7",
        marginBottom: "7px",
    },

    title: {
        margin: 0,
        color: "#172238",
        fontSize: "30px",
        lineHeight: "1.2",
        fontWeight: "800",
    },

    subtitle: {
        margin: "7px 0 0",
        color: "#7c8aa0",
        fontSize: "14px",
    },

    customerPill: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "#f7faff",
        border: "1px solid #dfeaf8",
        borderRadius: "14px",
        padding: "11px 17px",
    },

    customerAvatar: {
        width: "40px",
        height: "40px",
        flexShrink: 0,
        borderRadius: "50%",
        background: colors.brandBlueSurface,
        color: colors.brandBlue,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "800",
        fontSize: "16px",
    },

    customerName: {
        color: "#26364f",
        fontWeight: "700",
        fontSize: "13px",
    },

    customerId: {
        color: "#8996a9",
        fontSize: "11px",
        marginTop: "3px",
    },

    main: {
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "28px 30px 50px",
    },

    backRow: {
        position: "static",
        width: "100%",
        height: "44px",
        display: "flex",
        alignItems: "center",
        marginBottom: "24px",
        zIndex: 1,
    },

    backButton: {
        position: "static",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        height: "42px",
        padding: "0 18px",
        border: "1px solid #dce5ef",
        borderRadius: "10px",
        background: colors.white,
        color: "#172238",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(20,40,80,.04)",
    },

    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))",
        gap: "16px",
        marginBottom: "24px",
    },

    statCard: {
        background: colors.white,
        border: "1px solid #e1e7ef",
        borderRadius: "15px",
        padding: "18px 20px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        boxShadow: "0 6px 20px rgba(20,40,80,.04)",
    },

    statIcon: (background) => ({
        width: "42px",
        height: "42px",
        borderRadius: "11px",
        background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "17px",
        fontWeight: "800",
    }),

    statLabel: {
        color: "#8491a5",
        fontSize: "11px",
        fontWeight: "700",
        marginBottom: "3px",
    },

    statValue: {
        color: "#172238",
        fontSize: "23px",
        fontWeight: "800",
    },

    portfolioCard: {
        background: colors.white,
        border: "1px solid #e1e7ef",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(20,40,80,.06)",
        overflow: "hidden",
    },

    portfolioHeader: {
        padding: "24px 26px",
        borderBottom: "1px solid #e8edf3",
    },

    portfolioHeaderRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        flexWrap: "wrap",
    },

    portfolioTitle: {
        margin: 0,
        fontSize: "19px",
        color: "#172238",
        fontWeight: "800",
    },

    portfolioSubtitle: {
        margin: "5px 0 0",
        fontSize: "13px",
        color: "#8996a9",
    },

    filterRow: {
        display: "flex",
        gap: "9px",
        marginTop: "20px",
        flexWrap: "wrap",
    },

    filterPill: (active) => ({
        border: active ? "1px solid #0864c7" : "1px solid #dce3ec",
        background: active ? "#eef5ff" : colors.white,
        color: active ? "#075fc2" : "#66758a",
        padding: "8px 15px",
        borderRadius: "8px",
        fontSize: "12px",
        fontWeight: "700",
        cursor: "pointer",
    }),

    th: {
        padding: "14px 20px",
        textAlign: "left",
        color: "#738198",
        fontSize: "11px",
        fontWeight: "800",
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
    },

    td: {
        padding: "17px 20px",
        color: "#52627a",
        fontSize: "12px",
        whiteSpace: "nowrap",
    },

    accountCell: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },

    accountIcon: {
        width: "42px",
        height: "42px",
        borderRadius: "11px",
        background: colors.brandBlueSurface,
        color: colors.brandBlue,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        fontWeight: "800",
    },

    accountNumber: {
        color: "#1d2a40",
        fontSize: "14px",
        fontWeight: "800",
    },

    accountTag: {
        color: "#94a3b8",
        fontSize: "11px",
        marginTop: "3px",
    },

    typePill: {
        display: "inline-block",
        background: "#f4f7fb",
        border: "1px solid #e3e8ef",
        borderRadius: "8px",
        padding: "7px 11px",
        color: "#52627a",
        fontSize: "12px",
        fontWeight: "700",
    },

    balanceValue: {
        color: "#172238",
        fontSize: "15px",
        fontWeight: "800",
    },

    balanceCaption: {
        color: "#94a3b8",
        fontSize: "10px",
        marginTop: "3px",
    },

    statusPill: (status) => ({
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        background: status.background,
        color: status.color,
        border: `1px solid ${status.border}`,
        borderRadius: "20px",
        padding: "6px 11px",
        fontSize: "11px",
        fontWeight: "700",
    }),

    statusDot: (color) => ({
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: color,
    }),

    viewButton: {
        border: "1px solid #cfe0f5",
        background: "#f3f8ff",
        color: "#075fc2",
        borderRadius: "8px",
        padding: "9px 15px",
        fontSize: "12px",
        fontWeight: "700",
        cursor: "pointer",
    },

    footer: {
        padding: "15px 22px",
        borderTop: "1px solid #edf1f5",
        background: "#fafbfd",
        color: "#8a97aa",
        fontSize: "11px",
    },

    // ---- AccountEntry specific ----
    entryPage: {
        minHeight: "100vh",
        background: colors.pageBackground,
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
    },

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
        gap: "14px",
        minWidth: "280px",
    },

    entryBrandTitle: {
        fontSize: "27px",
        fontWeight: "800",
        color: "#075fc2",
        lineHeight: "27px",
    },

    entryBrandSubtitle: {
        fontSize: "10px",
        fontWeight: "700",
        letterSpacing: "3px",
        color: "#8090a6",
        marginTop: "4px",
    },

    entryUserArea: {
        display: "flex",
        alignItems: "center",
        gap: "28px",
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

    entryUserRow: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },

    entryUserAvatar: {
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        background: colors.brandBlueSurface,
        color: "#1165c5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "800",
        fontSize: "18px",
    },

    entryUserName: {
        fontSize: "14px",
        fontWeight: "700",
        color: "#17233a",
    },

    entryUserRole: {
        fontSize: "12px",
        color: "#8a97aa",
        marginTop: "3px",
    },

    entryMain: {
        maxWidth: "1390px",
        margin: "0 auto",
        padding: "34px 30px 70px",
    },

    entryBackRow: {
        width: "100%",
        marginBottom: "28px",
        display: "flex",
        alignItems: "center",
    },

    entryBackButton: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "9px",
        height: "44px",
        padding: "0 18px",
        border: "1px solid #d7e0eb",
        borderRadius: "10px",
        background: colors.white,
        color: "#24344d",
        fontSize: "14px",
        fontWeight: "700",
        cursor: "pointer",
        boxShadow: "0 3px 10px rgba(20,40,80,0.06)",
        transition: "all 0.2s ease",
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
        gridTemplateColumns: "minmax(300px, 0.78fr) minmax(600px, 1.7fr)",
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
        fontSize: "28px",
        fontWeight: "800",
        marginBottom: "44px",
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

    entryWarningText: {
        marginTop: "8px",
        fontSize: "12px",
        color: "#d97706",
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

export default accountStyles;
