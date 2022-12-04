import React from 'react';
import {Routes,Route,Link,useNavigate} from 'react-router-dom'
import './index.css'
import Login from "../../pages/login";
function HeaderBar(props) {
    const navigate = useNavigate()
    //点击登录
    const handleLogin = ()=>{
        console.log("###")
        navigate("/login",{replace:true})
    }

    return (
        <div className="header">
            <h1 style={{color:"white",lineHeight:'3.6rem'}}>Blog后台管理系统</h1>
            <div className="header-left">
                {/*<Link to='/login'><span className='header-login'>登录</span></Link>*/}
                <span className='header-login' onClick={handleLogin}>登录</span>

            </div>

        </div>
    );
}

export default HeaderBar;