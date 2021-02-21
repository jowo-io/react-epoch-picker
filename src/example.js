import React, { useState } from "react";
import ReactDOM from "react-dom";

// import EpochPicker from "react-epoch-picker";
import EpochPicker from "./index";

const ExampleApp = function () {
    // const [downloadInitiated, setDownloadInitiated] = useState(false);

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
            <EpochPicker Tag="small">Hello world</EpochPicker>
        </div>
    );
};

// create an empty div
const rootDiv = document.createElement("div");
// render div to dom
document.body.appendChild(rootDiv);
// render example component into div
ReactDOM.render(<ExampleApp />, rootDiv);
