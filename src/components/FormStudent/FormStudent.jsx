import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import { connect } from 'react-redux';
import React, { Component } from "react";
import { ContactsOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { addStudent } from "../../redux/slices/studentSlice";

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
    };
    onChange = (e) => {
        const { name, value } = e.target;
        let error = "";

        // id
        if (name === "id") {
            const reg = /^\d+$/;
            if (!reg.test(value)) {
                error = `${name} phải là số`;
            }
            if (reg.test(value)) {
                error = ``;
            }
        }

        // phoneNumber
        if (name === "phoneNumber") {
            const reg = /^\d+$/;
            if (!reg.test(value)) {
                error = `phải là số`;
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

        this.setState(
            {
                values: { ...this.state.values, [name]: value },
                errors: { ...this.state.errors, [name]: error },
            },
            () => {
                console.log(this.state);
            }
        );
    };
    onSubmit = (e) => {
      e.preventDefault()
      const {dispatch} = this.props
      const { values, errors } = this.state;
      let isValid = true;

      for (const key in values) {
          if (values[key] === "" || errors[key] !== "") {
              isValid = false;
          }
      }

      if (!isValid) {
          return console.log("không cho submit");
      }
      console.log("submit");
      dispatch(addStudent(values))
    };
    render() {
        return (
            <div >
                <Card
                    title="Thông tin sinh viên"
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
                                            size="large"
                                            prefix={<ContactsOutlined />}
                                            onChange={this.onChange}
                                            name="id"
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
                                            placeholder="0999999999"
                                            size="large"
                                            prefix={<PhoneOutlined />}
                                            name="phoneNumber"
                                            onChange={this.onChange}
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
                                            id="error"
                                            size="large"
                                            prefix={<UserOutlined />}
                                            name="name"
                                            onChange={this.onChange}
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
                                            id="error"
                                            size="large"
                                            prefix={<UserOutlined />}
                                            name="email"
                                            onChange={this.onChange}
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




export default connect()(FormStudent)
