import {GETMENU,GETMENU_LIST} from '../constants'


export const menu = (state = [], action = {}) => {
    switch(action.type) {
        case GETMENU:
            state = [...action.data]
            return state;
        default:
            return state;
    }
}

export const menu_list = (state = [], action = {}) => {
    switch(action.type) {
        case GETMENU_LIST:
            state = [...action.data]
            return state;
        default:
            return state;
    }
}