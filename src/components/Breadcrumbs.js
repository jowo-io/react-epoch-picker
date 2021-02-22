import React from "react";
import PropTypes from "prop-types";

function Breadcrumbs({ breadcrumbs, keyName, epoch, onChange }) {
    let value;
    const breadcrumbIndex = breadcrumbs.findIndex(({ key: k }) => keyName === k);
    const breadcrumb = breadcrumbs[breadcrumbIndex];
    const { isFinal, epochs, max, min } = breadcrumb;

    if (typeof epochs.format === "function") {
        value = epochs.format({ values: epoch.values, max, min, key: keyName, step: epochs.step });
    } else {
        value = epoch.values[keyName];
    }

    const keychain = breadcrumbs.slice(0, breadcrumbIndex + 1).map(({ key: k }) => k);

    const values = keychain.reduce((accumulator, k) => {
        accumulator[k] = epoch.values[k];
        return accumulator;
    }, {});

    let changeKey = keyName;
    if (isFinal) {
        delete values[keyName];
        changeKey = keychain[breadcrumbIndex - 1];
    }

    return (
        <span onClick={() => onChange({ keychain, values, key: changeKey })} key={`${keyName}`}>
            {value}
        </span>
    );
}

Breadcrumbs.propTypes = {
    // required
    breadcrumbs: PropTypes.array.isRequired,
    keyName: PropTypes.string.isRequired,
    epoch: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    // optional
    // ...
};

export default Breadcrumbs;
