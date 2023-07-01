import { Space } from "antd";
import "./App.css";
import FormStudent from "./components/FormStudent/FormStudent";
import ListStudent from "./components/ListStudent/ListStudent";

function App() {
    return (
        <div className="container pt-5">
            <h1 className="text-center ">Quản Lý Sinh Viên</h1>
            <Space direction="vertical" style={{width: "100%"}} size={"large"}>
                <FormStudent />
                <ListStudent />
            </Space>
        </div>
    );
}

export default App;
