import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import TotalMessages from "./store/reducers/MessagesRecord";
import thunk from "redux-thunk";

ReactDOM.render(
  <Provider store={createStore(TotalMessages, applyMiddleware(thunk))}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
