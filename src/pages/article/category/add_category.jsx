import React,{useState} from 'react';
import { Form,Input,Upload,Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import "./index.css"
const AddCategory = () => {
    const navigate = useNavigate()
    const [fileList, setFileList] = useState([])

    const onFinish = ()=>{

    }
    
    return ( 
        <>
            <a onClick={()=>{navigate("/article/category")}}>{"< 返回分类专栏"}</a>
            <Form
                name='basic'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{width:"30%",marginTop:"1rem"}}
                onFinish={onFinish}
            >
                <Form.Item
                    label="分类专栏名称"
                    name="category_name"
                    rules={[{ required: true, message: '请填写分类专栏' }]}
                >
                    <Input placeholder='请输入分类专栏名称'/>

                </Form.Item>
                <Form.Item
                    label="分类专栏简介"
                    name="category_introduction"
                    rules={[{ required: true, message: '请填写分类简介' }]}
                >
                    <Input.TextArea
                    showCount
                    maxLength={100}
                    style={{ height: 120, marginBottom: 24 }}
                    // onChange={onChange}
                    placeholder="请填写分类简介"/>

                </Form.Item>
                <Form.Item
                    label="分类专栏配图"
                    name="category_picture"
                >
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        // onPreview={handlePreview}
                        // onChange={handleChange}
                    >
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                marginTop: 8,
                                }}
                            >
                                点击上传图片，建议尺寸120*120像素
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item noStyle>
                    <div style={{width:"100%",textAlign:"center"}}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </div>
                    
                </Form.Item>
            </Form>
        </>
     );
}
 
export default AddCategory;