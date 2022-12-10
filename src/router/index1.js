
import loadable from "@loadable/component";

import * as Icon from '@ant-design/icons'
import React from "react";
export default function GetRoutes(routes) {
    console.log("===============")
    function bindRouter(routes) {

        for (var i = 0; i < routes.length; i++){
            // if (routes[i].type === "按钮") {
            //     routes.splice(i, 1);
            //     i--;
            //     continue
            //
            // }
            // const componentpath1 = routes[i].componentpath
            const Component = loadable(() => {
                return import("../"+routes[i].componentpath)
            })
            routes[i].iconname=routes[i].icon
            if (typeof(routes[i].icon)=='string'){
                routes[i].icon = React.createElement(Icon[routes[i].icon])
            }
            routes[i].path = routes[i].routepath
            routes[i].key = routes[i].routepath

            routes[i].element=<Component />
            if (routes[i].children){
                routes[i].children = bindRouter(routes[i].children)
                // if (routes[i].children.length===0){
                //     delete routes[i].children
                // }
            }

            // if (routes[i].children){
            //     routes[i].iconname=routes[i].icon.slice()
            //     if (typeof(routes[i].icon)=='string'){
            //         routes[i].icon = React.createElement(Icon[routes[i].icon])
            //     }
            //     routes[i].path = routes[i].routepath
            //     routes[i].key = routes[i].routepath
            //
            //     routes[i].children = [...bindRouter(routes[i].children)]
            //     routes[i].element=<Component />
            //     if (routes[i].children.length===0){
            //         delete routes[i].children
            //     }
            // }else {
            //
            //     routes[i].iconname=routes[i].icon.slice()
            //     if (typeof(routes[i].icon)=='string'){
            //         routes[i].icon = React.createElement(Icon[routes[i].icon])
            //     }
            //     routes[i].path = routes[i].routepath
            //     routes[i].key = routes[i].routepath
            //
            //     routes[i].element=<Component />
            // }
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
    return bindRouter(routes)

}