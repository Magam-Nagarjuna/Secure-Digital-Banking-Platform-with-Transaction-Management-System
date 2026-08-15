import React from "react";
import commonStyles from "../../styles/commonStyles";

/**
 * Simple inline loading indicator used while a page waits for
 * an API response (customer list, account list, reports, etc.).
 */
const Loader = ({ label = "Loading..." }) => {

    return (
        <div style={commonStyles.loaderWrap}>
            <span>⏳</span>
            {label}
        </div>
    );
};

export default Loader;
