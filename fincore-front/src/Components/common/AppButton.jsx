import React from "react";
import buttonStyles from "../../styles/buttonStyles";

/**
 * Shared button used across every page for submit/cancel/link
 * style actions. `variant` picks the style object, `fullWidth`
 * stretches it to 100%, and any extra `style` is merged last so
 * a page can still override a one-off value.
 *
 * variants: "primary" | "secondary" | "danger" | "link"
 */
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
