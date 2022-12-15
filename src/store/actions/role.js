import {GETROLE_ASYNC,ADDROLE_MENU_ASYNC,GETROLELIST_ASYNC,RESETROLELIST} from '../constants'
// 异步 获取角色数据
export const getRoleAsync = () => {
    return {
        type: GETROLE_ASYNC
    }
}

//异步 上传角色权限
export const addRoleMenuAsync = (data) =>{
    return {
        type: ADDROLE_MENU_ASYNC,
        data
    }
}

//异步 获取角色拥有的权限列表
export const getRoleListAsync = (data) =>{
    return {
        type:GETROLELIST_ASYNC,
        data
    }
}

//同步 清空角色拥有的权限列表
export const resetRoleList = () =>{
    return {
        type:RESETROLELIST
    }
}