import React, { useState } from "react";
import ReactDOM from "react-dom";

// import EpochPicker from "react-epoch-picker";
import EpochPicker from "./index";

const AnnoDomini = function () {
    const [epoch, setEpoch] = useState(null);
    console.log(epoch);
    return (
        <EpochPicker
            Tag="small"
            epoch={epoch}
            onChange={(epoch) => setEpoch(epoch)}
            data={{
                min: 1,
                max: 2021,
                key: "AD",
                epochs: {
                    format: ({ values, step, key, max, min }) => {
                        const ceil = values[key] + step - 1;
                        return `${values[key]}-${ceil > max ? max : ceil}`;
                    },
                    key: "millennium",
                    step: 1000,
                    epochs: {
                        format: ({ values, step, key, max, min }) => {
                            return values[key] - 1 + "s";
                        },
                        key: "century",
                        step: 100,
                        epochs: {
                            format: ({ values, step, key, max, min }) => {
                                return values[key] - 1 + "s";
                            },
                            key: "decades",
                            step: 10,
                            epochs: {
                                key: "years",
                                step: 1,
                            },
                        },
                    },
                },
            }}
        />
    );
};

const AncientGreece = function () {
    const [epoch, setEpoch] = useState(null);

    function format({ values, step, key, max, min }) {
        return Math.abs(values[key]) + " BC";
    }

    return (
        <EpochPicker
            Tag="small"
            epoch={epoch}
            onChange={(epoch) => setEpoch(epoch)}
            data={[
                {
                    min: -800,
                    max: -500,
                    key: "archaic",
                    epochs: {
                        format,
                        key: "century",
                        step: 100,
                        epochs: {
                            format,
                            key: "decades",
                            step: 10,
                        },
                    },
                },
                {
                    min: -500,
                    max: -323,
                    key: "classical",
                    epochs: {
                        format,
                        key: "century",
                        step: 100,
                        epochs: {
                            format,
                            key: "decades",
                            step: 10,
                        },
                    },
                },
                {
                    min: -323,
                    max: -146,
                    key: "archaic",
                    epochs: {
                        format,
                        key: "century",
                        step: 100,
                        epochs: {
                            format,
                            key: "decades",
                            step: 10,
                            epochs: {
                                key: "years",
                                step: 1,
                            },
                        },
                    },
                },
            ]}
        />
    );
};

const ExampleApp = function () {
    return (
        <div
            style={{
                fontFamily:
                    '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
                fontWeight: 300,
            }}
        >
            <h3>
                <b>EpochPicker</b>
            </h3>

            <hr />

            <h5>
                <b>Anno Domini</b>
            </h5>
            <AnnoDomini />

            <hr />

            <h5>
                <b>Ancient Greece</b>
            </h5>
            <AncientGreece />
        </div>
    );
};

// create an empty div
const rootDiv = document.createElement("div");
// render div to dom
document.body.appendChild(rootDiv);
// render example component into div
ReactDOM.render(<ExampleApp />, rootDiv);
