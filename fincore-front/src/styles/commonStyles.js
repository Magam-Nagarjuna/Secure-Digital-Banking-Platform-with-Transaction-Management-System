import colors from "./colors";
import typography from "./typography";


const commonStyles = {
    card: {
        background: colors.white,
        border: `1px solid ${colors.borderGray}`,
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 15px rgba(15, 23, 42, 0.05)",
    },

    cardClickable: {
        cursor: "pointer",
        transition: "all 0.2s ease",
    },

    cardIcon: {
        width: "42px",
        height: "42px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        fontSize: "14px",
    },

    cardTitle: {
        fontSize: "16px",
        marginTop: "20px",
        fontWeight: "700",
    },

    cardText: {
        color: colors.gray500,
        fontSize: "14px",
        minHeight: "42px",
    },

    cardLink: {
        color: colors.accentBlue,
        fontWeight: "600",
        fontSize: "14px",
        marginTop: "15px",
    },

    eyebrow: {
        color: colors.accentBlue,
        fontSize: "11px",
        fontWeight: 800,
        letterSpacing: ".08em",
        marginBottom: "8px",
    },

    pageTitle: {
        fontSize: "32px",
        fontWeight: "750",
        margin: 0,
        color: colors.textInk,
    },

    pageSubtitle: {
        color: colors.gray500,
        marginTop: "10px",
        fontSize: "15px",
    },

    sectionTitle: {
        fontSize: "22px",
        fontWeight: 750,
        marginBottom: "6px",
        color: colors.textInk,
    },

    sectionSubtitle: {
        color: colors.gray500,
        marginBottom: "22px",
    },

    alertError: {
        background: colors.dangerBg,
        border: `1px solid ${colors.dangerBorder}`,
        borderRadius: "11px",
        padding: "13px 15px",
        marginBottom: "23px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: colors.dangerText,
        fontSize: typography.size.base,
        fontWeight: typography.weight.medium,
    },

    alertErrorIcon: {
        width: "23px",
        height: "23px",
        borderRadius: "50%",
        background: colors.dangerBgAlt,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },

    alertSuccess: {
        background: colors.successBg,
        border: "1px solid #a7f3d0",
        borderRadius: "11px",
        padding: "13px 15px",
        marginBottom: "23px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: "#047857",
        fontSize: typography.size.base,
        fontWeight: typography.weight.medium,
    },

    emptyState: {
        textAlign: "center",
        padding: "60px 20px",
        color: colors.gray500,
    },

    emptyStateIcon: {
        fontSize: "40px",
        marginBottom: "12px",
    },

    emptyStateTitle: {
        fontWeight: typography.weight.bold,
        color: colors.textSecondary,
        fontSize: "16px",
        marginBottom: "6px",
    },

    loaderWrap: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        color: colors.gray500,
        fontSize: "14px",
        gap: "10px",
    },
};

// Status -> color mapping used by StatusBadge across pages.
export const statusColors = {
    active: { bg: colors.successBg, color: "#047857" },
    approved: { bg: colors.successBg, color: "#047857" },
    success: { bg: colors.successBg, color: "#047857" },
    pending: { bg: "#FFF7ED", color: "#EA580C" },
    warning: { bg: "#FFF7ED", color: "#EA580C" },
    rejected: { bg: colors.dangerBg, color: colors.dangerText },
    inactive: { bg: colors.dangerBg, color: colors.dangerText },
    danger: { bg: colors.dangerBg, color: colors.dangerText },
    closed: { bg: "#F1F5F9", color: "#475569" },
    default: { bg: "#F1F5F9", color: "#475569" },
};

export default commonStyles;
