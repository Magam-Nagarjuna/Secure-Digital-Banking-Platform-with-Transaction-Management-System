import colors from "./colors";
import typography from "./typography";


const formStyles = {
    label: {
        display: "block",
        marginBottom: "9px",
        color: colors.textSecondary,
        fontSize: typography.size.base,
        fontWeight: typography.weight.bold,
    },

    input: {
        width: "100%",
        height: "52px",
        boxSizing: "border-box",
        border: `1px solid ${colors.borderLight}`,
        borderRadius: "10px",
        background: colors.white,
        padding: "0 16px",
        fontSize: typography.size.md,
        color: colors.textSecondary,
        outline: "none",
    },

    inputError: {
        borderColor: colors.danger,
    },

    inputValid: {
        borderColor: colors.borderLight,
    },

    errorText: {
        marginTop: "7px",
        color: colors.dangerStrong,
        fontSize: typography.size.xsm,
        fontWeight: typography.weight.medium,
    },

    fieldGroup: {
        marginBottom: "23px",
    },

    fieldGroupTight: {
        marginBottom: "16px",
    },

    helpText: {
        marginTop: "6px",
        color: colors.textFaintAlt,
        fontSize: typography.size.xsm,
    },

    required: {
        color: colors.danger,
        marginLeft: "3px",
    },
};

export default formStyles;
