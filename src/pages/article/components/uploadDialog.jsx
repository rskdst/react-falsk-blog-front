import React,{useEffect,useState,forwardRef, useImperativeHandle } from 'react';
import {createPortal} from "react-dom";
import "./index.css"
import {Radio,Form,Input,message, Upload,Modal,Popover,Button,Checkbox, Col, Row,Tag} from 'antd'
import { LoadingOutlined, PlusOutlined,CloseOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { CheckableTag } = Tag;
const tagOptions = [
    {
      label: 'Apple',
      value: '1',
    },
    {
      label: 'Pear',
      value: '2',
    },
    {
      label: 'Orange',
      value: '3',
    },
    
    
  ];
  const categoryOptions = [
    {
      label: 'Apple',
      value: '1',
    },
    {
      label: 'Pear',
      value: '2',
    },
    {
      label: 'Orange',
      value: '3',
    },
    
    
  ];
  const articleTypeOptions = [
    {
      label: '原创',
      value: '1',
    },
    {
      label: '转载',
      value: '2',
    }
  ];
  const publishTypeOptions = [
    {
      label: '全部可见',
      value: '1',
    },
    {
      label: '仅我可见',
      value: '2',
    }
  ];
  const contentLevelOptions = [
    {
      label: '初级',
      value: '1',
    },
    {
      label: '中级',
      value: '2',
    },
    {
        label: '高级',
        value: '3',
      }
  ];
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const UploadDialog = forwardRef(({}, ref) => {
    const document = window.document;
    const node = document.createElement("div");

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([])
    const [previewVisible,setPreviewVisible] = useState(false)
    const [previewImage,setPreviewImage] = useState("")

    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategorys, setselectedCategorys] = useState([]);

    useEffect(() => {
        document.body.appendChild(node)
        return () => {
            document.body.removeChild(node);
        };
    }, []);

    useImperativeHandle(ref, () => ({
        setOpen:setOpen
    }))

    const onSubmit = (formData)=>{
        console.log(formData)
    }

    const handleChange = (info) => {
      console.log(info)
      setFileList(info.fileList)
        // if (info.file.status === 'uploading') {
        //   setLoading(true);
        //   return;
        // }
        // if (info.file.status === 'done') {
        //   // Get this url from response in real world.
        //   getBase64(info.file.originFileObj, (url) => {
        //     setLoading(false);
        //     setImageUrl(url);
        //   });
        // }
      };
    const handlePreview = (file) => {
        setPreviewImage(file.thumbUrl)
        setPreviewVisible(true)
      };
      const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div
            style={{
              marginTop: 8,
            }}
          >
            上传图片
          </div>
        </div>
    );
    const onChangeTags = (checkedValues) => {
        console.log('checked = ', checkedValues);
        const nextSelectedTags = tagOptions.filter((tag)=>{
            return checkedValues.includes(tag.value)})
        setSelectedTags(nextSelectedTags);
    };

    const onChangeCategorys = (checkedValues) => {
        console.log('checked = ', checkedValues);
        const nextSelectedTags = categoryOptions.filter((tag)=>{
            return checkedValues.includes(tag.value)})
            setselectedCategorys(nextSelectedTags);
    };

    const onChangeArticleType = (checkedValues) => {
        console.log('checked = ', checkedValues);
        
      };

    const onChangePublishType = (checkedValues) => {
        console.log('checked = ', checkedValues);
    
    };

    const onChangeContentLevel = (checkedValues) => {
        console.log('checked = ', checkedValues);
    
    };

    const tag_title = ()=>{
        return  <h3 style={{width:"20rem",textAlign:"center"}}>
                    标签
                </h3>
    }
    const tag_content = ()=>{
        return  <div style={{height:"13rem",overflow:"auto",position:"relative"}}>
                    <Input placeholder="Enter键入可添加自定义标签"/>
                        <h4 style={{margin:"5px 0"}}>添加标签</h4>
                    <Form.Item
                    name="tag"
                    initialValue={[]}>
                        <Checkbox.Group options={tagOptions} onChange={onChangeTags} />
                    </Form.Item>
                    
                    <span style={{fontSize:"12px",color:"#999",position:"absolute",bottom:"0",right:"0"}}>还可添加3个标签</span>
                </div>
    }
    const onFinish = (values) => {
        console.log('Success:', values);
      };
    return (
        <Modal
        title="发布文章"
        centered
        open={open}
        okText="发布文章"
        cancelText="取消"
        maskClosable={false}
        onOk={onFinish}
        onCancel={() => setOpen(false)}
        okButtonProps={{htmlType: 'submit', form: 'editForm'}}
        width="50rem"
        
      >
           
        <Form name="nest-messages" 
            // form={form}
            id="editForm"
            onFinish={onFinish}
            
            >
            <div className='form-tag-box'>
                <label>封面&摘要：</label>
                <div className='form-tag-box-right'>
                    
                    <Form.Item
                    name="cover_type"
                    initialValue="1"
                    >
                        
                        <Radio.Group>
                            <Radio value="0">单图</Radio>
                            <Radio value="1">无封面</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <div className='form-tag-box-abstract'>
                        <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.cover_type !== currentValues.cover_type}>
                            {({ getFieldValue }) => 
                                getFieldValue('cover_type') === '0' ? (
                                    <Form.Item
                                    name="cover_picture"
                                    initialValue=""
                                    style={{marginRight:"1rem"}}
                                    >
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        showUploadList={false}
                                        action=""
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        beforeUpload={() => {
                                          //阻止上传
                                           return false;
                                       }}
                                        onChange={(info) => { handleChange(info) }}
                                        >
                                        {fileList.length>1 ? null : uploadButton}
                                    </Upload>
                                    </Form.Item>
                                ): null

                            }
                        </Form.Item>
                        <Form.Item
                        name="abstract"
                        initialValue=""
                        style={{flex:"1"}}
                        >
                            <TextArea showCount maxLength={256} autoSize={{ minRows: 4, maxRows: 4 }} placeholder="摘要（必填）"/>
                        </Form.Item>
                    </div>
                    
                </div>
            </div>
            <div className='form-tag-box'>
                <label>文章标签：</label>
                <div className='form-tag-box-right'>
                    {selectedTags.length > 0 && <div className='tag-list'>
                        {selectedTags.map((tag)=>{return <span key={tag.value}>{tag.label}<Button style={{marginLeft:"5px"}} type="link" shape="circle" size='small' icon={<CloseOutlined style={{color:"#267dcc",fontSize:"14px"}}/>}/></span>})}
                    </div>}
                    <Popover placement="bottomLeft" title={tag_title} content={tag_content} trigger="click">
                        {selectedTags.length < 5 && <Button>+添加</Button>}
                    </Popover>
                </div>
                
            </div>
            <div className='form-tag-box'>
                <label>分类专栏：</label>
                <div className='form-tag-box-right'>
                    <div style={{height:"1.5rem",marginBottom:"10px"}}>
                        {selectedCategorys.length > 0 && <div className='tag-list'>
                            {selectedCategorys.map((tag)=>{return <span key={tag.value}>{tag.label}<Button style={{marginLeft:"5px"}} type="link" shape="circle" size='small' icon={<CloseOutlined style={{color:"#267dcc",fontSize:"14px"}}/>}/></span>})}
                        </div>}
                        <span style={{color:"#ccc"}}>请选择</span>
                    </div>
                    <div className='category-box'>
                        <div className='category-box-txt'>
                            
                            <h3 style={{color: "#555666"}}>最多选择3个分类专栏</h3>
                        </div>
                        <div className='category-box-list'>
                        <Form.Item
                        name="category"
                        initialValue={[]}>
                            <Checkbox.Group
                                style={{
                                width: '100%',
                                flex:"1"
                                }}
                                options={categoryOptions}
                                onChange={onChangeCategorys}
                            >
                            </Checkbox.Group>
                        </Form.Item>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            <div className='form-tag-box'>
                <label>文章类型：</label>
                <div className='form-tag-box-right'>
                    <Form.Item
                    name="article_type"
                    initialValue="1">
                        <Radio.Group 
                        onChange={onChangeArticleType} 
                        options={articleTypeOptions}/>
                    </Form.Item>
                    <Form.Item noStyle  shouldUpdate={(prevValues, currentValues) => prevValues.article_type !== currentValues.article_type}>
                        {({ getFieldValue }) => 
                            getFieldValue('article_type') === '2' ? (
                                <Form.Item
                                name="original_link"
                                initialValue=""
                                style={{marginRight:"1rem"}}
                                rules={[{ required: true, message: '请填写原文链接' }]}
                                >
                                    <Input placeholder='请填写原文链接'/>
                                </Form.Item>
                            ): null

                        }
                    </Form.Item>
            </div>
            
            </div>
            <div className='form-tag-box'>
                <label>发布形式：</label>
                <div className='form-tag-box-right'>
                <Form.Item
                name="pulish_type"
                initialValue="1">
                    <Radio.Group 
                    onChange={onChangePublishType} 
                    options={publishTypeOptions}
                    />
                </Form.Item>
            </div>
            
            </div>
            <div className='form-tag-box'>
                <label>内容等级：</label>
                <div className='form-tag-box-right'>
                    <Form.Item
                    name="content_level"
                    initialValue="1">
                        <Radio.Group 
                        onChange={onChangeContentLevel} 
                        options={contentLevelOptions}
                        />
                    </Form.Item>
                </div>
            
            </div>
            {/* <Form.Item >
                    <Button type="primary" htmlType="submit">
                        确定
                    </Button>
                </Form.Item> */}
        </Form>    
      </Modal>
        
    );
})
 
export default UploadDialog;