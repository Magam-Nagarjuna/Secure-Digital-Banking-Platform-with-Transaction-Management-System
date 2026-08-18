import React from "react";


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
