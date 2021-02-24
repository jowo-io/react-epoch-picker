# react-epoch-picker

A React UI component for choosing an date epoch, starting zoomed out at millenniums and going down through the centuries, decades and years.

## Installation

`npm install --save react-epoch-picker`

## Usage

> ⚠ warning, this package is still under development ⚠

```jsx
import EpochPicker from "react-epoch-picker";

const AnnoDomini = function () {
    const [selected, setSelected] = useState(null);
    return (
        <EpochPicker
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
```

## Examples

See examples [here](https://jowo-io.github.io/react-epoch-picker/example/example.html)

## Pull requests

If you plan on spinning up this repo locally and submitting PR's, please ensure you use Prettier to lint the JS.

First run `npm link react-epoch-picker` to create a symlink in the node_modules folder locally.

Next run the dev script `npm run dev`. Once running, you can open the `example/example.html` file locally in the browser to see the output. There's no dev server configured.

> Note: hot-reloading is not configured.
