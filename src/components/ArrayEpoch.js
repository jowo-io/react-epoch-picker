import React from "react";
import PropTypes from "prop-types";

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
    activeEpoch: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    layout: PropTypes.shape({
        wrapper: PropTypes.func.isRequired,
        key: PropTypes.func.isRequired,
        step: PropTypes.func.isRequired,
        selectedStep: PropTypes.func.isRequired,
    }).isRequired,
    // optional
    // ...
};

export default ArrayEpoch;
