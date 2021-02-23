export default function formatValue({ value, max, min, nextStep, activeEpoch, isFinal }) {
    const currentEpoch = isFinal ? activeEpoch : activeEpoch.epochs;
    const isFormat = typeof currentEpoch.format === "function";
    if (isFormat) {
        return currentEpoch.format({ value, max, min, step: nextStep, key: currentEpoch.key });
    } else {
        return value;
    }
}
