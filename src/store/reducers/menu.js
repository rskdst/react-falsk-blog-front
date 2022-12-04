import React from "react";
import {GETMENU} from '../constants'


export const menu = (state = [], action = {}) => {
    switch(action.type) {
        case GETMENU:
            state = [...action.data]
            return state;
        default:
            return state;
    }
}