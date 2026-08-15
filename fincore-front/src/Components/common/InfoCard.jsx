import React from "react";
import colors from "../../styles/colors";

/**
 * Small stat card: eyebrow label, large value, icon chip.
 * Used for the "TOTAL CUSTOMERS / APPROVED / PENDING" style
 * summary rows on CustomerReport, AccountList, TransactionReport,
 * AdminTransactionReport, etc.
 */
const InfoCard = ({ label, value, icon, iconBg, iconColor, style = {} }) => {

    return (
        <div className="fin-card" style={{ margin: 0, padding: "24px", ...style }}>

            <div
                style={{
                    color: colors.grayIconAlt,
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: ".5px",
                }}
            >
                {label}
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "10px",
                }}
            >
                <strong style={{ fontSize: "30px", color: colors.textPrimary }}>
                    {value}
                </strong>

                {icon && (
                    <div
                        style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "13px",
                            background: iconBg || colors.brandBlueSurface,
                            color: iconColor,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                            fontWeight: "800",
                        }}
                    >
                        {icon}
                    </div>
                )}
            </div>

        </div>
    );
};

export default InfoCard;
