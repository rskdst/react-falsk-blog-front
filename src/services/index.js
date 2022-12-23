/**
 * index1.js
 * api地址管理
 */
export default {
    //菜单
    getMenu:'/menu/menu',
    setMenu:"/menu/addMenu",
    editMenu:"/menu/editMenu",

    //用户
    getUser:"/user/user",
    login:'/user/login',
    register:'/user/register',
    adduserRole:"/user/adduserRole",

    //角色
    getRole:"/role/role",
    getRoleList:"/role/roleList",
    addRoleMenu:"/role/addMenuPermission",

    //文章
    saveArticle:"/article/save"
    

}