import React from "react";
import commonStyles from "../../styles/commonStyles";


const SectionTitle = ({ title, subtitle, style = {} }) => {

    return (
        <div style={style}>
            <h2 style={commonStyles.sectionTitle}>{title}</h2>
            {subtitle && (
                <p style={commonStyles.sectionSubtitle}>{subtitle}</p>
            )}
        </div>
    );
};

export default SectionTitle;
