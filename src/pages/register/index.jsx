import React from 'react';
import './index.css'
import { Button, Form, Input } from 'antd';
import {connect} from "react-redux";
import {register} from "../../store/actions/user";
import {Link} from "react-router-dom";
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} 是必填项!',
};
function Register(props) {
    const formRef = React.createRef()

    const onFinish = (formData) => {
        const username=formData.username;
        const password=formData.password;
        const phone=formData.phone;
        const data = {username,password,phone}

        props.register(data)
        formRef.current.resetFields()

    };
    return (
        <div className="register">
            <h2 style={{borderBottom:'1px solid rgba(5, 5, 5, 0.06)'}}>用户注册</h2>
            <div className="register-main">
                <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} ref={formRef}>
                    <Form.Item
                        name='username'
                        label="用户名"
                        labelCol={{'span': 5, 'offset': 1}}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label="密码"
                        labelCol={{'span': 5, 'offset': 1}}
                        rules={[
                            {
                                required: true,
                                message: '请确认密码',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name='confirm_password'
                        label="确认密码"
                        labelCol={{'span': 6, 'offset': 0}}
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请确认密码',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('与输入的密码不一致'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="手机号"
                        labelCol={{'span': 5, 'offset': 1}}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        labelCol={{'span': 5, 'offset': 1}}
                        wrapperCol={{
                            ...layout.wrapperCol,
                            offset: 9,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <span>已有账号？<Link to="/login">登录</Link></span>
        </div>
    );
}

export default connect(
    state =>({
    }),
    {
        register
    }
)(Register);