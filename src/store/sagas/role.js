import {put,call, takeEvery} from 'redux-saga/effects';
import request from '../../utils/request'
import api from '../../services/index'
import {message} from "antd"

import {GETROLE,GETROLE_ASYNC} from '../constants'

//获取菜单
function* getRole() {
    //此处编写异步请求
    try{
        const res = yield call(request.get,api.getRole)
        yield put({type: GETROLE,data:res.data});
    }catch (e) {
        console.log("异步请求出错")
        message.error("获取菜单失败！")
    }
}



// 监听异步自增事件
export function* takeRole() {
    yield takeEvery(GETROLE_ASYNC, getRole);
    
}