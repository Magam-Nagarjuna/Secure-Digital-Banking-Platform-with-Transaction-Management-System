import React from "react";
import commonStyles from "../../styles/commonStyles";


const Loader = ({ label = "Loading..." }) => {

    return (
        <div style={commonStyles.loaderWrap}>
            <span>⏳</span>
            {label}
        </div>
    );
};

export default Loader;
