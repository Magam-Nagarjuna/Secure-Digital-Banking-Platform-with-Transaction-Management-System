import React from "react";

/**
 * `.col-md-6.mb-4` wrapper with a bold form-label, used for the
 * read-only detail grids (AccountDetails) and other Bootstrap-
 * class-based field groups. For fully interactive fields with
 * validation, prefer <AppInput /> / <AppSelect /> instead.
 */
const FormField = ({ label, colClass = "col-md-6 mb-4", children }) => {

    return (
        <div className={colClass}>
            <label className="form-label fw-bold">{label}</label>
            {children}
        </div>
    );
};

export default FormField;
