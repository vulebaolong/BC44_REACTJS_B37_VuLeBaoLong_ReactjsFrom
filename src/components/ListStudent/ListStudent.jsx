import React, { Component } from "react";
import { connect } from "react-redux";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popconfirm, Space, Table, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import { deleteStudent } from "../../redux/slices/studentSlice";
// const data = [
//     {
//         key: "1",
//         name: "John Brown",
//         age: 32,
//         address: "New York No. 1 Lake Park",
//     },
//     {
//         key: "2",
//         name: "Joe Black",
//         age: 42,
//         address: "London No. 1 Lake Park",
//     },
//     {
//         key: "3",
//         name: "Jim Green",
//         age: 32,
//         address: "Sydney No. 1 Lake Park",
//     },
//     {
//         key: "4",
//         name: "Jim Red",
//         age: 32,
//         address: "London No. 2 Lake Park",
//     },
// ];
class ListStudent extends Component {
    formRef = React.createRef(); // Tạo ref cho Form
    state = {
        searchText: "",
        searchedColumn: "",
    };
    searchInput = React.createRef(null);

    render() {
        const { searchText, searchedColumn } = this.state;
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

        const { listStudent } = this.props;
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
            },
            {
                title: "Số điện thoại",
                dataIndex: "phoneNumber",
                ...getColumnSearchProps("phoneNumber"),
                sortDirections: ["descend", "ascend"],
            },
            {
                title: "Email",
                dataIndex: "email",
                width: "20%",
                ...getColumnSearchProps("email"),
            },
            {
                title: "",
                width: "10%",
                render: (text, record, index) => {
                    return (
                        <Space>
                            <Tooltip title="Chỉnh sửa">
                                <Button
                                    icon={<EditOutlined />}
                                    onClick={() => {
                                        console.log(record.id);
                                    }}
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
        return (
            <Form ref={this.formRef} component={false}>
                <Table rowKey="id" columns={columns} dataSource={listStudent} />
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return state.studentSlice;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps)(ListStudent);
