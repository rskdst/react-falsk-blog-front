import { SAVEARTICLE } from "../constants"

export const saveArticleAsync = (data) => {
    return {
        type: SAVEARTICLE,
        data
    }
}