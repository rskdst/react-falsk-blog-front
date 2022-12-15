import React, {useEffect,useState,useMemo} from 'react';
import { Space, Table, Button,Tag,Switch } from 'antd';
import './menu.css'
import {connect} from "react-redux";
import IncDialog from "./components/IncDialog";
import Dialog from "../../components/layout/Dialog";
import AuthButton from "../../components/Permissions/authButton";



const Menu = (props) => {
    const [dialogShow,setDialogShow] = useState({state:false}) // dialog显示
    const [record,setRecord] = useState({}) // dialog record数据
    const [operate,setOperate] = useState("") // dialog 标题

    const changeDialog = () => {
        setDialogShow({state:!dialogShow.state});
    }
    //添加菜单
    const addMenu = ()=>{
        setOperate("新增菜单")
        changeDialog()
    }
    //编辑菜单
    const editMenu = (record)=>{
        return () =>{
            setOperate("编辑菜单")
            setRecord(record)
            changeDialog()
        }
    }

    //编辑菜单
    const copyMenu = (record)=>{
        return () =>{
            setOperate("新增菜单")
            setRecord(record)
            changeDialog()
        }
    }

    //刷新菜单
    const refresh = ()=>{
        props.getMenuListAsync()
    }

    const columns = [
        {
            title: '菜单名称',
            dataIndex: 'label',
            key: 'label',
            align:"center",
            width:'8rem',
        },
        {
            title: '父级菜单',
            key: 'parent',
            dataIndex: 'pname',
            align:"center",
            width:'7rem',
        },
        {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon',
            align:"center",
            width:'4rem',
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
        },
        {
            title: '组件地址',
            key: 'componentpath',
            dataIndex: 'componentpath',
            align:"center",
            width:'7rem',
        },
        {
            title: '类型',
            key: 'permission',
            dataIndex: 'type',
            align:"center",
            width:'4rem',
            render: (text)=> {
                return (
                    text === "菜单" ? <Tag color="volcano">{text}</Tag>
                        : text === "目录" ? <Tag color="lime">{text}</Tag>
                        : <Tag color="blue">{text}</Tag>
                        
                )
            }

        },
        {
            title: '权限标记',
            key: 'permission',
            dataIndex: 'permission',
            align:"center",
            width:'7rem',
        },
        {
            title: '权重',
            key: 'weight',
            dataIndex: 'weight',
            align:"center",
            width:'5rem',
        },
        {
            title: '启用',
            key: 'state',
            dataIndex: 'state',
            align:"center",
            width:'4rem',
            render: (text)=>{
                return <Switch defaultChecked={text==="1"}/>
            }
        },
        {
            title: '编辑',
            key: 'action',
            width:'4rem',
            align:"center",
            onHeaderCell:() => ({style:{textAlign: 'left'}}),
            render: (_, record) => (
                <Space size="middle">
                    <Button type='link' onClick={editMenu(record)} key={1}>编辑</Button>
                    <Button type='link' onClick={copyMenu(record)} key={2}>复制</Button>
                    <Button  type='link' key={3}>删除</Button>
                </Space>

            ),
        },
    ];
    return (
        <>
            {dialogShow.state && <Dialog ><IncDialog onClose={changeDialog} record={record} operate={operate}/></Dialog>}
            <h1>菜单管理</h1>
            <div className="menuEdit">
                <div className="menuEdit-left">
                    <Button type='primary' onClick={addMenu}>+新增</Button>
                    <AuthButton type='text' name='menu:delete' root='权限管理'>删除</AuthButton>
                </div>
                <div className="menuEdit-right">
                    <Button onClick={refresh}>刷新</Button>
                </div>
            </div>
            {props.menu_list.length>0 && <Table columns={columns} dataSource={props.menu_list} rowKey={record => record.id} bordered defaultExpandAllRows/>}


        </>
    );
}

export default connect(
    state =>({
        menu_list:state.menu_list
    }),
    {

    }
)(Menu);