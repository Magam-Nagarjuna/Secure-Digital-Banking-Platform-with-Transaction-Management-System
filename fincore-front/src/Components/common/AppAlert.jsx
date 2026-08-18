import React from "react";
import commonStyles from "../../styles/commonStyles";


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
