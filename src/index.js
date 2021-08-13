import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App charset="UTF-8" />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
