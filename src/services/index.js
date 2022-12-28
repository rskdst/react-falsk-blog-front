/**
 * index1.js
 * api地址管理
 */
export default {
    //菜单
    getMenu:'/menu/menu',
    getMenuList:'/menu/menuList',
    setMenu:"/menu/addMenu",
    editMenu:"/menu/editMenu",

    //用户
    getUser:"/user/user",
    login:'/user/login',
    register:'/user/register',
    adduserRole:"/user/adduserRole",

    //角色
    getRole:"/role/role",
    getRoleList:"/role/getMenuIdsByRole",
    addRoleMenu:"/role/addMenuPermission",

    //文章
    saveArticle:"/article/save",
    getArticleList:"article/list",
    addArticleCategory:"/article/addCategory",
    getArticleCategory:"/article/getCategory",
    getQueryCriteria:"/article/getQueryCriteria"
    

}