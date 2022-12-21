import React from 'react';
import {useNavigate} from 'react-router-dom'
import './index.css'
function HeaderBar(props) {
    const navigate = useNavigate()

    return (
        <div className="header">
            <h1 style={{color:"white",lineHeight:'3.6rem'}}>Blog后台管理系统</h1>
            <div className="header-left">
                <span className='header-login' onClick={()=>{navigate("/login",{replace:true})}}>登录</span>
            </div>

        </div>
    );
}

export default HeaderBar;