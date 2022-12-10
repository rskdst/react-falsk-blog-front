import React, {useEffect,useState,useMemo} from 'react';
import { Space, Table, Button,Tag,Switch } from 'antd';
import './menu.css'
import {connect} from "react-redux";
import {getMenuAsync} from "../../store/actions/menu";
import IncDialog from "./components/IncDialog";
import Dialog from "../../components/layout/Dialog";
import AuthButton from "../../components/Permissions/authButton";



const Menu = (props) => {
    const [dialogShow,setDialogShow] = useState({state:false}) // dialog显示
    const [record,setRecord] = useState({}) // dialog record数据

    const changeDialog = () => {
        setDialogShow({state:!dialogShow.state});
    }
    //添加菜单
    const addMenu = ()=>{
        setRecord({})
        changeDialog()
    }
    //编辑菜单
    const editMenu = (record)=>{
        return () =>{
            setRecord(record)
            changeDialog()
        }
    }
    //刷新菜单
    const refresh = ()=>{
        props.getMenuAsync()
    }

    const columns = [
        {
            title: '菜单名称',
            dataIndex: 'label',
            key: 'label',
            width:'9rem',
            onHeaderCell:() => ({style:{textAlign: 'center'}})
        },
        {
            title: '父级菜单',
            key: 'parent',
            dataIndex: 'pname',
            align:"center",
            width:'7rem',
            onHeaderCell:() => ({style:{textAlign: 'center'}})
        },
        {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon',
            align:"center",
            width:'5rem',
            onHeaderCell:() => ({style:{textAlign: 'center'}}),
            // onCell:(record, rowIndex)=>{
            //     record.icon = <div style={{textAlign:"center"}} dangerouslySetInnerHTML={{ __html: record.icon }} />
            //     // record.icon = <span style={{textAlign:"center"}} innerHTML={ record.icon} />
            //     // record.icon = <img src={`data:image/svg+xml;utf8,${record.icon}`}/>
            // }
        },
        {
            title: '路由地址',
            key: 'routepath',
            dataIndex: 'routepath',
            align:"center",
            width:'7rem',
            onHeaderCell:() => ({style:{textAlign: 'center'}})
        },
        {
            title: '组件地址',
            key: 'componentpath',
            dataIndex: 'componentpath',
            align:"center",
            width:'7rem',
            onHeaderCell:() => ({style:{textAlign: 'center'}})
        },
        {
            title: '类型',
            key: 'permission',
            dataIndex: 'type',
            align:"center",
            width:'7rem',
            onHeaderCell:() => ({style:{textAlign: 'center'}}),
            render: (text)=> {
                return (
                    text === "菜单" ? <Tag color="volcano">{text}</Tag>
                        : <Tag color="lime">{text}</Tag>
                )
            }

        },
        {
            title: '权限标记',
            key: 'permission',
            dataIndex: 'permission',
            align:"center",
            width:'7rem',
            onHeaderCell:() => ({style:{textAlign: 'center'}})
        },
        {
            title: '权重',
            key: 'weight',
            dataIndex: 'weight',
            align:"center",
            width:'5rem',
            onHeaderCell:() => ({style:{textAlign: 'center'}})
        },
        {
            title: '启用',
            key: 'state',
            dataIndex: 'state',
            align:"center",
            width:'5rem',
            onHeaderCell:() => ({style:{textAlign: 'center'}}),
            render: (text)=>{
                return <Switch defaultChecked={text==="1"}/>
            }
        },
        {
            title: '编辑',
            key: 'action',
            width:'5rem',
            onHeaderCell:() => ({style:{textAlign: 'center'}}),
            render: (_, record) => (
                <Space size="middle">
                    <a key={1} onClick={editMenu(record)}>编辑</a>
                    <a key={2}>删除</a>
                </Space>

            ),
        },
    ];
    return (
        <>
            {dialogShow.state && <Dialog ><IncDialog onClose={changeDialog} record={record}/></Dialog>}
            <h1>菜单管理</h1>
            <div className="menuEdit">
                <div className="menuEdit-left">
                    <Button type='primary' onClick={addMenu}>+新增</Button>
                    <AuthButton name="menu_delete">删除</AuthButton>
                </div>
                <div className="menuEdit-right">
                    <Button onClick={refresh}>刷新</Button>
                </div>
            </div>
            <Table columns={columns} dataSource={props.menu} rowKey={record => record.id} bordered defaultExpandAllRows/>


        </>
    );
}

export default connect(
    state =>({
        menu:state.menu
    }),
    {
        getMenuAsync
    }
)(Menu);