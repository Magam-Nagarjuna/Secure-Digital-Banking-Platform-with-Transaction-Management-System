import colors from "./colors";
import typography from "./typography";


const layoutStyles = {
    
    pageShell: {
        minHeight: "100vh",
        background: colors.pageBackground,
        fontFamily: typography.fontFamily,
        display: "flex",
        flexDirection: "column",
    },

    dashboardShell: {
        minHeight: "100vh",
        background: "#f5f8fc",
        color: colors.textInk,
    },

    simpleHeader: {
        height: "84px",
        background: colors.white,
        borderBottom: `1px solid ${colors.borderFaint}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 42px",
        boxSizing: "border-box",
    },

    brandRow: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },

    brandLogo: {
        width: "52px",
        height: "52px",
        objectFit: "contain",
    },

    brandTitle: {
        fontSize: typography.size.title,
        fontWeight: typography.weight.black,
        color: colors.brandBlueDark,
        lineHeight: "25px",
    },

    brandSubtitle: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.bold,
        letterSpacing: "3px",
        color: colors.textFaint,
        marginTop: "4px",
    },

    secureSession: {
        display: "flex",
        alignItems: "center",
        gap: "9px",
        color: colors.textMuted,
        fontSize: typography.size.md,
    },

    secureDot: {
        width: "9px",
        height: "9px",
        borderRadius: "50%",
        background: colors.success,
        display: "inline-block",
    },

    dashboardHeader: {
        background: colors.white,
        borderBottom: `1px solid ${colors.borderGray}`,
        padding: "18px 0",
        boxShadow: "0 2px 10px rgba(0,0,0,.05)",
    },

    dashboardHeaderRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap",
    },

    dashboardBrandRow: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
    },

    dashboardLogo: {
        width: "65px",
        height: "65px",
        objectFit: "contain",
    },

    dashboardBrandTitle: {
        margin: 0,
        fontWeight: typography.weight.bold,
        color: colors.textInk,
        fontSize: "28px",
    },

    dashboardBrandSubtitle: {
        color: colors.gray500,
        fontSize: "15px",
    },

    welcomePill: {
        background: colors.brandBlueTint,
        color: colors.accentBlue,
        padding: "10px 18px",
        borderRadius: "30px",
        fontWeight: typography.weight.medium,
        whiteSpace: "nowrap",
    },

    navBar: {
        background: colors.white,
        borderBottom: `1px solid ${colors.borderGray}`,
        boxShadow: "0 2px 8px rgba(0,0,0,.04)",
    },

    navBrand: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: colors.accentBlue,
        fontWeight: typography.weight.bold,
        cursor: "pointer",
    },

    navBrandLogo: {
        width: "35px",
        height: "35px",
        objectFit: "contain",
    },

    logoutLink: {
        color: "#DC2626",
        fontWeight: typography.weight.medium,
        cursor: "pointer",
    },

    dashboardMain: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px 60px",
    },

    contentMain: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "45px 25px 60px",
        boxSizing: "border-box",
    },

    pageFooter: {
        textAlign: "center",
        padding: "15px",
        color: "#94a0b2",
        fontSize: typography.size.sm,
    },

    cardsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
    },
};

export default layoutStyles;
