
import loadable from "@loadable/component";
import {useRoutes} from 'react-router-dom'

import * as Icon from '@ant-design/icons'
import React from "react";
export default function GetRoutes(routes) {
    console.log("########")
    function bindRouter(routes) {
        routes.map((item)=>{
            const Component = loadable(() => {
                return import("../"+item.componentpath)
            });
            if (item.label==="登录"||item.label==="404"){
                item.path = item.routepath
                item.key = item.routepath
                item.element=<Component />

            }
            else if (item.children){
                item.iconname=item.icon
                if (typeof(item.icon)=='string'){
                    item.icon = React.createElement(Icon[item.icon])
                }
                item.path = item.routepath
                item.key = item.routepath

                item.children = [...bindRouter(item.children)]
            }else {
                item.iconname=item.icon
                if (typeof(item.icon)=='string'){
                    item.icon = React.createElement(Icon[item.icon])
                }
                item.path = item.routepath
                item.key = item.routepath

                item.element=<Component />
            }
        })
        return routes

    }

    // const routes =  [
    //     {
    //         path:"/",
    //         label:"首页",
    //         key:"/",
    //         icon:<BookOutlined />,
    //         button:[],
    //         component:"pages"
    //     },
    //     {
    //         path:"/permission",
    //         label:"权限管理",
    //         key:"/permission",
    //         icon:<BookOutlined />,
    //         button:[],
    //         children:[
    //             {
    //                 path:"/permission/menu",
    //                 label:"菜单管理",
    //                 key:"/permission/menu",
    //                 icon:<BookOutlined />,
    //                 button:[],
    //                 component:"pages/menu"
    //             },
    //             {
    //                 path:"/permission/role",
    //                 label:"角色管理",
    //                 key:"/permission/role",
    //                 icon:<BookOutlined />,
    //                 button:[],
    //                 component:"pages/menu"
    //             },
    //             {
    //                 path:"/permission/user",
    //                 label:"用户管理",
    //                 key:"/permission/user",
    //                 icon:<BookOutlined />,
    //                 button:[],
    //                 component:"pages/menu"
    //             }
    //         ]
    //     }
    //
    // ]
    return bindRouter(routes)

}