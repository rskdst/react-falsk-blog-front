import { SAVEARTICLE,ADDCATEGORY,GETCATEGORY_ASYNC,GETQUERYCRITERIA_ASYNC,GETARTICLELIST_ASYNC } from "../constants"

export const saveArticleAsync = (data) => {
    return {
        type: SAVEARTICLE,
        data
    }
}
//添加分类专栏
export const addArticleCategoryAsync = (data) => {
    return {
        type: ADDCATEGORY,
        data
    }
}

//获取分类专栏
export const getArticleCategoryAsync = () =>{
    return {
        type:GETCATEGORY_ASYNC
    }
}
//获取文章相关数据
export const getQueryCriteriaAsync = () => {
    return {
        type:GETQUERYCRITERIA_ASYNC
    }
}
//获取文章数据
export const getArticleList = ()=>{
    return {
        type:GETARTICLELIST_ASYNC
    }
}