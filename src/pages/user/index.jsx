import React, {useEffect, useState} from 'react';
import 'dayjs/locale/zh-cn';
import {Button, Form, Input,Select,DatePicker,Space, Table, Tag} from "antd";
import locale from 'antd/es/date-picker/locale/zh_CN';
import {connect} from "react-redux";
import {getUser} from "../../store/actions/user";

import '../container.css'
import Dialog from "../../components/layout/Dialog";
import IncDialog from "../user/components/IncDialog";

const { Option } = Select;
const { RangePicker } = DatePicker;

const columns = [
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '身份证号',
        dataIndex: 'id_card',
        key: 'id_card',
    },
    {
        title: '创建时间',
        dataIndex: 'create_date',
        key: 'create_date',
    },
    {
        title: '更新时间',
        dataIndex: 'update_date',
        key: 'create_date',
    },
    {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
    },
    {
        title: '所属角色',
        dataIndex: 'rolename',
        key: 'rolename',
    },
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

function User(props) {
    console.log("@@@@@@",props)
    const [dialogShow,setDialogShow] = useState({state:false}) // dialog显示
    const [record,setRecord] = useState({}) // dialog record数据
    console.log(props)
    //请求用户数据
    useEffect(()=>{
        if (props.user.length===0){
            props.getUser()
        }

    },[])

    const changeDialog = () => {
        setDialogShow({state:!dialogShow.state});
    }
    //添加菜单
    const addUser = ()=>{
        setRecord({})
        changeDialog()
    }

    const onFinish = (values) => {
        console.log('Finish:', values);
    };

    return (
        <div className="content-main">
            {dialogShow.state && <Dialog ><IncDialog onClose={changeDialog} record={record}/></Dialog>}
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
                <Button type="primary" onClick={addUser}>新增</Button>
            </div>
            <div className="content-table">
                <Table columns={columns} dataSource={props.user} rowKey={record => record.id} bordered defaultExpandAllRows/>;
            </div>
        </div>
    );
}

export default connect(
    state =>({
        user:state.user
    }),
    {
        getUser
    }
)(User);