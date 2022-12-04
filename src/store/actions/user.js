
import {REGISTER,LOGIN} from '../constants'

export const register = (data)=>{
    return {
        type:REGISTER,
        data:data
    }
}

export const login = (data)=>{
    return {
        type:LOGIN,
        data:data
    }
}