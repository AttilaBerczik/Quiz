import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
        <body>
            <App />
        </body>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
