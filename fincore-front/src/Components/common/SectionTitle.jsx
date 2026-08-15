import React from "react";
import commonStyles from "../../styles/commonStyles";

/**
 * Section heading + subtitle used above dashboard card grids
 * ("Quick access", "Banking services"...).
 */
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
