import React from "react";


const FormField = ({ label, colClass = "col-md-6 mb-4", children }) => {

    return (
        <div className={colClass}>
            <label className="form-label fw-bold">{label}</label>
            {children}
        </div>
    );
};

export default FormField;
