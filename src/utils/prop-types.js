import PropTypes from "prop-types";

export default PropTypes;

export const dataPropTypes = PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired,
]).isRequired;

export const selectedPropTypes = PropTypes.shape({
    keychain: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    values: PropTypes.object,
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});
