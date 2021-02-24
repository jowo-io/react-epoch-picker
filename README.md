# react-epoch-picker

A React UI component for choosing an date epoch, starting zoomed out at millenniums and going down through the centuries, decades and years.

## Installation

`npm install --save react-epoch-picker`

## Usage

> ⚠ warning, this package is still under development ⚠

```jsx
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
```

## Examples

See examples [here](https://jowo-io.github.io/react-epoch-picker/example/example.html)

## Pull requests

If you plan on spinning up this repo locally and submitting PR's, please ensure you use Prettier to lint the JS.

First run `npm link react-epoch-picker` to create a symlink in the node_modules folder locally.

Next run the dev script `npm run dev`. Once running, you can open the `example/example.html` file locally in the browser to see the output. There's no dev server configured.

> Note: hot-reloading is not configured.
