import { combineReducers } from 'redux';
import {menu,menu_list} from './menu';
import {user} from './user';
import {role,role_list} from './role'
import { categorys } from './article';

export default combineReducers({
    menu,
    menu_list,
    user,
    role,
    role_list,
    categorys
})