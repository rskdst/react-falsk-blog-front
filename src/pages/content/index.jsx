import React from 'react';

const Content = () => {

    const handlePublish = ()=>{
        window.open("/article","_blank")
    }
    return ( 
        <div>
            <h1>内容管理</h1>
            <button onClick={handlePublish}>发布文章</button>
        </div>
     );
}
 
export default Content;