import React from "react";
import merge from "lodash.merge";
import PropTypes, {
    selectedPropTypes,
    dataPropTypes,
    breadcrumbsLayoutPropTypes,
    epochsLayoutPropTypes,
} from "./utils/propTypes";

import Breadcrumbs from "./components/Breadcrumbs";
import ArrayEpoch from "./components/ArrayEpoch";
import ObjectEpoch from "./components/ObjectEpoch";

import getSelected from "./utils/getSelected";
import nestedLookup from "./utils/nestedLookup";
import findEpochArrayIndex from "./utils/findEpochArrayIndex";

const defaultProps = {
    layout: {
        epochs: {
            wrapper: (props) => <div {...props} />,
            key: (props) => <button {...props} />,
            step: (props) => <button {...props} />,
            selectedStep: (props) => <button {...props} disabled style={{ opacity: 0.5 }} />,
        },
        breadcrumbs: {
            wrapper: (props) => <div {...props} />,
            spacer: (props) => (
                <small {...props} style={{ opacity: 0.5 }}>
                    &gt;
                </small>
            ),
            crumb: (props) => <span {...props} style={{ opacity: 0.5 }} />,
            selectedCrumb: (props) => <span {...props} />,
        },
    },
};

/**
 *
 */
const EpochPicker = function ({ data, selected, onChange, layout }) {
    data = data instanceof Array ? data : [data];

    const { keychain, values } = getSelected(data, selected);
    const { activeEpoch, isFinal, isArray } = nestedLookup(data, keychain);

    function onClickOption(value) {
        if (isFinal) {
            return;
        }
        const key = isArray ? findEpochArrayIndex(data, value) : activeEpoch.epochs.key;
        onChange({
            keychain: [...keychain, key],
            values: { ...values, [key]: value },
            key,
        });
    }

    return (
        <>
            {isArray ? (
                <ArrayEpoch
                    data={data}
                    activeEpoch={activeEpoch}
                    keychain={keychain}
                    values={values}
                    onClick={onClickOption}
                    isFinal={isFinal}
                    layout={merge({}, defaultProps.layout.epochs, layout.epochs || {})}
                />
            ) : (
                <ObjectEpoch
                    data={data}
                    activeEpoch={activeEpoch}
                    keychain={keychain}
                    values={values}
                    onClick={onClickOption}
                    isFinal={isFinal}
                    layout={merge({}, defaultProps.layout.epochs, layout.epochs || {})}
                />
            )}
            <Breadcrumbs
                data={data}
                keychain={keychain}
                values={values}
                onChange={onChange}
                layout={merge({}, defaultProps.layout.breadcrumbs, layout.breadcrumbs || {})}
            />
        </>
    );
};

EpochPicker.defaultProps = defaultProps;

EpochPicker.propTypes = {
    // required
    data: dataPropTypes.isRequired,
    onChange: PropTypes.func.isRequired,
    // optional
    selected: selectedPropTypes,
    layout: PropTypes.shape({
        epochs: epochsLayoutPropTypes,
        breadcrumbs: breadcrumbsLayoutPropTypes,
    }),
};

export default EpochPicker;
