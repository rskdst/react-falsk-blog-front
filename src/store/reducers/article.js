

import {GETCATEGORY,GETQUERYCRITERIA,GETARTICLELIST} from '../constants'

//分类专栏数据
export const categorys = (state = [], action = {}) => {
    switch(action.type) {
        case GETCATEGORY:
            state = [...action.data]
            return state;
        default:
            return state;
    }
}
//文章筛选相关数据
export const queryCriteria = (state = {date:[],categorys:[]}, action = {}) => {
    switch(action.type) {
        case GETQUERYCRITERIA:
            state = action.data
            return state;
        default:
            return state;
    }
}

//文章数据
export const articles = (state = {list:[],count:{all:0,enable:0,private:0}},action = {}) => {
    switch(action.type) {
        case GETARTICLELIST:
            state = action.data
            return state;
        default:
            return state;
    }
}
