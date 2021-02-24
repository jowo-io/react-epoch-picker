import PropTypes from "prop-types";

export default PropTypes;

// data
export const objectEpochPropTypes = PropTypes.oneOfType([
    PropTypes.shape({
        key: PropTypes.string,
        max: PropTypes.number,
        min: PropTypes.number,
        epochs: PropTypes.object,
    }),
    PropTypes.shape({
        key: PropTypes.string,
        step: PropTypes.number,
        format: PropTypes.function,
        epochs: PropTypes.object,
    }),
]);
export const arrayEpochPropTypes = PropTypes.array;
export const dataPropTypes = PropTypes.oneOfType([objectEpochPropTypes, arrayEpochPropTypes]);

// selected
export const keychainPropTypes = PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
);
export const valuesPropTypes = PropTypes.object;
export const selectedPropTypes = PropTypes.shape({
    keychain: keychainPropTypes,
    values: valuesPropTypes,
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

// layout
export const epochsLayoutPropTypes = PropTypes.shape({
    wrapper: PropTypes.func,
    key: PropTypes.func,
    step: PropTypes.func,
    selectedStep: PropTypes.func,
});
export const breadcrumbsLayoutPropTypes = PropTypes.shape({
    wrapper: PropTypes.func,
    spacer: PropTypes.func,
    crumb: PropTypes.func,
    selectedCrumb: PropTypes.func,
});
