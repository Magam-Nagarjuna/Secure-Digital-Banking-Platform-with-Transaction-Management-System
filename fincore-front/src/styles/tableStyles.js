import colors from "./colors";

const tableStyles = {
    wrapper: {
        overflowX: "auto",
    },

    table: {
        minWidth: "1100px",
    },

    idCell: {
        color: colors.brandBlue,
        fontWeight: "800",
    },

    avatarCell: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },

    avatarCircle: {
        width: "38px",
        height: "38px",
        flexShrink: 0,
        borderRadius: "50%",
        background: colors.brandBlueSurface,
        color: colors.brandBlue,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        fontSize: "13px",
    },

    muted: {
        color: colors.textFaintAlt,
        fontSize: "13px",
    },

    actionsCell: {
        display: "flex",
        gap: "8px",
        alignItems: "center",
    },
};

export default tableStyles;
