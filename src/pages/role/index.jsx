import React from 'react';

// import TreeData from "./components/treeData";
import '../container.css'
import {Button, DatePicker, Form, Input, Select, Table} from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
const { Option } = Select;
const { RangePicker } = DatePicker;

function Role(props) {
    const onFinish = (values) => {
        console.log('Finish:', values);
    };
    return (
        <div className="content-main">
            <div className="content-search">
                <Form name="horizontal_login" layout="inline" onFinish={onFinish}>
                    <Form.Item
                        label="用户名"
                        name="username"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="角色"
                        name="role"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="手机号"
                        name="phone"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="状态"
                        name="state"
                    >
                        <Select defaultValue="1">
                            <Option value="1">正常</Option>
                            <Option value="2">注销</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="create_date" label="创建时间">
                        <RangePicker locale={locale}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                        <Button style={{marginLeft:"1rem"}}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="content-operate">
                <Button type="primary">新增</Button>
            </div>
            <div className="content-table">
                <Table bordered defaultExpandAllRows/>;
            </div>
        </div>
    );
}

export default Role;