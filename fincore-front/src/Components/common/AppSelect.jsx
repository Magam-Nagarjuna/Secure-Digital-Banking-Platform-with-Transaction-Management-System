import React from "react";
import formStyles from "../../styles/formStyles";

/**
 * Label + select + inline error message. Mirrors AppInput so
 * dropdown fields (status, account type, etc.) look identical
 * to text fields.
 */
const AppSelect = ({
    label,
    name,
    error,
    options = [],
    placeholder,
    wrapperStyle = {},
    selectStyle = {},
    required = false,
    children,
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

            <select
                id={name}
                name={name}
                className="fin-input"
                style={{
                    ...formStyles.input,
                    borderColor: error
                        ? formStyles.inputError.borderColor
                        : formStyles.inputValid.borderColor,
                    ...selectStyle,
                }}
                {...rest}
            >
                {placeholder && (
                    <option value="">{placeholder}</option>
                )}

                {children}

                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            {error && <div style={formStyles.errorText}>{error}</div>}

        </div>
    );
};

export default AppSelect;
