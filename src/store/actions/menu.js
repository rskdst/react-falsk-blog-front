import {GETMENU_ASYNC,ADDMENU_ASYNC,EDITMENU_ASYNC,GETMENULIST_ASYNC} from '../constants'
// 异步自增（等待1秒才触发自增action）
export const getMenuAsync = () => {
    return {
        type: GETMENU_ASYNC
    }
}

export const addMenuAsync = (data) => {
    return {
        type: ADDMENU_ASYNC,
        data
    }
}

export const editMenuAsync = (data) => {
    return {
        type: EDITMENU_ASYNC,
        data
    }
}

