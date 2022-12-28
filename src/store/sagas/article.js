import {put,call, takeEvery} from 'redux-saga/effects';
import request from '../../utils/request'
import api from '../../services/index'
import {message} from "antd";

import {SAVEARTICLE,
    ADDCATEGORY,
    GETCATEGORY,
    GETCATEGORY_ASYNC,
    GETQUERYCRITERIA,
    GETQUERYCRITERIA_ASYNC,
    GETARTICLELIST,
    GETARTICLELIST_ASYNC
} from '../constants'

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

//添加专栏
function* addCategory({data}) {
    //此处编写异步请求
    try{
        yield call(request.post,api.addArticleCategory,data)
        message.success("添加成功！")
    }catch (e) {
        console.log("异步请求出错")
        message.error("添加失败！")
    }

}
//获取专栏
function* getCategory() {
    //此处编写异步请求
    try{
        const res = yield call(request.get,api.getArticleCategory)
        yield put({type: GETCATEGORY,data:res.data});
    }catch (e) {
        console.log("异步请求出错")
        message.error("获取失败！")
    }

}

//获取文章筛选相关数据
function* getQueryCriteria() {
    //此处编写异步请求
    try{
        const res = yield call(request.get,api.getQueryCriteria)
        yield put({type: GETQUERYCRITERIA,data:res.data});
    }catch (e) {
        console.log("异步请求出错")
        message.error("获取失败！")
    }

}

//获取文章数据
function* getArticleList() {
    //此处编写异步请求
    try{
        const res = yield call(request.get,api.getArticleList)
        yield put({type: GETARTICLELIST,data:res.data});
    }catch (e) {
        console.log("异步请求出错")
        message.error("获取失败！")
    }

}

// 监听异步自增事件
export function* takeArticle() {
    yield takeEvery(SAVEARTICLE, saveArticle);
    yield takeEvery(ADDCATEGORY, addCategory);
    yield takeEvery(GETCATEGORY_ASYNC, getCategory);
    yield takeEvery(GETQUERYCRITERIA_ASYNC, getQueryCriteria);
    yield takeEvery(GETARTICLELIST_ASYNC, getArticleList);
}