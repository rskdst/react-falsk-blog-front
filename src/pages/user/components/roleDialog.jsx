import React, {useState, useEffect, useRef, useCallback} from 'react';


import {Button, Form,Select, Input, Switch, Upload, TreeSelect, message} from 'antd';
import Tip from "../../../components/layout/Tip";
import './index.css'
import {connect} from "react-redux";
import {getRoleAsync} from "../../../store/actions/role";
import {adduserRoleAsync} from "../../../store/actions/user";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '请填写 ${label}！'
};

function RoleDialog(props) {
    const [form] = Form.useForm();

    useEffect(()=>{
        console.log(props)
        props.getRoleAsync()
    },[])


    //新增,更新菜单数据
    const onSubmit = (formData) =>{
        console.log(formData)
        const user_id = props.user_id
        const role_id = formData.role
        if (role_id===undefined){
            message.error("未选择角色")
            return
        }
        props.adduserRoleAsync({user_id,role_id})
        props.onClose()

    }
    
    return (
        <div className="role-main">
            <Tip tipName={props.operate}/>
            <Form {...layout} name="nest-messages" 
                onFinish={onSubmit}
                validateMessages={validateMessages}
                style={{padding:'10px 2rem'}}
                form={form}>
                <Form.Item name="role" label="角色" initialValue="" labelCol={{'span': 4, 'offset': 2}}>
                 <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    fieldNames={{
                        label:"rolename",
                        value:"id"
                    }}
                    options={props.role}
                />
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
        role:state.role
    }),
    {
        getRoleAsync,
        adduserRoleAsync

    }
)(RoleDialog);