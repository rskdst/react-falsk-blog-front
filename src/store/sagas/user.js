import {put,call, takeEvery} from 'redux-saga/effects';
import request from '../../utils/request'
import api from '../../services/index'
import {message} from "antd";

import {REGISTER, LOGIN, GETUSER, GETUSER_ASYNC,ADDUSERROLE_ASYNC} from '../constants'

//注册用户
function* register({data}) {
    //此处编写异步请求
    try{
        const res = yield call(request.post,api.register,data)
        if (res.code===201){
            message.success(res.data,5)
        }else {
            message.success("注册成功！")
        }

    }catch (e) {
        console.log("异步请求出错")
        message.error("注册失败！")
    }
}


//登录
function* login({data}) {
    //此处编写异步请求
    try{
        const res = yield call(request.post,api.login,data)
        if (res.code!==200){
            message.error(res.data,5)
        }else {
            window.location.replace("/")
            message.success("登录成功！")
        }

    }catch (e) {
        console.log("异步请求出错")
        message.error("登录失败！")
    }
}

//获取用户数据
function* getUser({data}) {
    //此处编写异步请求
    try{
        const res = yield call(request.post,api.getUser,data)
        yield put({type: GETUSER,data:res.data});
        message.success("获取数据成功！")

    }catch (e) {
        console.log("异步请求出错")
        message.error("获取数据失败！")
    }
}

//为用户分配权限
function* adduserRole({data}) {
    //此处编写异步请求
    try{
        yield call(request.post,api.adduserRole,data)
        message.success("添加成功！")
    }catch (e) {
        console.log("添加出错")
        message.error("添加失败！")
    }
}

// 监听异步自增事件
export function* takeUser() {
    yield takeEvery(REGISTER, register);
    yield takeEvery(LOGIN, login);
    yield takeEvery(GETUSER_ASYNC, getUser);
    yield takeEvery(ADDUSERROLE_ASYNC, adduserRole);

}