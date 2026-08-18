import React from "react";


const EmptyState = ({
    icon = "🗂️",
    title = "No records found",
    message,
    asTableRow = false,
    colSpan = 5,
}) => {

    const content = (
        <div style={{ padding: "65px 20px", textAlign: "center" }}>
            <div
                style={{
                    width: "58px",
                    height: "58px",
                    margin: "0 auto 15px",
                    borderRadius: "16px",
                    background: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "25px",
                }}
            >
                {icon}
            </div>

            <div
                style={{
                    fontWeight: "700",
                    color: "#334155",
                    fontSize: "15px",
                }}
            >
                {title}
            </div>

            {message && (
                <div
                    style={{
                        color: "#94a3b8",
                        fontSize: "13px",
                        marginTop: "6px",
                    }}
                >
                    {message}
                </div>
            )}
        </div>
    );

    if (asTableRow) {
        return (
            <tr>
                <td colSpan={colSpan} style={{ padding: 0 }}>
                    {content}
                </td>
            </tr>
        );
    }

    return content;
};

export default EmptyState;
