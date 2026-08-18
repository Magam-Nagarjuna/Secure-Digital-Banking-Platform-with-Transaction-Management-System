import React from "react";
import { Link } from "react-router-dom";

const VARIANTS = {
    success: {
        border: "none",
        background: "#16a05d",
        color: "#ffffff",
    },
    danger: {
        border: "1px solid #fecaca",
        background: "#fff5f5",
        color: "#dc2626",
    },
    neutral: {
        border: "1px solid #dce3ec",
        background: "#ffffff",
        color: "#24344d",
    },
    primary: {
        border: "none",
        background: "#0864c7",
        color: "#ffffff",
    },
};

const ActionButtons = ({ actions = [] }) => {

    return (
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {actions.map((action) => {

                const style = {
                    height: "36px",
                    padding: "0 14px",
                    borderRadius: "8px",
                    fontWeight: "700",
                    fontSize: "12px",
                    cursor: "pointer",
                    ...(VARIANTS[action.variant] || VARIANTS.neutral),
                };

                const button = (
                    <button type="button" style={style} onClick={action.onClick}>
                        {action.label}
                    </button>
                );

                if (action.to) {
                    return (
                        <Link
                            key={action.key || action.label}
                            to={action.to}
                            style={{ textDecoration: "none" }}
                        >
                            {button}
                        </Link>
                    );
                }

                return (
                    <React.Fragment key={action.key || action.label}>
                        {button}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default ActionButtons;
