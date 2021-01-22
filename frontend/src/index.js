import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./storage";

import App from "./App";

import "./assets/bootstrap.min.css";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
