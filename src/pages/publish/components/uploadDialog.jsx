import React,{useEffect,useState,forwardRef, useImperativeHandle } from 'react';
import {createPortal} from "react-dom";
import "./index.css"
import {Radio,Form,Input,message, Upload,Modal,Select,Button,Checkbox, notification, Row,Tag} from 'antd'
import { LoadingOutlined, PlusOutlined,CloseOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import {connect} from "react-redux";
import { saveArticleAsync,getArticleCategoryAsync } from '../../../store/actions/article';
import Tags from './tags';
const { TextArea } = Input;

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
  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
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
const UploadDialog = forwardRef(({...props}, ref) => {
  console.log(props)
    const document = window.document;
    const node = document.createElement("div");
    const tRef = useRef(null)
    const [textAreaValue,setTextAreaValue] = useState("")

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([])
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const [api, contextHolder] = notification.useNotification();

    useEffect(()=>{
      //获取专栏数据
      props.getArticleCategoryAsync()
    },[])
    useEffect(() => {
        document.body.appendChild(node)
        return () => {
            document.body.removeChild(node);
        };
    }, []);

    useImperativeHandle(ref, () => ({
        setOpen:setOpen
    }))

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = (info) => {
      setFileList(info.fileList)
      if (info.file.status==="done"){
        info.file.url = info.file.response.data.filepath
      }
      
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

    const handleChangeCategory = (value)=>{
      console.log(`selected ${value}`);
    }

    const onChangeArticleType = (checkedValues) => {
        console.log('checked = ', checkedValues);
        
      };

    const onChangePublishType = (checkedValues) => {
        console.log('checked = ', checkedValues);
    
    };

    const onChangeContentLevel = (checkedValues) => {
        console.log('checked = ', checkedValues);
    
    };

    const openNotification = (placement,msg) => {
      api.error({
        message: "温馨提示",
        description:msg,
        placement,
      });
    };
    //一键提取摘要
    const handleExtract = ()=>{
      const title = props.title.current.input.value
      setTextAreaValue(title)
    }
    const onFinish = (formData) => {
      console.log(tRef.current.tags)
      
      console.log(fileList)
      if (formData.cover_type==="0"&&fileList.length!==1) {
        openNotification('bottom',"请上传图片")
        return
      }
      if (tRef.current.tags.length===0){
        openNotification('bottom',"请添加标签")
        return
      }
      if (formData.category.length===0){
        openNotification('bottom',"请选择分类专栏")
        return
      }
      console.log(typeof(formData))
      //上传文章

      formData.title = props.title.current.input.value
      formData.tags = tRef.current.tags
      formData.content = props.editor.current.editorText
      if (formData.cover_type==="0"){
        formData.cover_pictrue = fileList[0].url
      }else{
        formData.cover_pictrue = ""
      }
      if (formData.article_type==="1"){
        formData.original_link = ""
      }
      console.log('Success:', formData);

      props.saveArticleAsync(formData)

    };
    return (
        <Modal
        title="发布文章"
        centered
        open={open}
        okText="发布文章"
        cancelText="取消"
        maskClosable={false}
        // onOk={onFinish}
        onCancel={() => setOpen(false)}
        okButtonProps={{htmlType: 'submit', form: 'editForm'}}
        width="50rem"
        
      >
           {contextHolder}
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
                                        name="file"
                                        listType="picture-card"
                                        action="http://localhost:8080/api/article/upload"
                                        headers={{
                                          Authorization:`Bearer ${localStorage.token}`
                                        }}
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChange}
                                        >
                                          {/* {uploadButton} */}
                                        {fileList.length>0 ? null : uploadButton}
                                    </Upload>
                                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                      <img
                                        alt="example"
                                        style={{
                                          width: '100%',
                                        }}
                                        src={previewImage}
                                      />
                                    </Modal>
                                    </Form.Item>
                                ): null

                            }
                        </Form.Item>
                        <Form.Item
                        name="abstract"
                        initialValue=""
                        style={{flex:"1"}}
                        >
                          <TextArea showCount maxLength={256} allowClear autoSize={{ minRows: 4, maxRows: 4 }} placeholder="摘要（必填）"/>
                            {/* <TextArea value={textAreaValue} onChange={(e)=>setTextAreaValue(e.target.value)} showCount maxLength={256} allowClear autoSize={{ minRows: 4, maxRows: 4 }} placeholder="摘要（必填）"/> */}
                            {/* <span style={{color: "#555666",position:"absolute",right:"55px",cursor:"pointer"}} onClick={handleExtract}>一键提取</span> */}
                        </Form.Item>
                    </div>
                    
                </div>
            </div>
            <div className='form-tag-box'>
                <label>文章标签：</label>
                <div className='form-tag-box-right'>
                  <Tags ref={tRef}/>
                </div>
                
            </div>
            <div className='form-tag-box'>
                <label>分类专栏：</label>
                <div className='form-tag-box-right'>
                  <Form.Item
                    name="category"
                    initialValue={undefined}>
                    <Select
                      mode="tags"
                      maxTagCount={3}
                      style={{
                        width: '100%',
                      }}
                      placeholder="最多添加3个专栏"
                      onChange={handleChangeCategory}
                      fieldNames={{label:"category_name",value:"id"}}
                      options={props.categorys}
                    />
                  </Form.Item>
                    
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
        </Form>    
      </Modal>
        
    );
})
 
export default connect(
  state =>({
    categorys:state.categorys
  }),
  {
    saveArticleAsync,
    getArticleCategoryAsync
  },null, { forwardRef: true }
)(UploadDialog);
// export default UploadDialog