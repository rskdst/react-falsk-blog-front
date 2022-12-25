import React, { useState,useEffect } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import {useNavigate,useRoutes,useLocation,Link} from 'react-router-dom'
import HeaderBar from "../components/headerBar";
import './index.css'
import {connect} from "react-redux";
import {getMenuAsync} from "../store/actions/menu";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const L = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()
    const [openKeys, setOpenKeys] = useState(["/"]);

    // 请求菜单列表
    useEffect(()=>{
        props.getMenuAsync();//获取菜单列表
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

    //展示侧边栏菜单
    const getMenuList = ()=>{
        return props.menu.map(item => {
            if(!item.children || item.children.length === 0){    //如果当前路由没有子路由且该路由的hidden为false或不设置该路由的hidden时则直接显示该路由，若该路由的hidden为true则不显示该路由
                if(item.show==="0") return false

                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.path}> {/*加一个replace是因为当前路由下的 history 不能 push 相同的路径到 stack 里。只有开发环境存在，生产环境不存在，目前还没看到官方有去掉的意思*/}
                            
                            <span>{item.icon}&nbsp;&nbsp;{item.label}</span>
                        </Link>
                    </Menu.Item>
                )               
            }else if(item.children && item.children.length === 1){
                if(item.show==="0") return false

                let noHiddenRouter = [];
                let hiddenRouter = [];
                item.children.map(v => {
                    if(v.show==="0"){
                        hiddenRouter.push(v)
                    }else{                        
                        noHiddenRouter.push(v)
                    }

                    return true
                })

                if(hiddenRouter.length > 0){ //当子路由只有一个且该子路由的hidden为true同时其父路由的hidden为false或不设置其父路由的hidden时则显示其父路由
                    return <Menu.Item key={item.key}><Link to={item.path}><span>{item.icon}&nbsp;&nbsp;{item.label}</span></Link></Menu.Item>
                }

                if(noHiddenRouter.length > 0){ //当子路由只有一个且该子路由的hidden为false或不设置该子路由的hidden时则显示其父路由和下拉的子路由                    
                    return (
                        <SubMenu key={item.key} title={<span>{item.icon}&nbsp;&nbsp;{item.label}</span>}>
                            {
                                noHiddenRouter.map(v => {                                
                                    return <Menu.Item key={v.key}><Link to={v.path}>{v.icon}&nbsp;&nbsp;{v.label}</Link></Menu.Item>                               
                                })
                            }
                        </SubMenu>
                    )
                }
            }else if(item.children && item.children.length > 1){  //当当前路由有两个及两个以上子路由时，若两个子路由的hidden都为true时则该路由和其子路由全部隐藏
                if(item.show==="0") return false

                let noHiddenRouter = [];
                item.children.map(v => {
                    if(v.show==="0"){
                        return <Menu.Item key={item.key}><Link to={item.path}><span>{item.icon}&nbsp;&nbsp;{item.label}</span></Link></Menu.Item>
                    }else{                        
                        noHiddenRouter.push(v)
                        return true
                    }
                })

                if(noHiddenRouter.length > 0){
                    return (
                        <SubMenu key={item.key} title={<span>{item.icon}&nbsp;&nbsp;{item.label}</span>}>
                            {
                                noHiddenRouter.map(v => {                                
                                    return <Menu.Item key={v.key}><Link to={v.path}>{v.icon}&nbsp;&nbsp;{v.label}</Link></Menu.Item>                               
                                })
                            }
                        </SubMenu>
                    )
                }
            }

            return true
        });
    }

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
                        //   items={props.menu}

                          onClick={(data) => navigate(data.key)}>
                            {getMenuList()}
                          </Menu>

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