import React from "react";
import PropTypes from "prop-types";

import nestedLookup from "../utils/nestedLookup";
import getBreadcrumbs from "../utils/getBreadcrumbs";

function Breadcrumbs({ data, keychain, values, onChange, layout }) {
    const { wrapper: Wrapper, spacer: Spacer, crumb: Crumb, selectedCrumb: SelectedCrumb } = layout;
    const breadcrumbs = getBreadcrumbs({
        data,
        keychain,
        values,
    });

    return (
        <Wrapper>
            {breadcrumbs.map(({ max, min, step, key }, i) => {
                const isSelected = i === breadcrumbs.length - 1;
                if (data.length === 1 && i === 0) {
                    return null;
                }
                let value = values[key];
                let label = value;
                const index = keychain.indexOf(key);
                const { activeEpoch } = nestedLookup(data, keychain.slice(0, index + 1));

                if (typeof activeEpoch.format === "function") {
                    label = activeEpoch.format({ value, max, min, step, key });
                } else {
                    label = value;
                }

                function onClick() {
                    const slicedKeychain = keychain.slice(0, index);
                    const reducedValues = keychain.reduce((accumulator, k) => {
                        accumulator[k] = values[k];
                        return accumulator;
                    }, {});
                    onChange({
                        keychain: [...slicedKeychain],
                        values: reducedValues,
                        key,
                    });
                }

                return (
                    <React.Fragment key={`breadcrumb-${key}`}>
                        {isSelected ? (
                            <SelectedCrumb onClick={onClick}>{label}</SelectedCrumb>
                        ) : (
                            <Crumb onClick={onClick}>{label}</Crumb>
                        )}
                        {!isSelected && <Spacer />}
                    </React.Fragment>
                );
            })}
        </Wrapper>
    );
}

Breadcrumbs.propTypes = {
    // required
    data: PropTypes.array.isRequired,
    keychain: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
        .isRequired,
    values: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    layout: PropTypes.shape({
        wrapper: PropTypes.func.isRequired,
        spacer: PropTypes.func.isRequired,
        crumb: PropTypes.func.isRequired,
        selectedCrumb: PropTypes.func.isRequired,
    }).isRequired,
    // optional
};

export default Breadcrumbs;
