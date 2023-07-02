import React, { Component } from "react";
import { connect } from "react-redux";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import {
    Button,
    Form,
    Input,
    Popconfirm,
    Space,
    Table,
    Tooltip,
    Typography,
    message,
    ConfigProvider,
    theme,
} from "antd";
import Highlighter from "react-highlight-words";
import { deleteStudent, editStudent } from "../../redux/slices/studentSlice";
let messageApi = "";
const MessageWrapper = () => {
    const [getmessageApi, contextHolder] = message.useMessage();
    messageApi = getmessageApi;
    return <>{contextHolder}</>;
};

// let form = "";
// const FormWrapper = ({children}) => {
//     const [formUse] = Form.useForm();
//     form = formUse;
//     return <>{children}</>;
// };

class ListStudent extends Component {
    state = {
        searchText: "",
        searchedColumn: "",
        editingKey: "",
        values: {
            name: "long",
            phoneNumber: "",
            email: "",
        },
        errors: {
            name: "",
            phoneNumber: "",
            email: "",
        },
    };
    searchInput = React.createRef(null);
    onChange = (e) => {
        const { name, value } = e.target;
        let error = "";

        // phoneNumber
        if (name === "phoneNumber") {
            const reg = /^\d{10,}$/;
            if (!reg.test(value)) {
                error = `Số điện thoại phải gồm 10 chữ số`;
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
                error = `Trường này chỉ bao gồm chữ`;
            }
        }

        // email
        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = `Trường này phải email`;
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
        const { searchText, searchedColumn, editingKey } = this.state;
        const {dispatch, listStudent, form } = this.props;
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
            console.log(data);
            this.setState({
                editingKey: data,
            });
        };
        const isEditing = (record) => record.id === editingKey;
        const edit = (record) => {
            form.setFieldsValue({
                name: "",
                phoneNumber: "",
                email: "",
                ...record,
            });
            const { name, phoneNumber, email } = record;
            this.setState(
                {
                    values: { ...this.state.values, name, phoneNumber, email },
                },
                () => {
                    // console.log(this.state);
                }
            );
            setEditingKey(record.id);
        };
        const cancel = () => {
            setEditingKey("");
        };

        const save = async (record) => {
            const { values, errors } = this.state;
            let isValid = true;
            for (const key in values) {
                if (values[key] === "" || errors[key] !== "") {
                    isValid = false;
                }
            }

            if (!isValid) {
                // console.log("không cho submit")
                return ;
            }
            // console.log("submit");
            const { id } = record;
            let newData = await form.validateFields();
            newData = { ...newData, id };
            dispatch(editStudent(newData));
            setEditingKey("");
            messageApi.open({
                type: "success",
                content: "Lưu thay đổi thành công",
            });
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
                            <Popconfirm
                                okText="Lưu"
                                cancelText="Không"
                                title="Bạn có chắc muốn lưu những gì đã thay đổi?"
                                onConfirm={() => {
                                    save(record);
                                }}
                            >
                                <Typography.Link
                                    style={{
                                        marginRight: 8,
                                    }}
                                >
                                    Lưu
                                </Typography.Link>
                            </Popconfirm>
                            <Typography.Link
                                onClick={cancel}
                                style={{
                                    marginRight: 8,
                                }}
                            >
                                Huỷ
                            </Typography.Link>
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
                                onConfirm={() => {
                                    dispatch(deleteStudent(record));
                                }}
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
            <Form form={form}  component={false}>
                <MessageWrapper />

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
