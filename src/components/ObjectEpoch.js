import React from "react";
import PropTypes from "prop-types";

import repeat from "../utils/repeat";
import getBreadcrumbs from "../utils/getBreadcrumbs";
import formatValue from "../utils/formatValue";

function ObjectEpoch({ data, activeEpoch, keychain, values, onClick, isFinal, layout }) {
    const { wrapper: Wrapper, step: Step, selectedStep: SelectedStep } = layout;

    const { total, max, min, nextStep } = getBreadcrumbs({ data, keychain, values }).pop();

    return (
        <Wrapper>
            {repeat((i) => {
                const value = min + i * nextStep;
                const label = formatValue({ value, max, min, nextStep, activeEpoch, isFinal });
                const isSelected = isFinal && value === values[activeEpoch.key];

                return (
                    <React.Fragment key={`${activeEpoch.key}-${i}`}>
                        {isSelected ? (
                            <SelectedStep>{label}</SelectedStep>
                        ) : (
                            <Step onClick={() => onClick(value)}>{label}</Step>
                        )}
                    </React.Fragment>
                );
            }, total)}
        </Wrapper>
    );
}

ObjectEpoch.propTypes = {
    // required
    data: PropTypes.array.isRequired,
    activeEpoch: PropTypes.object.isRequired,
    keychain: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
        .isRequired,
    values: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    isFinal: PropTypes.bool.isRequired,
    layout: PropTypes.shape({
        wrapper: PropTypes.func.isRequired,
        key: PropTypes.func.isRequired,
        step: PropTypes.func.isRequired,
        selectedStep: PropTypes.func.isRequired,
    }).isRequired,
    // optional
    // ...
};

export default ObjectEpoch;
