import React from "react";
import {GETUSER} from '../constants'


export const user = (state = [], action = {}) => {
    switch(action.type) {
        case GETUSER:
            state = [...action.data]
            return state;
        default:
            return state;
    }
}