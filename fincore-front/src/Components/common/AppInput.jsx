import React from "react";
import formStyles from "../../styles/formStyles";


const AppInput = ({
    label,
    name,
    error,
    wrapperStyle = {},
    inputStyle = {},
    required = false,
    ...rest
}) => {

    return (
        <div style={{ ...formStyles.fieldGroup, ...wrapperStyle }}>

            {label && (
                <label style={formStyles.label} htmlFor={name}>
                    {label}
                    {required && <span style={formStyles.required}>*</span>}
                </label>
            )}

            <input
                id={name}
                name={name}
                className="fin-input"
                style={{
                    ...formStyles.input,
                    borderColor: error
                        ? formStyles.inputError.borderColor
                        : formStyles.inputValid.borderColor,
                    ...inputStyle,
                }}
                {...rest}
            />

            {error && <div style={formStyles.errorText}>{error}</div>}

        </div>
    );
};

export default AppInput;
