import {put,call, takeEvery} from 'redux-saga/effects';
import request from '../../utils/request'
import api from '../../services/index'
import {message} from "antd";
import GetRoutes from "../../router/index";

import {GETMENU,GETMENU_ASYNC,ADDMENU_ASYNC,EDITMENU_ASYNC,GETMENU_LIST,GETMENULIST_ASYNC} from '../constants'



//获取用户权限菜单
function* getMenu() {
    //此处编写异步请求
    try{
        const res = yield call(request.get,api.getMenu)
        const menus = GetRoutes(res.data)
        yield put({type: GETMENU,data:menus});
    }catch (e) {
        console.log("异步请求出错")
        message.error("获取菜单失败！")
    }
}

//获取完整菜单
function* getMenuList() {
    //此处编写异步请求
    try{
        const res = yield call(request.get,api.getMenuList)
        yield put({type: GETMENU_LIST,data:res.data});
    }catch (e) {
        console.log("异步请求出错")
        message.error("获取菜单失败！")
    }
}


//新增菜单
function* addMenu({data}) {
    //此处编写异步请求
    try{
        yield call(request.post,api.setMenu,data)
        message.success("添加成功！")
    }catch (e) {
        console.log("异步请求出错")
        message.error("添加失败！")
    }

}
//更新菜单
function* editMenu({data}) {
    //此处编写异步请求
    try{
        yield call(request.post,api.editMenu,data)
        message.success("更新成功！")
    }catch (e) {
        console.log("异步请求出错")
        message.error("更新失败！")
    }

}

// 监听异步自增事件
export function* takeMenu() {
    yield takeEvery(GETMENU_ASYNC, getMenu);
    yield takeEvery(GETMENULIST_ASYNC, getMenuList);
    yield takeEvery(ADDMENU_ASYNC, addMenu);
    yield takeEvery(EDITMENU_ASYNC, editMenu);
}

