import React from 'react'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import { useState,forwardRef, useImperativeHandle } from 'react'

const Editor = forwardRef(({}, ref) => {
    
    
    const [editorState,setEditorState] = useState(BraftEditor.createEditorState(null))

    useImperativeHandle(ref, () => ({
        editorState:editorState
    }))
    // async componentDidMount () {
    //     // 假设此处从服务端获取html格式的编辑器内容
    //     // const htmlContent = await fetchEditorContent()
    //     // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    //     // this.setState({
    //     //     editorState: BraftEditor.createEditorState(htmlContent)
    //     // })
    // }

    const submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = editorState.toHTML()
        // const result = await saveEditorContent(htmlContent)
    }


    // 富文本框输入触发的函数，这里可以拿到富文本框输入的值
    const handleChange = (editorState) => {
        setEditorState(editorState)
        // console.log(editorState.toHTML())
    }

    return (
        <>
            <BraftEditor
                value={editorState}
                onChange={handleChange}
                // onSave={this.submitContent}
            />
        </>
    )

})

export default Editor
