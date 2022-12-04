import React, {useState, useEffect, useRef, useCallback} from 'react';


import {Button, Form, Input, Switch, Upload, TreeSelect} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Tip from "../../../components/layout/Tip";
import './index.css'
import {connect} from "react-redux";
import {addMenuAsync,editMenuAsync} from "../../../store/actions/menu";
import {getListByTree} from "../../../utils/common";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '请填写 ${label}！'
};

function IncDialog(props) {
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    useEffect(()=>{
        console.log(props)
        if (props.record.pid){
            form.setFieldsValue({
                parent: props.record.pid
            })
        }

    })

    //图标上传限定数量
    const handleChangeIcon = (info) =>{
        let newFileList = [...info.fileList];
        newFileList = newFileList.slice(-1);
        newFileList = newFileList.map((file) => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });

        setFileList(newFileList);
    }

    //获取父级菜单信息
    const handleChangePid = () => {

    }

    //新增,更新菜单数据
    const onSubmit = (formData) =>{
        const menu = formData.menu

        const label = menu.label
        const pid = form.getFieldValue("parent")===undefined?0:form.getFieldValue("parent")
        const pname = menu.parent===undefined?"":menu.parent
        const icon = menu.icon===undefined?"":menu.icon
        const routePath = menu.routePath
        const componentPath = menu.componentPath===undefined?"":menu.componentPath
        const weight = menu.weight
        const state = menu.state ? 1 : 0
        let data
        debugger
        if (JSON.stringify(props.record) === "{}"){
            data = {label,pid,pname,icon,routePath,componentPath,weight,state}
            props.addMenuAsync(data)

        }else {
            data = {id:props.record.id,label,pid,pname,icon,routePath,componentPath,weight,state}
            props.editMenuAsync(data)
        }

        props.onClose()

    }
    const handleOnSelect=(key,node)=>{
        console.log(key,node)
        form.setFieldsValue({
            parent: node.id
        })
    }
    return (
        <div className="main">
            <Tip tipName={props.record?"编辑菜单":"新增菜单"}/>
            <Form {...layout} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages} style={{padding:'10px 2rem'}} form={form}>
                <Form.Item name={['menu', 'label']} label="菜单名称" initialValue={props.record.label} rules={[{ type: 'string',required:true }]} labelCol={{'span': 5, 'offset': 1}}>
                    <Input/>
                </Form.Item>
                <Form.Item name={['menu', 'parent']} label="父级菜单" initialValue={props.record.pname}  labelCol={{'span': 5, 'offset': 1}}>
                    <TreeSelect
                        treeDataSimpleMode
                        height={500}
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="Please select"
                        onSelect={handleOnSelect}
                        treeData={getListByTree(props.menu)}
                    />
                    {/*<Input />*/}
                </Form.Item>
                <Form.Item name={['menu', 'icon']} label="图标" initialValue={props.record.iconname} labelCol={{'span': 4, 'offset': 2}}>
                    <Input />
                </Form.Item>
                <Form.Item name={['menu', 'routePath']} label="路由地址" initialValue={props.record.routepath} rules={[{ type: 'string',required:true }]} labelCol={{'span': 5, 'offset': 1}}>
                    <Input />
                </Form.Item>
                <Form.Item name={['menu', 'componentPath']} label="组件地址" initialValue={props.record.componentpath} labelCol={{'span': 5, 'offset': 1}}>
                    <Input />
                </Form.Item>
                <Form.Item name={['menu', 'weight']} label="权重" initialValue={props.record.weight} rules={[{required:true }]} labelCol={{'span': 5, 'offset': 1}}>
                    <Input />
                </Form.Item>
                <Form.Item name={['menu', 'state']} label="启用" initialValue={props.record.state||"1"} labelCol={{'span': 4, 'offset': 2}}>
                    <Switch defaultChecked={Object.keys(props.record).length>0&&props.record.state==="0"?false:true}/>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} labelCol={{'span': 4, 'offset': 2}}>
                    <Button type="primary" htmlType="submit">
                        确定
                    </Button>
                    <Button style={{marginLeft:'2rem'}} danger onClick={props.onClose}>
                        关闭
                    </Button>
                </Form.Item>
            </Form>
        </div>


    );
}


export default connect(
    state =>({
        menu:state.menu
    }),
    {
        addMenuAsync,
        editMenuAsync
    }
)(IncDialog);