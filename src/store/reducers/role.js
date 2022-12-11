import {GETROLE} from '../constants'


export const role = (state = [], action = {}) => {
    switch(action.type) {
        case GETROLE:
            state = [...action.data]
            return state;
        default:
            return state;
    }
}