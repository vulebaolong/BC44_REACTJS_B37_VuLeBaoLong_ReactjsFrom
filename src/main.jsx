import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "antd/dist/reset.css";
import "./index.css";
import { ConfigProvider, theme } from "antd";
import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ConfigProvider
        theme={{
            algorithm: theme.darkAlgorithm,
        }}
    >
        <Provider store={store}>
            <App />
        </Provider>
    </ConfigProvider>
);

