import React, { useState } from "react";
import ReactDOM from "react-dom";

// import EpochPicker from "react-epoch-picker";
import EpochPicker from "./index";

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
                            format: ({ value, step, key, max, min }) => value - 1 + "s",
                            key: "decade",
                            step: 10,
                            epochs: {
                                format: ({ value, step, key, max, min }) => "y" + value,
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

    function format({ value, step, key, max, min }) {
        return Math.abs(value) + " BC";
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
                        format,
                        key: "century",
                        step: 100,
                        epochs: {
                            format,
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
                        format,
                        key: "century",
                        step: 100,
                        epochs: {
                            format,
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
                        format,
                        key: "century",
                        step: 100,
                        epochs: {
                            format,
                            key: "decade",
                            step: 10,
                            epochs: {
                                format,
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

    function format({ value, step, key, max, min }) {
        return Math.abs(value) + " BC";
    }

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
                        format,
                        key: "hoo",
                        step: 100,
                        epochs: {
                            format,
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
                        format,
                        key: "hoo",
                        step: 50,
                        epochs: {
                            format,
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
