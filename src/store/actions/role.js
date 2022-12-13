import {GETROLE_ASYNC,ADDROLE_MENU_ASYNC} from '../constants'
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

