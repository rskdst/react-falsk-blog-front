import React, { useState,forwardRef, useImperativeHandle } from 'react';
import MdEditor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
const Editor = forwardRef(({}, ref) => {
  const [text, setText] = useState('');
  useImperativeHandle(ref, () => ({
    editorText:text
    }))
  return (<MdEditor modelValue={text} onChange={setText} />);
});
export default Editor