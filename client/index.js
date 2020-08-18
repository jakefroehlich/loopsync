import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import store from "./store";
import App from "./components/App";
import Header from "./components/Header";

const Root = document.getElementById("root");

render(
    <Provider store={store}>
        <Header />
        <Router>
            <App />
        </Router>
    </Provider>,
    Root,
    () => (console.log("Render successful!"))
);