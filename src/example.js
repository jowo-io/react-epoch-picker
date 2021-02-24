import React, { useState } from "react";
import ReactDOM from "react-dom";
import EpochPicker from "react-epoch-picker";

const AnnoDomini = function () {
    const [selected, setSelected] = useState(null);
    return (
        <EpochPicker
            selected={selected}
            onChange={setSelected}
            data={{
                min: 1,
                max: 2021,
                key: "AD",
                epochs: {
                    format: ({ value, step, key, max, min }) => {
                        const ceil = value + step - 1;
                        return `${value}-${ceil > max ? max : ceil}`;
                    },
                    key: "millennium",
                    step: 1000,
                    epochs: {
                        format: ({ value, step, key, max, min }) => value - 1 + "s",
                        key: "century",
                        step: 100,
                        epochs: {
                            format: ({ value, step, key, max, min }) => {
                                const endValue = value - 1 + step;
                                const endValueShort = endValue % 100;
                                return `${value}-${endValueShort ? endValueShort : endValue}`;
                            },
                            key: "decade",
                            step: 10,
                            epochs: {
                                key: "year",
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
    const [selected, setSelected] = useState(null);

    function formatCentury({ value, step, key, max, min }) {
        const e = Math.abs(value - 1 + step);
        const v = Math.abs(value);
        return `${v}-${e} BC`;
    }
    function formatDecade({ value, step, key, max, min }) {
        const e = Math.abs(value - 1 + step);
        const v = Math.abs(value);
        return `${v}-${e} BC`;
    }
    function formatYear({ value, step, key, max, min }) {
        const v = Math.abs(value - 1);
        return `${v} BC`;
    }

    return (
        <EpochPicker
            selected={selected}
            onChange={setSelected}
            data={[
                {
                    min: -800,
                    max: -501,
                    key: "Archaic",
                    epochs: {
                        format: formatCentury,
                        key: "century",
                        step: 100,
                        epochs: {
                            format: formatDecade,
                            key: "decade",
                            step: 10,
                        },
                    },
                },
                {
                    min: -500,
                    max: -323,
                    key: "Classical",
                    epochs: {
                        format: formatCentury,
                        key: "century",
                        step: 100,
                        epochs: {
                            format: formatDecade,
                            key: "decade",
                            step: 10,
                        },
                    },
                },
                {
                    min: -323,
                    max: -146,
                    key: "Hellenistic",
                    epochs: {
                        format: formatCentury,
                        key: "century",
                        step: 100,
                        epochs: {
                            format: formatDecade,
                            key: "decade",
                            step: 10,
                            epochs: {
                                format: formatYear,
                                key: "year",
                                step: 1,
                            },
                        },
                    },
                },
            ]}
        />
    );
};

const FooBar = function () {
    const [selected, setSelected] = useState(null);

    return (
        <EpochPicker
            selected={selected}
            onChange={setSelected}
            layout={{
                epochs: {
                    wrapper: (props) => <div {...props} style={{ background: "grey" }} />,
                    key: (props) => <button {...props} style={{ background: "pink" }} />,
                    step: (props) => (
                        <button {...props} style={{ background: "purple", color: "white" }} />
                    ),
                    selectedStep: (props) => (
                        <button
                            {...props}
                            disabled
                            style={{ background: "brown", color: "white" }}
                        />
                    ),
                },
                breadcrumbs: {
                    wrapper: (props) => <div {...props} style={{ background: "blue" }} />,
                    spacer: (props) => (
                        <small {...props} style={{ background: "green" }}>
                            &rarr;
                        </small>
                    ),
                    crumb: (props) => <small {...props} style={{ background: "orange" }} />,
                    selectedCrumb: (props) => <small {...props} style={{ background: "yellow" }} />,
                },
            }}
            data={[
                {
                    min: 1000,
                    max: 2000,
                    key: "foo",
                    epochs: {
                        key: "hoo",
                        step: 100,
                        epochs: {
                            key: "haa",
                            step: 10,
                        },
                    },
                },
                {
                    min: 500,
                    max: 1000,
                    key: "bar",
                    epochs: {
                        key: "hoo",
                        step: 50,
                        epochs: {
                            key: "haa",
                            step: 5,
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

            <hr />

            <h5>
                <b>Foo Bar</b>
            </h5>
            <FooBar />
        </div>
    );
};

// create an empty div
const rootDiv = document.createElement("div");
// render div to dom
document.body.appendChild(rootDiv);
// render example component into div
ReactDOM.render(<ExampleApp />, rootDiv);
