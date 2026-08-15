import React from "react";
import commonStyles from "../../styles/commonStyles";

/**
 * Inline alert banner used above forms (e.g. "Invalid username
 * or password", success confirmations). variant: "error" | "success"
 */
const AppAlert = ({ variant = "error", children }) => {

    const boxStyle = variant === "success"
        ? commonStyles.alertSuccess
        : commonStyles.alertError;

    const iconStyle = commonStyles.alertErrorIcon;

    return (
        <div style={boxStyle}>
            <span style={iconStyle}>
                {variant === "success" ? "✓" : "!"}
            </span>
            {children}
        </div>
    );
};

export default AppAlert;
