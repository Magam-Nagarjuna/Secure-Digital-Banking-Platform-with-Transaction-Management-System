import React from "react";
import colors from "../../styles/colors";

/**
 * Header block used at the top of report/entry cards: a "Return
 * Back" link on its own row (so it never overlaps the title),
 * followed by a title + subtitle. Used by CustomerReport,
 * PendingCustomerList, AccountList, TransactionReport, etc.
 */
const PageHeader = ({
    onBack,
    backLabel = "Return Back",
    title,
    subtitle,
    actions,
}) => {

    return (
        <div>
            {onBack && (
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        marginBottom: "20px",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <button
                        type="button"
                        onClick={onBack}
                        style={{
                            background: "none",
                            border: "none",
                            color: colors.brandBlue,
                            fontSize: "14px",
                            fontWeight: "700",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                        }}
                    >
                        <span style={{ fontSize: "16px" }}>←</span>
                        {backLabel}
                    </button>
                </div>
            )}

            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                }}
            >
                <div style={{ width: "100%" }}>
                    {title && (
                        <h2
                            style={{
                                margin: 0,
                                fontSize: "21px",
                                fontWeight: "800",
                                color: colors.textPrimary,
                                lineHeight: "1.3",
                            }}
                        >
                            {title}
                        </h2>
                    )}

                    {subtitle && (
                        <p
                            style={{
                                margin: "6px 0 0",
                                color: colors.grayIconAlt,
                                fontSize: "13px",
                                lineHeight: "1.5",
                            }}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>

                {actions && <div>{actions}</div>}
            </div>
        </div>
    );
};

export default PageHeader;
