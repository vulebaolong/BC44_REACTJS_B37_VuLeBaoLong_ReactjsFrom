import React, { Component } from "react";
import { connect } from "react-redux";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popconfirm, Space, Table, Tooltip, Typography } from "antd";
import Highlighter from "react-highlight-words";
import { deleteStudent, editStudent } from "../../redux/slices/studentSlice";


const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds);
    });
};
class ListStudent extends Component {
    formRef = React.createRef(); // Tạo ref cho Form
    state = {
        searchText: "",
        searchedColumn: "",
        editingKey: "",
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
    searchInput = React.createRef(null);
    onChange = (e) => {
        const { name, value } = e.target;
        console.log({ name, value });
        let error = "";


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
                // console.log(this.state);
            }
        );
    };
    EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        validateStatus={
                            this.state.errors[dataIndex] !== "" ? "error" : ""
                        }
                        help={
                            this.state.errors[dataIndex] !== ""
                                ? `* ${this.state.errors[dataIndex]}`
                                : "*"
                        }
                    >
                        {<Input name={dataIndex} onChange={this.onChange} />}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };
    render() {
        const formRef = this.formRef;
        const { current: form } = formRef;
        const { searchText, searchedColumn, editingKey } = this.state;
        const { listStudent } = this.props;
        const { dispatch } = this.props;
        const setSearchText = (data) => {
            this.setState({
                searchText: data,
            });
        };
        const setSearchedColumn = (data) => {
            this.setState({
                searchedColumn: data,
            });
        };
        const setEditingKey = (data) => {
            this.setState({
                editingKey: data,
            });
        };
        const isEditing = (record) => record.key === editingKey;
        const edit = (record) => {
            form.setFieldsValue({
                id: "",
                name: "",
                phoneNumber: "",
                email: "",
                ...record,
            });
            setEditingKey(record.key);
        };
        const cancel = () => {
            setEditingKey("");
        };

        const save = async (record) => {
            const { id } = record;
            let newData = await form.validateFields();
            newData = { ...newData, id };
            dispatch(editStudent(newData));
            // await wait(1000);
            setEditingKey("");
        };

        const handleSearch = (selectedKeys, confirm, dataIndex) => {
            confirm();
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
        };
        const handleReset = (clearFilters) => {
            clearFilters();
            setSearchText("");
        };
        const getColumnSearchProps = (dataIndex) => ({
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
                close,
            }) => (
                <div
                    style={{
                        padding: 8,
                    }}
                    onKeyDown={(e) => e.stopPropagation()}
                >
                    <Input
                        ref={this.searchInput}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onPressEnter={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        style={{
                            marginBottom: 8,
                            display: "block",
                        }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{
                                width: 90,
                            }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => clearFilters && handleReset(clearFilters)}
                            size="small"
                            style={{
                                width: 90,
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                confirm({
                                    closeDropdown: false,
                                });
                                setSearchText(selectedKeys[0]);
                                setSearchedColumn(dataIndex);
                            }}
                        >
                            Filter
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                close();
                            }}
                        >
                            close
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered) => (
                <SearchOutlined
                    style={{
                        color: filtered ? "#1677ff" : undefined,
                    }}
                />
            ),
            onFilter: (value, record) =>
                record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownOpenChange: (visible) => {
                if (visible) {
                    setTimeout(() => this.searchInput.current?.select(), 100);
                }
            },
            render: (text) =>
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{
                            backgroundColor: "#ffc069",
                            padding: 0,
                        }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ""}
                    />
                ) : (
                    text
                ),
        });

        const columns = [
            {
                title: "ID",
                dataIndex: "id",
                width: "10%",
                sorter: (a, b) => a.id - b.id,
                ...getColumnSearchProps("id"),
            },
            {
                title: "Họ tên",
                dataIndex: "name",
                ...getColumnSearchProps("name"),
                editable: true,
            },
            {
                title: "Số điện thoại",
                dataIndex: "phoneNumber",
                ...getColumnSearchProps("phoneNumber"),
                sortDirections: ["descend", "ascend"],
                editable: true,
            },
            {
                title: "Email",
                dataIndex: "email",
                width: "20%",
                ...getColumnSearchProps("email"),
                editable: true,
            },
            {
                title: "",
                width: "10%",
                render: (text, record, index) => {
                    const editable = isEditing(record);
                    return editable ? (
                        <span>
                            <Typography.Link
                                onClick={() => save(record)}
                                style={{
                                    marginRight: 8,
                                }}
                            >
                                Save
                            </Typography.Link>
                            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                <a>Cancel</a>
                            </Popconfirm>
                        </span>
                    ) : (
                        <Space>
                            <Tooltip title="Chỉnh sửa">
                                <Button
                                    disabled={editingKey !== ""}
                                    icon={<EditOutlined />}
                                    onClick={() => edit(record)}
                                ></Button>
                            </Tooltip>

                            <Popconfirm
                                okText="Xoá"
                                cancelText="Không"
                                title="Bạn có chắc muốn xoá?"
                                onConfirm={() => dispatch(deleteStudent(record))}
                            >
                                <Tooltip placement="right" title="Xoá">
                                    <Button
                                        icon={<DeleteOutlined />}
                                        type="primary"
                                        danger
                                    ></Button>
                                </Tooltip>
                            </Popconfirm>
                        </Space>
                    );
                },
            },
        ];
        const mergedColumns = columns.map((col) => {
            console.log(col);
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    inputType: "text",
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }),
            };
        });
        return (
            <Form ref={formRef} component={false}>
                <Table
                    rowKey="id"
                    columns={mergedColumns}
                    dataSource={listStudent}
                    components={{
                        body: {
                            cell: this.EditableCell,
                        },
                    }}
                />
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return state.studentSlice;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps)(ListStudent);
