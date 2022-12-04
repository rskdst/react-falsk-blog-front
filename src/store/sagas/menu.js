import {put,call, takeEvery} from 'redux-saga/effects';
import request from '../../utils/request'
import api from '../../services/index'
import {message} from "antd";
import GetRoutes from "../../router";

import {GETMENU,GETMENU_ASYNC,ADDMENU_ASYNC,EDITMENU_ASYNC} from '../constants'

//获取菜单
function* getMenu() {
    //此处编写异步请求
    try{
        const res = yield call(request.get,api.getMenu)
        yield put({type: GETMENU,data:GetRoutes(res.data)});
        message.success("获取数据成功！")
    }catch (e) {
        console.log("异步请求出错")
        message.error("获取数据失败！")
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
    yield takeEvery(ADDMENU_ASYNC, addMenu);
    yield takeEvery(EDITMENU_ASYNC, editMenu);
}

