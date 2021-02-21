import React from "react";
import PropTypes from "prop-types";

function recursiveKeychainLookup(epochs, keychain) {}

const repeat = (callback, total) => {
    let arr = [];
    for (let i = 0; i < total; i++) {
        const returnValue = callback(i, total);
        if (returnValue) {
            arr.push(returnValue);
        }
    }
    return arr;
};

function renderBreadcrumbs({ breadcrumbs, key, epoch, onChange }) {
    let value;
    // console.log("key", key);
    // console.log("breadcrumbs", breadcrumbs);
    const breadcrumbIndex = breadcrumbs.findIndex(({ key: k }) => key === k);
    const breadcrumb = breadcrumbs[breadcrumbIndex];
    // console.log("breadcrumbIndex", breadcrumbIndex);
    // console.log("breadcrumb", breadcrumb);
    const { isFinal, epochs, max, min } = breadcrumb;
    if (typeof epochs.format === "function") {
        value = epochs.format({
            values: epoch.values,
            max,
            min,
            key,
            step: epochs.step,
        });
    } else {
        value = epoch.values[key];
    }

    // console.log("-------------------");
    // console.log("key", key);
    // console.log("epochs", epochs);
    // console.log("max", max);
    // console.log("min", min);
    // console.log("epoch", epoch);
    const keychain = breadcrumbs.slice(0, breadcrumbIndex + 1).map(({ key: k }) => k);

    // console.log("keychain", keychain);
    const values = keychain.reduce((accumulator, k) => {
        accumulator[k] = epoch.values[k];
        return accumulator;
    }, {});

    console.log("value", value);
    console.log("isFinal", isFinal);

    let changeKey = key;
    if (isFinal) {
        delete values[key];
        changeKey = keychain[breadcrumbIndex - 1];
    }

    return (
        <span onClick={() => onChange({ keychain, values, key: changeKey })} key={`${key}`}>
            {value}
            {/* - {keychain.join(" > ")} */}
        </span>
    );
}

function renderEpochs(epochs, max, min, epoch, onChange, breadcrumbs = []) {
    let isCurrent = false;
    let isFinal = !(epochs && epochs.epochs);
    let keychain = [];
    if (epoch && epoch.keychain) {
        if (epoch.keychain[epoch.keychain.length - 1] === epochs.key) {
            isCurrent = true;
            if (!isFinal) {
                keychain = [...epoch.keychain, epochs.epochs.key];
            } else {
                keychain = [...epoch.keychain];
            }
        }
    } else {
        isCurrent = true;
        keychain = [epochs.key, epochs.epochs.key];
    }

    if (isCurrent) {
        //console.log("-------------------");
        //console.log("epochs", epochs);
        //console.log("max", max);
        //console.log("min", min);
        console.log("epoch", epoch);
        //console.log("isCurrent", isCurrent);
        //console.log("isFinal", isFinal);
        const diff = Math.ceil(max - min);
        let total = Math.ceil(diff / epochs.step);
        // //console.log("total", total);
        // //console.log(total, epochs.step);
        if (diff % epochs.step === 0) {
            total++;
        }
        return (
            <>
                {repeat((i) => {
                    let value = min + i * epochs.step;
                    let label = value;
                    let values = {};
                    if (epoch) {
                        values = { ...epoch.values };
                    }
                    values[epochs.key] = value;

                    if (typeof epochs.format === "function") {
                        label = epochs.format({
                            values,
                            max,
                            min,
                            key: epochs.key,
                            step: epochs.step,
                        });
                    }

                    return (
                        <span
                            key={`${epochs.key}_${i}`}
                            style={{
                                marginRight: "10px",
                                background:
                                    isFinal && epoch && epoch.values[epochs.key] === value
                                        ? "orange"
                                        : "white",
                            }}
                            onClick={() => {
                                onChange({ keychain, values, key: epochs.key });
                            }}
                        >
                            {label}
                        </span>
                    );
                }, total)}
                <br />
                <br />
                {keychain.join(" > ")}
                <br />
                <br />
                <small>
                    {breadcrumbs.map(({ key }, i) => (
                        <>
                            {i !== 0 && " > "}
                            {renderBreadcrumbs({ onChange, epoch, breadcrumbs, key })}
                        </>
                    ))}
                </small>
            </>
        );
    } else {
        let value;
        const nextEpochs = epochs.epochs;
        let isFinalBreadcrumb = false;
        if (!(nextEpochs && nextEpochs.epochs) && nextEpochs.key === epoch.key) {
            value = epoch.values[epoch.keychain[epoch.keychain.length - 2]];

            //console.log("YES", value);
            isFinalBreadcrumb = true;
        } else {
            value = epoch.values[epoch.key];
            //console.log("NO", value);
        }
        let nextMax = value + epochs.step - 1;
        if (nextMax > max) {
            nextMax = max;
        }
        let nextMin = value;
        //console.log("max", max);
        //console.log("nextMax", nextMax);
        //console.log("min", min);
        //console.log("nextMin", nextMin);

        const newBreadcrumbs = [{ epochs, max, min, key: epochs.key, isFinal: false }];
        if (isFinalBreadcrumb) {
            newBreadcrumbs.push({
                epochs: nextEpochs,
                max: nextMax,
                min: nextMin,
                key: nextEpochs.key,
                isFinal: true,
            });
        }

        return renderEpochs(nextEpochs, nextMax, nextMin, epoch, onChange, [
            ...breadcrumbs,
            ...newBreadcrumbs,
        ]);
    }
}

/**
 *
 */
const EpochPicker = function ({ data, epoch, onChange, Tag, className, style, extraAttributes }) {
    return (
        <Tag {...extraAttributes} className={className} style={style}>
            {renderEpochs(data.epochs, data.max, data.min, epoch, onChange)}
        </Tag>
    );
};

EpochPicker.defaultProps = {
    className: "",
    style: {},
    Tag: "button",
    extraAttributes: {},
};

EpochPicker.propTypes = {
    // required
    data: PropTypes.object.isRequired, // TODO make this recursive proptype
    // optional

    epoch: PropTypes.shape({
        keychain: PropTypes.array,
        values: PropTypes.object,
        key: PropTypes.string,
    }),
    onChange: PropTypes.func,

    Tag: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    extraAttributes: PropTypes.object,
};

export default EpochPicker;
