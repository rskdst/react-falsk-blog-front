import { SAVEARTICLE,ADDCATEGORY,GETCATEGORY_ASYNC } from "../constants"

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