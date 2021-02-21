import React, { useState } from "react";
import ReactDOM from "react-dom";

// import EpochPicker from "react-epoch-picker";
import EpochPicker from "./index";

const ExampleApp = function () {
    const [epoch, setEpoch] = useState(null);

    return (
        <div
            style={{
                fontFamily:
                    '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
                fontWeight: 300,
            }}
        >
            <h4>
                <b>EpochPicker</b> example!
            </h4>
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
            >
                Hello world
            </EpochPicker>
        </div>
    );
};

// create an empty div
const rootDiv = document.createElement("div");
// render div to dom
document.body.appendChild(rootDiv);
// render example component into div
ReactDOM.render(<ExampleApp />, rootDiv);
