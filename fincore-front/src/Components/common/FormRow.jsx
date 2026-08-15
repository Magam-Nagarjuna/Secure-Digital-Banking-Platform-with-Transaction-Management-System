import React from "react";

/**
 * Thin wrapper around Bootstrap's `.row` class, used to lay out
 * paired form fields (e.g. two `col-md-6` fields per line) exactly
 * like the original markup in AccountDetails/CustomerEntry/etc.
 */
const FormRow = ({ children, style = {} }) => {

    return (
        <div className="row" style={style}>
            {children}
        </div>
    );
};

export default FormRow;
