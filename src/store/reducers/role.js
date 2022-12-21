import {GETROLE,GETROLELIST,RESETROLELIST} from '../constants'

//用户权限树
export const role = (state = [], action = {}) => {
    switch(action.type) {
        case GETROLE:
            state = [...action.data]
            return state;
        default:
            return state;
    }
}

//用户权限列表
export const role_list = (state = [],action={}) => {
    switch(action.type) {
        case GETROLELIST:
            state = [...action.data]
            return state
        case RESETROLELIST:
            state = []
            return state
        default:
            return state
    }
}