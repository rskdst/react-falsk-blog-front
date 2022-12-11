import React, { useState,useEffect } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import {useNavigate,useRoutes,useLocation} from 'react-router-dom'
import HeaderBar from "../components/headerBar";
import './index.css'
import {connect} from "react-redux";
import {getMenuAsync} from "../store/actions/menu";
const { Header, Content, Footer, Sider } = Layout;

const L = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()
    const [openKeys, setOpenKeys] = useState(["/"]);

    // 请求菜单列表
    useEffect(()=>{

        props.getMenuAsync();//获取树形菜单列表
    },[])

    useEffect(() => {
        //刷新页面时获取展开菜单数组

        if (location.pathname !== "/") {
            setOpenKeys(getOpenKeys(location.pathname))
        }
    }, [])
    //根据url获取需要展开的菜单数组
    const getOpenKeys = (pathname) => {
        const arr = pathname.split("/")
        const default_openKeys = []
        let str = ""
        for (var i = 1; i < arr.length-1; i++) {
            str += `/${arr[i]}`
            default_openKeys.push(str)
        }
        return default_openKeys
    }
    //点击菜单跳转
    const onClick = (e) => {
        navigate(e.key)

    };
    //获取根菜单
    const rootSubmenuKeys = props.menu.map(menu => menu.key)
    const onOpenChange = (keys) => {

        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };


    return (
        <div className='container'>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="logo" />
                    <Menu theme="dark"
                          defaultSelectedKeys={[location.pathname]}
                          openKeys={openKeys}
                          onOpenChange={onOpenChange}
                          mode="inline"
                          items={props.menu}

                          onClick={(data) => navigate(data.key)}/>

                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0,zIndex:'99' }}>
                        <HeaderBar/>

                    </Header>
                    <Content style={{margin: collapsed ? '3.6rem 3rem 1rem 8rem' : '3.6rem 3rem 1rem 18rem',position:'relative'}}>
                        <Breadcrumb style={{ margin: '1rem 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background site-layout-content" style={{ padding: 24, height: '100%',minHeight:"75vh",position:"relative",boxShadow:'5px 5px 10px 5px #ccc' }}>
                            {useRoutes(props.menu)}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center',marginLeft: collapsed ? '8rem' : '18rem' }}>Design ©2022 Created by jliu</Footer>
                </Layout>
            </Layout>
        </div>

    );
};

export default connect(
    state =>({
        menu:state.menu,
    }),
    {
        getMenuAsync
    }
)(L);