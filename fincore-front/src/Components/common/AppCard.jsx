import React from "react";
import commonStyles from "../../styles/commonStyles";

/**
 * Numbered "quick access" card used on AdminMenu / CustomerMenu
 * dashboards (e.g. "01 Customer List", "02 Pending Customers"...).
 * Also usable as a generic bordered card when `number` is omitted.
 */
const AppCard = ({
    number,
    iconBg,
    iconColor,
    iconClassName,
    linkClassName,
    title,
    description,
    linkLabel,
    onClick,
    className = "",
    style = {},
    children,
}) => {

    const cardStyle = {
        ...commonStyles.card,
        ...(onClick ? commonStyles.cardClickable : {}),
        ...style,
    };

    return (
        <div className={className} style={cardStyle} onClick={onClick}>

            {number && iconClassName && (
                <div className={iconClassName}>{number}</div>
            )}

            {number && !iconClassName && (
                <div
                    style={{
                        ...commonStyles.cardIcon,
                        background: iconBg || "#EEF2FF",
                        color: iconColor || "#2563EB",
                    }}
                >
                    {number}
                </div>
            )}

            {title && <h3 style={commonStyles.cardTitle}>{title}</h3>}

            {description && (
                linkClassName
                    ? <p className="page-subtitle">{description}</p>
                    : <p style={commonStyles.cardText}>{description}</p>
            )}

            {linkLabel && (
                linkClassName
                    ? <div className={linkClassName}>{linkLabel}</div>
                    : <div style={commonStyles.cardLink}>{linkLabel}</div>
            )}

            {children}
        </div>
    );
};

export default AppCard;
