import React from "react";
import tableStyles from "../../styles/tableStyles";
import EmptyState from "./EmptyState";


const DataTable = ({
    columns = [],
    rows = [],
    renderRow,
    renderEmpty,
    emptyIcon,
    emptyTitle = "No records found",
    emptyMessage,
    minWidth = "1100px",
}) => {

    return (
        <div style={tableStyles.wrapper}>
            <table className="fin-table" style={{ ...tableStyles.table, minWidth }}>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {rows.length > 0 ? (
                        rows.map((row, index) => renderRow(row, index))
                    ) : renderEmpty ? (
                        renderEmpty()
                    ) : (
                        <EmptyState
                            asTableRow
                            colSpan={columns.length}
                            icon={emptyIcon}
                            title={emptyTitle}
                            message={emptyMessage}
                        />
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
