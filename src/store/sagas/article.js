import {put,call, takeEvery} from 'redux-saga/effects';
import request from '../../utils/request'
import api from '../../services/index'
import {message} from "antd";

import {SAVEARTICLE} from '../constants'

//更新菜单
function* saveArticle({data}) {
    //此处编写异步请求
    try{
        yield call(request.post,api.saveArticle,data)
        message.success("保存成功！")
    }catch (e) {
        console.log("异步请求出错")
        message.error("保存失败！")
    }

}

// 监听异步自增事件
export function* takeArticle() {
    yield takeEvery(SAVEARTICLE, saveArticle);
}