import { Button, Card, Col, Form, Input, Row, Space, message } from "antd";
import { connect } from "react-redux";
import React, { Component } from "react";
import { ContactsOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { addStudent } from "../../redux/slices/studentSlice";
import ToggleTheme from './../ToggleTheme/ToggleTheme';
let messageApi = "";
const MessageWrapper = () => {
    const [getmessageApi, contextHolder] = message.useMessage();
    messageApi = getmessageApi;
    return <>{contextHolder}</>;
};
class FormStudent extends Component {
    state = {
        values: {
            id: "",
            name: "",
            phoneNumber: "",
            email: "",
        },
        errors: {
            id: "",
            name: "",
            phoneNumber: "",
            email: "",
        },
        trigger: false,
    };
    validate = (name, value) => {
        let error = "";

        // id
        if (name === "id") {
            const index = this.props.listStudent.findIndex((item) => {
                return item.id === value;
            });
            if (index !== -1) {
                error = `Mã sinh viên đã tồn tại`;
            }

            const reg = /^\d+$/;
            if (!reg.test(value)) {
                error = `Mã sinh viên phải là số`;
            }
        }

        // phoneNumber
        if (name === "phoneNumber") {
            const reg = /^\d{10,}$/;
            if (!reg.test(value)) {
                error = `phải gồm 10 chữ số`;
            }
            if (reg.test(value)) {
                error = ``;
            }
        }

        // name
        if (name === "name") {
            const nameRegex = /^[\p{L}\s]+$/u;

            if (nameRegex.test(value)) {
                error = ``;
            }
            if (!nameRegex.test(value)) {
                error = `phải là chữ`;
            }
        }

        // email
        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = `phải email`;
            }
            if (emailRegex.test(value)) {
                error = ``;
            }
        }

        if (value.trim() === "") {
            error = `không được để trống`;
        }

        return error;
    };
    onChange = (e) => {
        const { name, value } = e.target;

        const error = this.validate(name, value);

        this.setState(
            {
                values: { ...this.state.values, [name]: value },
                errors: { ...this.state.errors, [name]: error },
            },
            () => {
                // console.log(this.state);
            }
        );
    };
    messageNoti = (type, content) => {
        messageApi.open({
            type,
            content,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        const { values, errors } = this.state;

        //TRIGGER
        let newError = {};
        for (const key in values) {
            const error = this.validate(key, values[key]);
            newError = { ...newError, [key]: error };
        }
        this.setState({
            errors: {
                ...newError,
            },
        });

        let isValid = true;
        for (const key in values) {
            if (values[key] === "" || newError[key] !== "") {
                isValid = false;
            }
        }

        if (!isValid) {
            this.messageNoti("warning", "Vui lòng hoàn thành các trường");
            // console.log("không cho submit");
            return;
        }

        // console.log("submit");
        dispatch(addStudent(values));
        this.setState({
            values: {
                id: "",
                name: "",
                phoneNumber: "",
                email: "",
            },
        });
    };
    render() {
        const renderTitle = () => { 
            return <div style={{display:'flex', justifyContent:"space-between", alignItems:"center"}}>
                <span>Thông tin Sinh Viên</span>
                <ToggleTheme />
            </div>
         }
        return (
            <div>
                <MessageWrapper />
                <Card
                    title={renderTitle()}
                    bordered={false}
                    style={{ width: "100%" }}
                >
                    <form onSubmit={this.onSubmit}>
                        <Row gutter={[32, 32]}>
                            <Col span={12}>
                                <Space direction="vertical" style={{ display: "flex" }}>
                                    <Form.Item
                                        validateStatus={
                                            this.state.errors.id !== "" ? "error" : ""
                                        }
                                        help={
                                            this.state.errors.id !== ""
                                                ? `* ID ${this.state.errors.id}`
                                                : "*"
                                        }
                                    >
                                        <label className="mb-2">Mã sinh viên: </label>
                                        <Input
                                            placeholder="1"
                                            tabIndex="1"
                                            size="large"
                                            prefix={<ContactsOutlined />}
                                            onChange={this.onChange}
                                            name="id"
                                            value={this.state.values.id}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        validateStatus={
                                            this.state.errors.phoneNumber !== ""
                                                ? "error"
                                                : ""
                                        }
                                        help={
                                            this.state.errors.phoneNumber !== ""
                                                ? `* Số điện thoại ${this.state.errors.phoneNumber}`
                                                : "*"
                                        }
                                    >
                                        <label className="mb-2">Số điện thoại:</label>
                                        <Input
                                            tabIndex="3"
                                            placeholder="0999999999"
                                            size="large"
                                            prefix={<PhoneOutlined />}
                                            name="phoneNumber"
                                            onChange={this.onChange}
                                            value={this.state.values.phoneNumber}
                                        />
                                    </Form.Item>
                                </Space>
                            </Col>
                            <Col span={12}>
                                <Space direction="vertical" style={{ display: "flex" }}>
                                    <Form.Item
                                        validateStatus={
                                            this.state.errors.name !== "" ? "error" : ""
                                        }
                                        help={
                                            this.state.errors.name !== ""
                                                ? `* Họ tên ${this.state.errors.name}`
                                                : "*"
                                        }
                                    >
                                        <label className="mb-2">Họ tên:</label>
                                        <Input
                                            placeholder="Nguyễn Văn A"
                                            tabIndex="2"
                                            id="error"
                                            size="large"
                                            prefix={<UserOutlined />}
                                            name="name"
                                            onChange={this.onChange}
                                            value={this.state.values.name}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        validateStatus={
                                            this.state.errors.email !== "" ? "error" : ""
                                        }
                                        help={
                                            this.state.errors.email !== ""
                                                ? `* Email ${this.state.errors.email}`
                                                : "*"
                                        }
                                    >
                                        <label className="mb-2">Email: </label>
                                        <Input
                                            placeholder="example@gmail.com"
                                            tabIndex="4"
                                            id="error"
                                            size="large"
                                            prefix={<UserOutlined />}
                                            name="email"
                                            onChange={this.onChange}
                                            value={this.state.values.email}
                                        />
                                    </Form.Item>
                                </Space>
                            </Col>
                        </Row>
                        <Button htmlType="submit" type="primary" size="large">
                            Thêm sinh viên
                        </Button>
                    </form>
                </Card>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { listStudent } = state.studentSlice;
    return { listStudent };
};

export default connect(mapStateToProps)(FormStudent);
