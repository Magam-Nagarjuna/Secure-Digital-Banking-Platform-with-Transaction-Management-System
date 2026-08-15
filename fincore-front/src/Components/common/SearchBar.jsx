import React from "react";
import colors from "../../styles/colors";

/**
 * Search box with a leading magnifier glyph, used on every
 * list/report page (AccountList, CustomerReport, PendingCustomerList,
 * TransactionReport, AdminTransactionReport...).
 */
const SearchBar = ({
    value,
    onChange,
    placeholder = "Search...",
    style = {},
}) => {

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                minWidth: "280px",
                flex: "1",
                maxWidth: "420px",
                ...style,
            }}
        >
            <span
                style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "16px",
                    pointerEvents: "none",
                }}
            >
                🔍
            </span>

            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{
                    width: "100%",
                    height: "44px",
                    boxSizing: "border-box",
                    border: `1px solid ${colors.borderLight}`,
                    borderRadius: "10px",
                    padding: "0 15px 0 42px",
                    fontSize: "13px",
                    outline: "none",
                    color: colors.textSecondary,
                    background: colors.white,
                }}
            />
        </div>
    );
};

export default SearchBar;
