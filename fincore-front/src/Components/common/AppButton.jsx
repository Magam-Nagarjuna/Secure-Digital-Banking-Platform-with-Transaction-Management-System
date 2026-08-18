import React from "react";
import buttonStyles from "../../styles/buttonStyles";


const AppButton = ({
    variant = "primary",
    fullWidth = false,
    type = "button",
    className = "",
    style = {},
    children,
    ...rest
}) => {

    const base = buttonStyles[variant] || buttonStyles.primary;

    const mergedStyle = {
        ...base,
        ...(fullWidth ? buttonStyles.fullWidth : {}),
        ...style,
    };

    const finClass = variant === "primary" || variant === "danger"
        ? "fin-btn"
        : "";

    return (
        <button
            type={type}
            className={`${finClass} ${className}`.trim()}
            style={mergedStyle}
            {...rest}
        >
            {children}
        </button>
    );
};

export default AppButton;
