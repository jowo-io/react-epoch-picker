import isNumber from "./isNumber";

export default function getBreadcrumbs({ data, keychain, values }) {
    let currentEpoch = data;
    let breadcrumbs = [];
    let min = null;
    let max = null;

    keychain.forEach((key) => {
        if (typeof key === "number") {
            currentEpoch = currentEpoch[key];
        } else {
            currentEpoch = currentEpoch.epochs;
        }

        let isFinal = !currentEpoch.epochs;
        let step = currentEpoch.step;
        let nextStep = isFinal ? step : currentEpoch.epochs.step;

        if (isNumber(currentEpoch.max) && isNumber(currentEpoch.min)) {
            max = currentEpoch.max;
            min = currentEpoch.min;
        } else if (isNumber(max) && isNumber(min)) {
            let value = values[currentEpoch.key];
            let nextMax = value + step - 1;
            if (nextMax > max) {
                nextMax = max;
            }
            let nextMin = value;

            max = nextMax;
            min = nextMin;
        }

        const diff = Math.ceil(max - min);
        let total = Math.ceil(diff / nextStep);
        if (diff % nextStep === 0) {
            total++;
        }

        breadcrumbs.push({ total, max, min, step, nextStep, key });
    });

    return breadcrumbs;
}
