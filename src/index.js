import React from "react";
import PropTypes from "prop-types";

import Breadcrumbs from "./components/Breadcrumbs";
import repeat from "./utils/repeat";

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
        const diff = Math.ceil(max - min);
        let total = Math.ceil(diff / epochs.step);
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
                <small>
                    {breadcrumbs.map(({ key }, i) => (
                        <React.Fragment key={`${key}_breadcrumb`}>
                            {i !== 0 && " > "}
                            <Breadcrumbs
                                onChange={onChange}
                                epoch={epoch}
                                breadcrumbs={breadcrumbs}
                                keyName={key}
                            />
                        </React.Fragment>
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
            isFinalBreadcrumb = true;
        } else {
            value = epoch.values[epoch.key];
        }
        let nextMax = value + epochs.step - 1;
        if (nextMax > max) {
            nextMax = max;
        }
        let nextMin = value;

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
            {data instanceof Array
                ? "hello"
                : renderEpochs(data.epochs, data.max, data.min, epoch, onChange)}
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
    data: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.array.isRequired]).isRequired, // TODO make this recursive proptype
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
