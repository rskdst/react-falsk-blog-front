import {put,call, takeEvery} from 'redux-saga/effects';
import request from '../../utils/request'
import api from '../../services/index'
import {message} from "antd"

import {GETROLE,GETROLE_ASYNC,ADDROLE_MENU_ASYNC,GETROLELIST,GETROLELIST_ASYNC} from '../constants'

//获取角色
function* getRole() {
    //此处编写异步请求
    try{
        const res = yield call(request.get,api.getRole)
        yield put({type: GETROLE,data:res.data});
    }catch (e) {
        console.log("异步请求出错")
        message.error("获取角色列表失败！")
    }
}

//上传角色权限
function* addRoleMenu({data}) {
    try{
        yield call(request.post,api.addRoleMenu,data)
        message.success("权限添加成功")
    }catch (e) {
        console.log("异步请求出错")
        message.error("角色权限提交失败！")
    }
}

//获取角色权限列表
function* getRoleList({data}){
    try{
        const res = yield call(request.get,api.getRoleList,data)
        yield put({type: GETROLELIST,data:res.data});
    }catch (e) {
        console.log("异步请求出错")
        message.error("获取权限列表失败！")
    }
}


// 监听异步自增事件
export function* takeRole() {
    yield takeEvery(GETROLE_ASYNC, getRole);
    yield takeEvery(ADDROLE_MENU_ASYNC,addRoleMenu)
    yield takeEvery(GETROLELIST_ASYNC,getRoleList)
    
}
