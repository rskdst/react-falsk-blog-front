import React from 'react';
import "./index.css"

import Editor from './components/richTextEditor';
import { Button, Input } from 'antd';
import { useState,useRef } from 'react';
import UploadDialog from './components/uploadDialog';

const Article = () => {
  const eRef = useRef(null)
  const uRef = useRef(null)
  const [titleCount,setTitleCount] = useState(0)
  const [dialogShow,setDialogShow] = useState(false)

  const handlePublish = ()=>{
    uRef.current.setOpen(true)
    console.log(eRef.current.editorState.toHTML())
  }

  return ( 
    <div className='article-main'>
      <UploadDialog ref={uRef}/>
      <div className='article-title'>
        <h2>文章标题</h2>
        <Input className='title-input' placeholder="请输入标题（5～100个字）" suffix={`${titleCount}/100`}></Input>
        <Button type='primary' shape="round" size="large" onClick={handlePublish}>发布文章</Button>
      </div>
      <Editor ref={eRef}/>
    </div>
    
   );
}
 
export default Article;