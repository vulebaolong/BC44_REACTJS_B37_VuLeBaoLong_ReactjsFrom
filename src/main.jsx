import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "antd/dist/reset.css";
import { ConfigProvider, theme, message } from "antd";
import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
