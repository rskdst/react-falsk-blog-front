

import {GETCATEGORY} from '../constants'


export const categorys = (state = [], action = {}) => {
    switch(action.type) {
        case GETCATEGORY:
            state = [...action.data]
            return state;
        default:
            return state;
    }
}
