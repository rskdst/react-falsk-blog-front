import { combineReducers } from 'redux';
import {menu,menu_list} from './menu';
import {user} from './user';
import {role} from './role'

export default combineReducers({
    menu,
    menu_list,
    user,
    role
})