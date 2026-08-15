import colors from "./colors";
import typography from "./typography";

 
const buttonStyles = {
    primary: {
        height: "54px",
        borderRadius: "10px",
        border: "none",
        background: "linear-gradient(135deg,#0862bd,#176fca)",
        color: colors.white,
        fontWeight: typography.weight.bold,
        cursor: "pointer",
        fontSize: typography.size.md,
        boxShadow: "0 8px 18px rgba(10,96,190,.20)",
    },

    secondary: {
        height: "48px",
        borderRadius: "10px",
        border: `1px solid ${colors.borderLight}`,
        background: colors.white,
        color: colors.textSecondary,
        fontWeight: typography.weight.bold,
        cursor: "pointer",
        fontSize: typography.size.md,
    },

    danger: {
        height: "48px",
        borderRadius: "10px",
        border: "none",
        background: "linear-gradient(135deg,#dc2626,#ef4444)",
        color: colors.white,
        fontWeight: typography.weight.bold,
        cursor: "pointer",
        fontSize: typography.size.md,
    },

    link: {
        border: "none",
        background: "transparent",
        color: colors.brandBlue,
        fontWeight: typography.weight.bold,
        cursor: "pointer",
        marginLeft: "6px",
        fontSize: typography.size.md,
    },

    fullWidth: {
        width: "100%",
    },
};

export default buttonStyles;
