/**
 * accepts a value and epoch along with other vars, and decides if and how to format the epoch's label.
 * if a format function exists it'll invoke that, otherwise it'll just return the current epoch's value
 *
 * @param {object} params
 * @param {string} params.value
 * @param {number} params.max
 * @param {number} params.min
 * @param {number} params.nextStep
 * @param {object} params.activeEpoch
 * @param {boolean} params.isFinal
 */
export default function formatNextEpochValue({ value, max, min, nextStep, activeEpoch, isFinal }) {
    const currentEpoch = isFinal ? activeEpoch : activeEpoch.epochs;
    const isFormat = typeof currentEpoch.format === "function";
    if (isFormat) {
        return currentEpoch.format({ value, max, min, step: nextStep, key: currentEpoch.key });
    } else {
        return value;
    }
}
