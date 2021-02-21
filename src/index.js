import React from "react";
import PropTypes from "prop-types";

/**
 *
 */
const EpochPicker = function ({ children, Tag, className, style, extraAttributes }) {
    return (
        <Tag {...extraAttributes} className={className} style={style}>
            {children}
        </Tag>
    );
};

EpochPicker.defaultProps = {
    className: "",
    style: {},
    Tag: "button",
    extraAttributes: {},
};

EpochPicker.propTypes = {
    // required
    // children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    // optional
    Tag: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    extraAttributes: PropTypes.object,
};

export default EpochPicker;
