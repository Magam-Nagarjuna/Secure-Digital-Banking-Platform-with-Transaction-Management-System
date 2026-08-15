import React from "react";

/**
 * Colored status pill. Relies on the "status status-success /
 * status-warning / status-danger" CSS classes already defined in
 * DisplayView.css so the look is unchanged; this component just
 * removes the duplicated dot + label markup from every page.
 *
 * variant: "success" | "warning" | "danger"
 */
const StatusBadge = ({ variant = "success", label }) => {

    return (
        <span
            className={`status status-${variant}`}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
            }}
        >
            <span style={{ fontSize: "9px" }}>●</span>
            {label}
        </span>
    );
};

export default StatusBadge;
