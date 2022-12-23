import React from 'react';

const Content = () => {
  return (
    <>
      <div>内容管理</div>
      <button onClick={()=>{window.open('/publish',"_blank")}}>发布</button>
    </>
    
  );
}
 
export default Content;