import React from "react";


const FormRow = ({ children, style = {} }) => {

    return (
        <div className="row" style={style}>
            {children}
        </div>
    );
};

export default FormRow;
