import loadable from "@loadable/component";
import { deepClone } from "../utils/common";
import * as Icon from '@ant-design/icons'
import React from "react";
export default function GetRoutes(menus) {
    function bindRouter(routes) {
        for (let i=0;i<routes.length;i++){
            const Component = loadable(() => {
                return import("../"+routes[i].componentpath)
            })
            if (routes[i].children){
                
                routes[i].iconname=routes[i].icon.slice()
                if (typeof(routes[i].icon)=='string' && routes[i].icon.length>0){
                    routes[i].icon = React.createElement(Icon[routes[i].icon])
                }
                routes[i].path = routes[i].routepath
                routes[i].key = routes[i].routepath
                
                routes[i].children = [...bindRouter(routes[i].children)]
                if (routes[i].children[0].type === "按钮") {
                    routes[i].element=<Component />
                    delete routes[i].children
                    continue
                }
            }else {
                routes[i].iconname=routes[i].icon.slice()
                if (typeof(routes[i].icon)=='string' && routes[i].icon.length>0){
                    routes[i].icon = React.createElement(Icon[routes[i].icon])
                }
                routes[i].path = routes[i].routepath
                routes[i].key = routes[i].routepath

                routes[i].element=<Component />
            }
            
        }
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
    // let routes = []
    // function filterRoutes(menus) {
    //     for (let i = 0;i<menus.length;i++){

    //         routes.push(menus[i])
    //         if (menus[i].children && menus[i].children[0].type === "按钮"){
    //             delete menus[i].children
    //             continue
    //         }
    //         if (menus[i].children){
                
    //         }


    //     }
    // }
    // for (let m = 0;m<menus.length;m++) {
        
    // } 
    // let [...routes] = menus
    let routes = deepClone(menus)
    return {menus,routes:bindRouter(routes)}

}