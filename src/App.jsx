import { Button, ConfigProvider, Space, Switch } from "antd";
import "./App.css";
import FormStudent from "./components/FormStudent/FormStudent";
import ListStudent from "./components/ListStudent/ListStudent";
import FormWarper from "./components/ListStudent/FormWarper";
import { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import  { setThemeDark, setThemeLight } from "./redux/slices/toggleThemeSlice";
import { theme } from "antd";

function App() {
    const { themeSelect } = useSelector((state) => state.toggleThemeSlice);
    
    return (
        <ConfigProvider
            theme={{
                algorithm: theme[themeSelect],
            }}
        >
            <div className="container pt-5">
                <h1 className="text-center ">Quản Lý Sinh Viên</h1>

                <Space direction="vertical" style={{ width: "100%" }} size={"large"}>
                    <FormStudent />
                    <FormWarper />
                </Space>
            </div>
        </ConfigProvider>
    );
}

export default App;
