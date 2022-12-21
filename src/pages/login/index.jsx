import React from 'react';
import {useState} from 'react';
import {Link} from "react-router-dom";
import { Button, Checkbox, Form, Input,Select } from 'antd';
import './index.css'
import {connect} from "react-redux";
import {login} from "../../store/actions/user";

const { Option } = Select;
const Login = (props) => {
    const [active,setActive] = useState(true)

    const onFinish = (formData) => {
        console.log('Success:', formData);
        const username = formData["username"]
        const password = formData["password"]
        props.login({username,password})
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="login">
            <div className="loginMain">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div className="formHeader">
                        <div className={active? "tabsTab active" : "tabsTab"} onClick={()=>{setActive(true)}}>账号密码登陆</div>
                        <div className={active? "tabsTab" : "tabsTab active"}  onClick={()=>{setActive(false)}}>手机号登录</div>
                    </div>
                    {active ?
                        <div className="formMain">
                            <Form.Item
                                label="用户名"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="密&nbsp;&nbsp;&nbsp;&nbsp;码"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit" style={{width:'100%'}}>
                                    登录
                                </Button>
                            </Form.Item>
                        </div>:
                        <div className="formMain">
                            <Form.Item
                                label="手机号"
                                name="phone"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input.Group compact>
                                    <Select defaultValue="+86"  style={{ textAlign: 'left',width:'25%',fontSize:'8px' }}>
                                        <Option value="+86">+86</Option>
                                    </Select>
                                    <Input style={{ width: '75%' }} />
                                </Input.Group>
                            </Form.Item>

                            <Form.Item
                                label="验证码"
                                name="verification"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input  style={{ width: '65%' }}/>
                                <Button style={{ width: '35%',fontSize:'8px',padding:0 }}>获取验证码</Button>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit" style={{width:'100%',marginTop:'3rem'}}>
                                    登录/注册
                                </Button>
                            </Form.Item>
                        </div>
                    }
                </Form>
                <span>没有账号？<Link to="/register">注册</Link></span>
            </div>
        </div>
    );
}

export default connect(
    state =>({
    }),
    {
        login
    }
)(Login);