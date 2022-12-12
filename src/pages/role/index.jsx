import React, {useEffect,useState} from 'react';

// import TreeData from "./components/treeData";
import '../container.css'
import {Button, Space, Table} from "antd";
import {connect} from "react-redux";
import {getRoleAsync} from "../../store/actions/role";
import Dialog from "../../components/layout/Dialog";
import PermissionDialog from "./components/permissionDialog";

function Role(props) {
    const [dialogShow,setDialogShow] = useState({state:false}) // dialog显示
    const [record,setRecord] = useState({}) // dialog record数据
    const [operate,setOperate] = useState("") // dialog 标题

    useEffect(()=>{
        props.getRoleAsync()
    },[])

    const changeDialog = () => {
        setDialogShow({state:!dialogShow.state});
    }

    //权限分配
    const distriPermission= (record)=>{
        return ()=>{
            setOperate("权限分配")
            changeDialog()
        }
    }

    const columns = [
        {
            title: '角色名',
            dataIndex: 'rolename',
            key: 'rolename',
            align:"center",
            // width:'8rem',
        },
        {
            title: '创建时间',
            dataIndex: 'create_date',
            key: 'create_date',
            align:"center",
            // width:'12rem',
        },
        {
            title: '更新时间',
            dataIndex: 'update_date',
            key: 'create_date',
            align:"center",
            // width:'12rem',
        },
        {
            title: '操作',
            key: 'action',
            align:"center",
            render: (_, record) => (
                <Space size="middle">
                    <Button type='link' key={1}>编辑</Button>
                    <Button type='link' onClick={distriPermission(record)} key={2}>权限分配</Button>
                    <Button type='link' key={3}>删除</Button>
                </Space>
            ),
        },
    ];
    return (
        <div className="content-main">
            {dialogShow.state && <Dialog ><PermissionDialog onClose={changeDialog} record={record} operate={operate}/></Dialog>}
            <div className="content-operate">
                <Button type="primary">+新增</Button>
            </div>
            <div className="content-table">
                <Table columns={columns} dataSource={props.role} rowKey={record => record.id} bordered defaultExpandAllRows/>
            </div>
        </div>
    );
}

export default connect(
    state =>({
        role:state.role
    }),
    {
        getRoleAsync
    }
)(Role);