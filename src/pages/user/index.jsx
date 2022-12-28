import React, {useEffect, useState} from 'react';
import 'dayjs/locale/zh-cn';
import {Button, Form, Input,Select,DatePicker,Space, Table, Switch} from "antd";
import locale from 'antd/es/date-picker/locale/zh_CN';
import {connect} from "react-redux";
import {getUser} from "../../store/actions/user";

import '../container.css'
import Dialog from "../../components/layout/Dialog";
import RoleDialog from './components/roleDialog';

const { Option } = Select;
const { RangePicker } = DatePicker;


function User(props) {
    console.log(props)
    const [dialogShow,setDialogShow] = useState({state:false}) // dialog显示
    const [record,setRecord] = useState({}) // dialog record数据
    const [operate,setOperate] = useState("") // dialog 标题
    const [userid,setUserid] = useState() // dialog 人员id
    //请求用户数据
    useEffect(()=>{
        props.getUser()
    },[])

    const changeDialog = () => {
        setDialogShow({state:!dialogShow.state});
    }

    //新增人员
    const addUser = ()=>{
        setOperate("新增人员")
        changeDialog()
    }

    //角色分配
    const distriRole= (record)=>{
        return ()=>{
            setUserid(record.id)
            setOperate("角色分配")
            changeDialog()
        }
    }

    const onFinish = (values) => {
        console.log('Finish:', values);
    };

    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            align:"center",
            width:'8rem',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            align:"center",
            width:'10rem',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            align:"center",
            width:'12rem',
        },
        {
            title: '身份证号',
            dataIndex: 'id_card',
            key: 'id_card',
            align:"center",
            width:'12rem',
        },
        {
            title: '创建时间',
            dataIndex: 'create_date',
            key: 'create_date',
            align:"center",
            width:'12rem',
        },
        {
            title: '更新时间',
            dataIndex: 'update_date',
            key: 'create_date',
            align:"center",
            width:'12rem',
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            align:"center",
            width:'5rem',
            render: (text)=>{
                return <Switch defaultChecked={text==1}/>
            }
        },
        {
            title: '所属角色',
            dataIndex: 'rolename',
            key: 'rolename',
            align:"center",
            width:'8rem',
        },
        {
            title: '操作',
            key: 'action',
            align:"center",
            render: (_, record) => (
                <Space size="middle">
                    <Button type='link' key={1}>编辑</Button>
                    <Button type='link' onClick={distriRole(record)} key={2}>角色分配</Button>
                    <Button type='link' key={3}>删除</Button>
                </Space>
            ),
        },
    ];
    return (
        <div className="content-main">
            {dialogShow.state && <Dialog ><RoleDialog onClose={changeDialog} record={record} user_id={userid} operate={operate}/></Dialog>}
            <div className="content-search">
                <Form name="horizontal_login"
                    layout="inline"
                    initialValues={{
                        username:"",
                        role:"",
                        phone:"",
                        state:"1",
                        
                    }}
                    onFinish={onFinish}>
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
                        <Select style={{ width: "5rem" }}>
                            <Option value="1">不限</Option>
                            <Option value="2">正常</Option>
                            <Option value="3">注销</Option>
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
                <Table columns={columns} dataSource={props.user} rowKey={record => record.id} bordered defaultExpandAllRows/>
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