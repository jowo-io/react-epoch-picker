import React from "react";
import PropTypes, { epochsLayoutPropTypes, arrayEpochPropTypes } from "../utils/propTypes";

/**
 * renders a list of keys which when clicked will select which epoch tree to use
 */
function ArrayEpoch({ activeEpoch, onClick, layout }) {
    const { wrapper: Wrapper, key: Key } = layout;
    return (
        <Wrapper>
            {activeEpoch.map(({ key }) => (
                <Key onClick={() => onClick(key)} key={key}>
                    {key}
                </Key>
            ))}
        </Wrapper>
    );
}

ArrayEpoch.propTypes = {
    // required
    activeEpoch: arrayEpochPropTypes.isRequired,
    onClick: PropTypes.func.isRequired,
    layout: epochsLayoutPropTypes.isRequired,
    // optional
    // ...
};

export default ArrayEpoch;
